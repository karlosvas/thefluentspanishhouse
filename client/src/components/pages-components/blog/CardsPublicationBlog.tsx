import { useState } from "react";
import { Link } from "react-router-dom";
import CardPlaceholder from "./PlaceHolder";
import {
  type Translations,
  type PublicationCardType,
} from "../../../../types/types";
import FormPublication from "../../render-data/FormPublication";
import { getUser } from "../../../scripts/oauth2-0";
import { handleChangeModal } from "../../../scripts/modal";
import Button from "../../reusable/Buuton";

const CardsPublicationBlog: React.FC<Translations> = ({ translation }) => {
  const [showModalPost, setShowModalPost] = useState(false);
  const [closing, setClosing] = useState(false);

  const cardsBlog: PublicationCardType[] = translation("cardsBlog", {
    returnObjects: true,
  });

  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(cardsBlog.length).fill(false)
  );

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

  return (
    <div id="blog">
      {/* Renderiza el formulario si showModalPost es verdadero */}
      {showModalPost && (
        <FormPublication
          closing={closing}
          handleChange={handlePublicationChange}
        />
      )}

      {/* Renderiza el mensaje si no hay publicaciones */}
      {cardsBlog.length === 0 ? (
        <>
          <h1 id="emptyTitle">Actualmente no hay disponible ningun post</h1>
        </>
      ) : (
        // Renderiza la lista de publicaciones
        cardsBlog.map((publication, index) => (
          <div className="cardBlog" key={publication.id}>
            <Link
              to={`/publication/${publication.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "normal",
              }}
            >
              {!loadedImages[index] && <CardPlaceholder />}
              <div className="img-container">
                {publication.base64_img ? (
                  <img
                    src={publication.base64_img}
                    alt="Imagen de la publicación"
                    onLoad={() => handleImageLoad(index)}
                  />
                ) : (
                  <img
                    src={`/img/${index % cardsBlog.length}.png`}
                    alt="Imagen de la publicación"
                    onLoad={() => handleImageLoad(index)}
                  />
                )}
              </div>
              <h3>{publication.title}</h3>
              <p>{publication.subtitle}</p>
            </Link>
          </div>
        ))
      )}

      {/* Renderiza el botón solo para usuarios específicos */}
      {(user?.email === "carlosvassan@gmail.com" ||
        user?.email === "mar411geca@gmail.com") && (
        <Button event={handlePublicationChange} id="upload">
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
