import CardsPublicationBlog from "../components/pages-components/blog/CardsPublicationBlog";
import FormPublication from "../components/pages-components/blog/FormPublication";
import { handleChangeModal } from "../scripts/modal";
import { useEffect, useState } from "react";
import { loadPublications } from "../scripts/render-data";
import { type PublicationCardType } from "../../types/types";
import "../styles/main-blog.css";

const Blog = () => {
  const [showModalPost, setShowModalPost] = useState(false);
  const [cardsBlog, setCardsBlog] = useState<PublicationCardType[]>([]);
  const [closing, setClosing] = useState(false);
  const [newPublication, setNewPublication] = useState<PublicationCardType>({
    _id: "",
    title: "",
    subtitle: "",
    content: "",
    base64_img: "",
  });

  const handlePublicationChange = () => {
    handleChangeModal(showModalPost, setClosing, setShowModalPost);
  };

  const fetchPublications = async (
    setCardsBlog: (publications: PublicationCardType[]) => void
  ) => {
    try {
      const publications = await loadPublications();
      if (Array.isArray(publications) && publications.length !== 0)
        setCardsBlog(publications as PublicationCardType[]);
    } catch (error) {
      console.error("Error loading publications:", error);
    }
  };

  useEffect(() => {
    fetchPublications(setCardsBlog);
  }, [newPublication]);

  useEffect(() => {
    fetchPublications(setCardsBlog);
  }, []);

  return (
    <>
      <main className="mainBlog">
        {/* Abre o cierra el modal de publicación */}
        {showModalPost && (
          <FormPublication
            closing={closing}
            handleChange={handlePublicationChange}
            newPublication={newPublication}
            setNewPublication={setNewPublication}
          />
        )}
        <CardsPublicationBlog
          cardsBlog={cardsBlog}
          handlePublicationChange={handlePublicationChange}
        />
      </main>
    </>
  );
};

export default Blog;
