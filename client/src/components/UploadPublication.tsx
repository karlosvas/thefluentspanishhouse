import { useState } from "react";
import { type UploadPublicationProps } from "../../types/types";
import "../styles/publication/uploadfiles.css";
import Button from "./reusable/Buuton";

const UploadPublication: React.FC<UploadPublicationProps> = ({
  closing,
  event,
}) => {
  const [error, setError] = useState("");
  const [newPublication, setNewPublication] = useState({
    title: "",
    subtitle: "",
    content: "",
    img: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      setError("Por favor, selecciona un archivo de imagen.");
      event.target.value = "";
    } else {
      setError("");
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewPublication((prev) => ({
            ...prev,
            img: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
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
            <Button id="submit" type="submit">
              Enviar
            </Button>
          </ul>
        </form>
      </div>
      <div
        className={`modalBackdrop ${closing ? "closing" : ""}`}
        onClick={event}
      ></div>
    </>
  );
};

export default UploadPublication;
