import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CardPlaceholder from "./PlaceHolder";
import FormPublication from "./FormPublication";
import { getUser } from "../../../scripts/oauth2-0";
import { handleChangeModal } from "../../../scripts/modal";
import Button from "../../reusable/Buuton";
import { loadPublications } from "../../../scripts/render-data";
import {
  type PublicationsProp,
  type PublicationCardType,
} from "../../../../types/types";

const CardsPublicationBlog: React.FC<PublicationsProp> = ({ publications }) => {
  const [showModalPost, setShowModalPost] = useState(false);
  const [closing, setClosing] = useState(false);
  const [cardsBlog, setCardsBlog] = useState<PublicationCardType[]>([]);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(cardsBlog.length).fill(false)
  );

  const [newPublication, setNewPublication] = useState<PublicationCardType>({
    _id: "",
    title: "",
    subtitle: "",
    content: "",
    base64_img: "",
  });

  const uploadRef = useRef<HTMLButtonElement | null>(null);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[index] = true;
      return newLoadedImages;
    });
  };

  const handlePublicationChange = () => {
    handleChangeModal(showModalPost, setClosing, setShowModalPost);
  };

  const user = getUser();

  useEffect(() => {
    if (Array.isArray(publications) && publications.length !== 0)
      setCardsBlog(publications as PublicationCardType[]);
  }, []);

  useEffect(() => {
    const data = loadPublications();
    if (Array.isArray(data) && data.length !== 0)
      setCardsBlog(data as PublicationCardType[]);
  }, [newPublication]);

  return (
    <div id="blog">
      {/* Renderiza el formulario si showModalPost es verdadero */}
      {showModalPost && (
        <FormPublication
          closing={closing}
          handleChange={handlePublicationChange}
          newPublication={newPublication}
          setNewPublication={setNewPublication}
        />
      )}

      {cardsBlog.length === 0 && (
        <h1
          style={{
            position: "absolute",
            top: "35%",
            fontSize: "30px",
            textAlign: "center",
          }}
        >
          No posts available...
        </h1>
      )}

      {/* // Renderiza la lista de publicaciones */}
      {cardsBlog.map((publication, index) => (
        <div className="cardBlog" key={publication._id}>
          <Link
            to={`/publication/${publication._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "normal",
            }}
          >
            {!loadedImages && <CardPlaceholder />}
            <div className="img-container">
              <img
                src={publication.base64_img}
                alt="Imagen de la publicación"
                onLoad={() => handleImageLoad(index)}
              />
            </div>
            <h3>{publication.title}</h3>
            <p>{publication.subtitle}</p>
          </Link>
        </div>
      ))}

      {/* Renderiza el botón solo para usuarios específicos */}
      {(user?.email === "carlosvassan@gmail.com" ||
        user?.email === "mar411geca@gmail.com") && (
        <Button event={handlePublicationChange} id="upload" ref={uploadRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="svgIcons"
            width="30px"
            height="30px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </Button>
      )}
    </div>
  );
};

export default CardsPublicationBlog;
