import CardPublicationBlog from '@/components/pages-components/blog/CardPublicationBlog';
import FormPublication from '@/components/pages-components/blog/FormPublication';
import { handleChangeModal } from '@/utils/modal';
import PaginationReactBoostrap from '@/components/pages-components/blog/Pagination';
import { useEffect, useRef, useState } from 'react';
import { getPublications } from '@/services/render-data';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router';
import { type PublicationCardType } from 'types/types';
import '@/styles/main-blog.css';

const Blog = () => {
  // Muestra el modal de publicación(showModalPost) y cierra el modal de publicación(closing)
  const [showModalPost, setShowModalPost] = useState(false);
  const [closing, setClosing] = useState(false);
  // Publicaciones del blog (cardsBlog), y estado de carga(loading)
  const [cardsBlog, setCardsBlog] = useState<PublicationCardType[]>([]);
  const [loading, setLoading] = useState(false);

  // Obtiene la página actual por parámetro
  const { page } = useParams<{ page: string }>();
  // Hook para navegar
  const navigate = useNavigate();

  // Mnejar el cambio de publicación
  const handlePublicationChange = () => {
    handleChangeModal(showModalPost, setClosing, setShowModalPost);
  };

  // Obtener las publicaciones
  const fetchPublications = async (page: string) => {
    try {
      const publications = await getPublications(page);
      if (Array.isArray(publications)) {
        publications.reverse();
        setCardsBlog(publications as PublicationCardType[]);
        if (publications.length == 0 && page != '1') navigate('/blog/1');
      }
    } catch (error) {
      console.error('Error loading publications:', error);
      navigate('/404');
    } finally {
      setLoading(true);
    }
  };

  // Añadir referencia de carga para evitar doble carga
  const isInitialMount = useRef(true);
  const prevPage = useRef(page);

  useEffect(() => {
    if (isInitialMount.current && page) {
      fetchPublications(page);
      isInitialMount.current = false;
    } else if (prevPage.current !== page && page) {
      fetchPublications(page);
    }
    prevPage.current = page;
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
        <CardPublicationBlog
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
