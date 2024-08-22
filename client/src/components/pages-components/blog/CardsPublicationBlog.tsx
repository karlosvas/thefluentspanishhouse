import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CardPlaceholder from "./PlaceHolder";
import Button from "../../reusable/Buuton";
import { UserContext } from "../../../App";
import { CardsPublicationBlogProps } from "../../../../types/types";
import ButtonClose from "../../reusable/ButtonClose";
import { delatePublication } from "../../../scripts/render-data";
import toast from "react-hot-toast";

const CardsPublicationBlog: React.FC<CardsPublicationBlogProps> = ({
  cardsBlog,
  handlePublicationChange,
  setCardsBlog,
  loading,
}) => {
  const uploadRef = useRef<HTMLButtonElement | null>(null);
  const user = useContext(UserContext);
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

  const admin =
    user?.email === "carlosvassan@gmail.com" ||
    user?.email === "mar411geca@gmail.com";

  const handledelatePublication = async (id: string) => {
    try {
      await delatePublication(id);
      setCardsBlog((prevCardsBlog) =>
        prevCardsBlog.filter((publication) => publication._id !== id)
      );
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error al eliminar post:", error);
    }
  };

  return (
    <div id="blog">
      {loading && cardsBlog.length === 0 && (
        <h1
          style={{
            position: "absolute",
            top: "35%",
            right: "0",
            fontSize: "30px",
            width: "100%",
            textAlign: "center",
          }}
        >
          No posts available...
        </h1>
      )}
      {/* Renderiza la lista de publicaciones */}
      {!loadedImages && <CardPlaceholder />}
      {cardsBlog.map((publication, index) => (
        <div className="card-blog" key={publication._id}>
          {admin && (
            <ButtonClose
              handleSusribeChange={() =>
                handledelatePublication(publication._id)
              }
              className="close-card-button"
            />
          )}
          <Link to={`/publication/${publication._id}`}>
            <figure className="img-container">
              <img
                src={publication.base64_img}
                alt={`Blog post ${publication.title}`}
                onLoad={() => handleImageLoad(index)}
              />
            </figure>
            <h3>{publication.title}</h3>
            <p>{publication.subtitle}</p>
          </Link>
        </div>
      ))}

      {/* Renderiza el botón solo para usuarios específicos */}
      {admin && (
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
