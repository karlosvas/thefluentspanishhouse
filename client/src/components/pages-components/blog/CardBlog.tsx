import { useState } from "react";
import { Link } from "react-router-dom";
import CardPlaceholder from "./PlaceHolder";
import {
  type Translations,
  type PublicationCardType,
} from "../../../../types/types";
import FormPublication from "../../render-data/FormPublication";
import { getUser } from "../../../scripts/oauth2-0";
import { handleScroll } from "../../../scripts/modal";
import Button from "../../reusable/Buuton";

const CardBlog: React.FC<Translations> = ({ translation }) => {
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
    setShowModalPost((prev) => {
      const newState = !prev;
      if (newState) handleScroll(true);
      else {
        setClosing(true);
        setTimeout(() => {
          setShowModalPost(false);
          setClosing(false);
          handleScroll(false);
        }, 500);
      }
      return newState;
    });
  };

  const user = getUser();

  return (
    <div id="blog">
      {/* Renderiza el formulario si showModalPost es verdadero */}
      {showModalPost && (
        <FormPublication closing={closing} event={handlePublicationChange} />
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
                    src={`img/${index}.png`}
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
          Upload
        </Button>
      )}
    </div>
  );
};

export default CardBlog;
