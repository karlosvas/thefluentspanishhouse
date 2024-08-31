import CardsPublicationBlog from "@/components/pages-components/blog/CardsPublicationBlog";
import FormPublication from "@/components/pages-components/blog/FormPublication";
import { handleChangeModal } from "@/scripts/modal";
import { useEffect, useState } from "react";
import { getPublications } from "@/scripts/render-data";
import { type PublicationCardType } from "types/types";
import "@/styles/main-blog.css";
import { Helmet } from "react-helmet-async";
import PaginationReactBoostrap from "@/components/pages-components/blog/Pagination";
import { useParams } from "react-router";

const Blog = () => {
  const [showModalPost, setShowModalPost] = useState(false);
  const [cardsBlog, setCardsBlog] = useState<PublicationCardType[]>([]);
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { page } = useParams<{ page: string }>();

  const handlePublicationChange = () => {
    handleChangeModal(showModalPost, setClosing, setShowModalPost);
  };

  const fetchPublications = async (page: string) => {
    try {
      const publications = await getPublications(page);
      publications.reverse();
      setCardsBlog(publications as PublicationCardType[]);
    } catch (error) {
      console.error("Error loading publications:", error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (page) fetchPublications(page);
  }, [page]);

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
            cardsBlog={cardsBlog}
            setCardsBlog={setCardsBlog}
          />
        )}
        <CardsPublicationBlog
          cardsBlog={cardsBlog}
          handlePublicationChange={handlePublicationChange}
          setCardsBlog={setCardsBlog}
          loading={loading}
        />
        {cardsBlog.length > 0 && (
          <PaginationReactBoostrap page={page} cardsBlog={cardsBlog} />
        )}
      </main>
    </>
  );
};

export default Blog;
