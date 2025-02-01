import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlaceholderPublications from '@/components/pages-components/publications/PlaceholderPublication';
import { getPublicationByID } from '@/services/render-data';
import CommentsPublication from '@/components/pages-components/publications/CommentsPublication';
import { Helmet } from 'react-helmet-async';
import { type PublicationCardType, type RouteParams } from 'types/types';
import { isPublicationCardType } from '@/utils/utilities-types';
import '@/styles/main-publication.css';

const Publication = () => {
  // Publicacion actual (publication), estado de carga de la imagen (imageLoading)
  const [publication, setPublication] = useState<PublicationCardType>();
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  // Parametro de la URL que indica el id de la publicación (id), hook para navegar entre rutas (navigate)
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPublicationByID(id)
        .then((result) => {
          if (isPublicationCardType(result)) setPublication(result);
        })
        .catch((error) => {
          console.error(error);
          navigate('/404');
        });
    } else navigate('/404');
  }, [navigate, id]);

  return (
    <>
      <Helmet>
        <title>Publication</title>
        <meta
          name="description"
          content="Publication of The Fluent Spanish House. Here you can find one of the publications made by the teacher, Marta Gutiérrez Fonseca."
        />
      </Helmet>
      <main className="publication-main">
        {publication ? (
          <div className="publication">
            <h1>{publication.title}</h1>
            <figure>
              <img
                className="img-publication"
                src={publication.base64_img}
                alt="Imagen de la publicación"
                onLoad={() => setImageLoading(true)}
                style={{ display: imageLoading ? 'block' : 'none' }}
              />
            </figure>
            <strong>{publication.subtitle}</strong>
            <p
              dangerouslySetInnerHTML={{
                __html: publication.content || '',
              }}
            />
          </div>
        ) : (
          <PlaceholderPublications imgClass="img-publication" />
        )}
        <CommentsPublication />
      </main>
    </>
  );
};

export default Publication;
