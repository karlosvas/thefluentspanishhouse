import CardsPublicationBlog from "@/components/pages-components/blog/CardsPublicationBlog";
import FormPublication from "@/components/pages-components/blog/FormPublication";
import { handleChangeModal } from "@/scripts/modal";
import { useEffect, useState } from "react";
import { getPublications } from "@/scripts/render-data";
import { type PublicationCardType } from "types/types";
import { Helmet } from "react-helmet-async";
import PaginationReactBoostrap from "@/components/pages-components/blog/Pagination";
import { useParams } from "react-router";
import "@/styles/main-blog.css";

const Blog = () => {
  // Muestra el modal de publicación(ShowModalPost) y cierra el modal de publicación(closing)
  const [showModalPost, setShowModalPost] = useState(false);
  const [closing, setClosing] = useState(false);
  const [cardsBlog, setCardsBlog] = useState<PublicationCardType[]>([]);
  const [loading, setLoading] = useState(false);

  const { page } = useParams<{ page: string }>();

  const handlePublicationChange = () => {
    handleChangeModal(showModalPost, setClosing, setShowModalPost);
  };

  const fetchPublications = async (page: string) => {
    try {
      const publications = await getPublications(page);
      if(Array.isArray(publications))
        publications.reverse();
      setCardsBlog(publications as PublicationCardType[]);
    } catch (error) {
      console.error("Error loading publications:", error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (page && cardsBlog.length == 0) fetchPublications(page);
  }, [page, cardsBlog.length]);

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
        {/* Modal de publicación */}
        {showModalPost && (
          <FormPublication
            closing={closing}
            handleChange={handlePublicationChange}
            cardsBlog={cardsBlog}
            setCardsBlog={setCardsBlog}
          />
        )}
        {/* Cards de publicaciones */}
        <CardsPublicationBlog
          cardsBlog={cardsBlog}
          handlePublicationChange={handlePublicationChange}
          setCardsBlog={setCardsBlog}
          loading={loading}
        />
        {/* Paginación de las publicaciones */}
        {cardsBlog.length > 0 && (
          <PaginationReactBoostrap page={page} cardsBlog={cardsBlog} />
        )}
      </main>
    </>
  );
};

export default Blog;
