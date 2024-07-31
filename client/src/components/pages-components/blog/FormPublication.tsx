import { useState } from "react";
import toast from "react-hot-toast";
import { handleSubmitPost } from "../../../scripts/render-data";
import "../../../styles/uploadfiles.css";
import { type FormPublicationProps } from "../../../../types/types";

const FormPublication: React.FC<FormPublicationProps> = ({
  closing,
  handleChange,
  newPublication,
  setNewPublication,
}) => {
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

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
          setNewPublication((prev) => ({
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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewPublication((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          setNewPublication((prev) => ({
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleSubmitPost(event, newPublication);
  };

  return (
    <>
      <div className={`uploadPublication ${closing ? "closing" : ""}`}>
        <h3>New Publication</h3>
        <form onSubmit={onSubmit}>
          <ul>
            <li>
              Title
              <input
                type="text"
                name="title"
                value={newPublication.title}
                required
                onChange={handleInputChange}
              />
            </li>
            <li>
              Subtitle
              <input
                type="text"
                name="subtitle"
                value={newPublication.subtitle}
                required
                onChange={handleInputChange}
              />
            </li>
            <li>
              New content
              <br />
              <textarea
                name="content"
                value={newPublication.content}
                onChange={handleInputChange}
                required
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
            <button id="submitPost" type="submit">
              Submit
            </button>
          </ul>
        </form>
      </div>
      <div className="modalBackdropLog" onClick={handleChange}></div>
    </>
  );
};

export default FormPublication;
