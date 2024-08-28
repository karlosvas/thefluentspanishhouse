import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CardPlaceholder from "./CardPlaceholder";
import Button from "@/components/reusable/Button";
import { UserContext } from "@/App";
import { CardsPublicationBlogProps, PublicationCardType } from "types/types";
import ButtonClose from "@/components/reusable/ButtonClose";
import {
  delatePublication,
  putCommentPublication,
} from "@/scripts/render-data";
import toast from "react-hot-toast";
import "@/styles/reusables/edit.css";
import Backdrop from "@/components/reusable/Backdrop";

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

  const [showModalEditPublication, setShowModalEditPublication] =
    useState(false);
  const handleChangePublication = () => {
    setShowModalEditPublication(!showModalEditPublication);
  };

  const [editPublication, seteditPublication] = useState<PublicationCardType>({
    _id: "",
    title: "",
    subtitle: "",
    content: "",
    base64_img: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "content") {
      const formattedContent = value.replace(/\n/g, "<br>");
      seteditPublication({ ...editPublication, [name]: formattedContent });
    } else {
      seteditPublication({ ...editPublication, [name]: value });
    }
  };

  const [closing] = useState(false);

  const editCommentPublication = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await putCommentPublication(editPublication);
      setCardsBlog(
        cardsBlog.map((card) =>
          card._id === editPublication._id ? editPublication : card
        )
      );
      toast.success("Post edited successfully");
    } catch (error) {
      console.error("Error to edit post", error);
      toast.error("Error to edit post");
    }
    setShowModalEditPublication(false);
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
      {showModalEditPublication && (
        <>
          <div className="upload-publication modal-edit">
            <form onSubmit={editCommentPublication}>
              <ul>
                <li>
                  Title
                  <input
                    type="text"
                    name="title"
                    value={editPublication.title}
                    onChange={handleInputChange}
                  />
                </li>
                <li>
                  Subtitle
                  <input
                    type="text"
                    name="subtitle"
                    value={editPublication.subtitle}
                    onChange={handleInputChange}
                  />
                </li>
                <li>
                  New content
                  <br />
                  <textarea
                    name="content"
                    value={editPublication.content.replace(/<br>/g, "\n")}
                    onChange={handleInputChange}
                    rows={4}
                    cols={50}
                  />
                </li>
                <Button type="submit">Edit</Button>
              </ul>
            </form>
          </div>
          <Backdrop
            handleSusribeChange={handleChangePublication}
            closing={closing}
          />
        </>
      )}
      {/* Renderiza la lista de publicaciones */}
      {!loadedImages && <CardPlaceholder />}
      {cardsBlog.map((publication, index) => (
        <div className="card-blog" key={publication._id}>
          {admin && (
            <>
              <ButtonClose
                handleSusribeChange={() =>
                  handledelatePublication(publication._id)
                }
                className="close-card-button"
              />
              <Button className="edited" event={handleChangePublication}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="svgIcons"
                  width={20}
                  height={20}
                  onClick={() => seteditPublication(publication)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Button>
            </>
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
      {admin && !showModalEditPublication && (
        <>
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
        </>
      )}
    </div>
  );
};

export default CardsPublicationBlog;
