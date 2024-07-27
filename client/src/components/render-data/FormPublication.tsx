import { useState } from "react";
import { url_api } from "../../../public/constants/global";
import {
  type FormPublicationProps,
  type PublicationCardType,
} from "../../../types/types";
import "../../styles/uploadfiles.css";

const FormPublication: React.FC<FormPublicationProps> = ({
  closing,
  event,
}) => {
  const [error, setError] = useState("");
  const [newPublication, setNewPublication] = useState<PublicationCardType>({
    title: "",
    subtitle: "",
    content: "",
    base64_img: "",
  });

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
          // Crear un canvas para redimensionar la imagen
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("No se pudo obtener el contexto del canvas"));
            return;
          }
          // Calcular nuevas dimensiones
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
          // Establecer el tamaño del canvas y dibujar la imagen
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          // Convertir el canvas a Base64
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
          setNewPublication((prev) => ({
            ...prev,
            base64_img: resizedBase64Image,
          }));
        } catch (error) {
          setError("Error al redimensionar la imagen.");
          console.error(error);
        }
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPublication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitPost = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(`${url_api}/api/newpublication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newPublication.title,
          subtitle: newPublication.subtitle,
          content: newPublication.content,
          base64_img: newPublication.base64_img,
        }),
      });

      if (response.ok) window.location.reload();
      else console.error("Error al enviar el post");
    } catch (error) {
      console.error("Error al enviar el post:", error);
    }
  };

  return (
    <>
      <div className={`uploadPublication ${closing ? "closing" : ""}`}>
        <h3>New Publication</h3>
        <form>
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
              <input
                type="text"
                name="content"
                value={newPublication.content}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {error && <p>{error}</p>}
            </li>
            <button id="submitPost" type="submit" onClick={handleSubmitPost}>
              Enviar
            </button>
          </ul>
        </form>
      </div>
      <div
        className={`modalBackdropLog ${closing ? "closing" : ""}`}
        onClick={event}
      ></div>
    </>
  );
};

export default FormPublication;
