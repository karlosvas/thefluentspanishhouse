import CardsPublicationBlog from "@/components/pages-components/blog/CardsPublicationBlog";
import FormPublication from "@/components/pages-components/blog/FormPublication";
import { handleChangeModal } from "@/scripts/modal";
import { useEffect, useState } from "react";
import { loadPublications } from "@/scripts/render-data";
import { type PublicationCardType } from "types/types";
import "@/styles/main-blog.css";
import { Helmet } from "react-helmet-async";

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
  const [loading, setLoading] = useState(false);

  const handlePublicationChange = () => {
    handleChangeModal(showModalPost, setClosing, setShowModalPost);
  };

  const fetchPublications = async () => {
    try {
      const publications = await loadPublications();
      publications.reverse();
      if (Array.isArray(publications) && publications.length !== 0)
        setCardsBlog(publications as PublicationCardType[]);
    } catch (error) {
      console.error("Error loading publications:", error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog</title>
        <meta
          name="description"
          content="Blog of The Fluent Spanish House. Here you can find all the publications made by the teacher, Marta Gutiérrez Fonseca."
        />
      </Helmet>
      <main className="main-blog">
        {/* Abre o cierra el modal de publicación */}
        {showModalPost && (
          <FormPublication
            closing={closing}
            handleChange={handlePublicationChange}
            newPublication={newPublication}
            setNewPublication={setNewPublication}
            cardsBlog={cardsBlog}
          />
        )}
        <CardsPublicationBlog
          cardsBlog={cardsBlog}
          handlePublicationChange={handlePublicationChange}
          setCardsBlog={setCardsBlog}
          loading={loading}
        />
      </main>
    </>
  );
};

export default Blog;
