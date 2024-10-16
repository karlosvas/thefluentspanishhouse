import { useState } from "react";
import toast from "react-hot-toast";
import { getPublications, postPublication } from "@/scripts/render-data";
import ButtonClose from "@/components/reusable/ButtonClose";
import Backdrop from "@/components/reusable/Backdrop";
import "@/styles/uploadfiles.css";
import { useNavigate, useParams } from "react-router";
import { MAX_PUBLICATIONS_PER_PAGE } from "@/constants/global";
import {
  type PublicationCardType,
  type FormPublicationProps,
} from "types/types";
import Button from "@/components/reusable/Button";

const FormPublication: React.FC<FormPublicationProps> = ({
  closing,
  handleChange,
  cardsBlog,
}) => {
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const lastPage =
    cardsBlog.length > 0 ? cardsBlog[cardsBlog.length - 1].currentPage : 1;

  const [newPublication, setNewPublication] = useState<PublicationCardType>({
    _id: "",
    title: "",
    subtitle: "",
    content: "",
    base64_img: "",
    currentPage: lastPage,
  });

  const { page } = useParams<{ page: string }>();
  if (page) newPublication.currentPage = parseInt(page);

  const resizeImage = (
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("No se pudo obtener el contexto del canvas"));
            return;
          }
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((maxWidth / width) * height);
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = Math.round((maxHeight / height) * width);
            height = maxHeight;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 1);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      setError("Por favor, selecciona un archivo de imagen.");
      event.target.value = "";
    } else {
      setError("");
      if (file) {
        try {
          const resizedBase64Image = await resizeImage(file, 800, 600);
          setNewPublication((prev: PublicationCardType) => ({
            ...prev,
            base64_img: resizedBase64Image,
          }));
          setImagePreview(resizedBase64Image);
        } catch (error) {
          setError("Error al redimensionar la imagen.");
          console.error(error);
        }
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "content") {
      const formattedContent = value.replace(/\n/g, "<br>");
      setNewPublication({ ...newPublication, [name]: formattedContent });
    } else {
      setNewPublication({ ...newPublication, [name]: value });
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && !file.type.startsWith("image/")) {
      setError("Please select an image file");
      toast.error("Please select an image file");
    } else {
      setError("");
      if (file) {
        try {
          const resizedBase64Image = await resizeImage(file, 800, 600);
          setNewPublication((prev: PublicationCardType) => ({
            ...prev,
            base64_img: resizedBase64Image,
          }));
          setImagePreview(resizedBase64Image);
        } catch (error) {
          setError("Error al redimensionar la imagen.");
          console.error(error);
        }
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const [suscribe, setSuscribe] = useState(false);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuscribe(true);
    const fileInput = document.getElementById(
      "fileInput"
    ) as HTMLInputElement | null;

    if (fileInput) {
      // Verifica si se ha seleccionado un archivo
      if (!newPublication.title) {
        setError("Please enter a title");
        return;
      } else if (!newPublication.subtitle) {
        setError("Please enter a subtitle");
        return;
      } else if (!newPublication.content) {
        setError("Please enter content for the post");
        return;
      } else if (!fileInput.files?.[0]) {
        setError("Please select a file.");
        return;
      }
    }

    
 function isPublicationCardType(obj: unknown): obj is PublicationCardType {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as PublicationCardType)._id === 'string' &&
    typeof (obj as PublicationCardType).title === 'string' &&
    typeof (obj as PublicationCardType).subtitle === 'string' &&
    typeof (obj as PublicationCardType).content === 'string' &&
    typeof (obj as PublicationCardType).base64_img === 'string' &&
    typeof (obj as PublicationCardType).currentPage === 'number'
  );
}

    try {
      if (cardsBlog.length < MAX_PUBLICATIONS_PER_PAGE) {
        const newCard = await postPublication(event, newPublication);
        if(isPublicationCardType(newCard))
          cardsBlog.push(newCard);
      } else {
        // Desde la pagina uno buscamos cual es la siguiente pagina donde hay menos de 6 publicaciones para insertar contenido
        let actualPage = 1;
        let arrayPublications = [] as PublicationCardType[];
        while (
          arrayPublications.length >= MAX_PUBLICATIONS_PER_PAGE ||
          actualPage === 1
        ) {
          actualPage++;
          const data = await getPublications(actualPage.toString());
          if(Array.isArray(data))
            arrayPublications = data;
          
          if (actualPage == 10) break;
        }
        const updatedPublication = {
          ...newPublication,
          currentPage: actualPage,
        };
        await postPublication(event, updatedPublication);
        navigate(`/blog/${actualPage}`);
      }
    } catch (error) {
      console.error("Error al enviar el post:", error);
    }
    handleChange();
    setTimeout(() => {
      setSuscribe(false);
    }, 1000);
  };

  return (
    <>
      <div className={"upload-publication"}>
        <ButtonClose handleSusribeChange={handleChange} />
        <h3>New Publication</h3>
        <form onSubmit={onSubmit}>
          <ul>
            <li>
              Title
              <input
                type="text"
                name="title"
                value={newPublication.title}
                onChange={handleInputChange}
              />
            </li>
            <li>
              Subtitle
              <input
                type="text"
                name="subtitle"
                value={newPublication.subtitle}
                onChange={handleInputChange}
              />
            </li>
            <li>
              New content
              <br />
              <textarea
                name="content"
                value={newPublication.content.replace(/<br>/g, "\n")}
                onChange={handleInputChange}
                rows={4}
                cols={50}
              />
            </li>
            <li>
              <div onDrop={handleDrop} onDragOver={handleDragOver}>
                <label className="custom-file-upload">
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <p>Select or drag the image</p>
                  )}
                </label>
              </div>
              {error && <p>{error}</p>}
            </li>
            <Button id="submit-post" type="submit" suscribe={suscribe}>
              Submit
            </Button>
          </ul>
        </form>
      </div>
      <Backdrop handleSusribeChange={handleChange} closing={closing} />
    </>
  );
};

export default FormPublication;
