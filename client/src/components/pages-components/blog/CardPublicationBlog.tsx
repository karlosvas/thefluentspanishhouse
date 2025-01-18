import { useContext, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CardPlaceholder from './CardPlaceholder';
import Button from '@/components/reusable/Button';
import { UserContext } from '@/App';
import ButtonClose from '@/components/reusable/ButtonClose';
import {
  delatePublication,
  putCommentPublication,
} from '@/scripts/render-data';
import toast from 'react-hot-toast';
import Backdrop from '@/components/reusable/Backdrop';
import {
  type CardsPublicationBlogProps,
  type PublicationCardType,
} from 'types/types';
import '@/styles/reusables/edit.css';
import { getAdmin } from '@/utilities/utilities';

const CardPublicationBlog: React.FC<CardsPublicationBlogProps> = ({
  cardsBlog,
  handlePublicationChange,
  setCardsBlog,
  loading,
}) => {
  // Estado de la publicación (editPublication)
  const [editPublication, seteditPublication] = useState<PublicationCardType>({
    _id: '',
    title: '',
    subtitle: '',
    content: '',
    base64_img: '',
    currentPage: 0,
  });
  const [error, setError] = useState('');
  // Estado de suscripción al evento, oseqa si esta enviandose la informacion (suscribe)
  const [suscribe, setSuscribe] = useState(false);

  // Referencia al botón de upload (uploadRef), contexto de usuario, usuario actual (user)
  const uploadRef = useRef<HTMLButtonElement | null>(null);
  const user = useContext(UserContext);
  // Estado de las imagenes cargadas (loadedImages)
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(cardsBlog.length).fill(false)
  );

  // Verificar si el usuario es admin, si tiene email, buscarlo en la lista de admins del .env
  const admin = getAdmin(user);

  // Parametro de la URL que indica la pagina actual (page), función para navegar entre rutas (navigate)
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();

  // Estado del modal de para mostrar la publicación (showModalEditPublication)
  const [showModalEditPublication, setShowModalEditPublication] =
    useState(false);

  // Estado para cerrar el modal (closing)
  const [closing] = useState(false);

  // Manejar la carga de imagenes
  const handleImageLoad = (index: number) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[index] = true;
      return newLoadedImages;
    });
  };

  // Manejar la eliminación de una publicación
  const handleDeletePublication = async (id: string) => {
    try {
      await delatePublication(id);
      if (cardsBlog.length === 1) {
        let actualPage: number = page ? parseInt(page) : 1;
        navigate(`/blog/${--actualPage}`);
      }
      setCardsBlog((prevCardsBlog) =>
        prevCardsBlog.filter((publication) => publication._id !== id)
      );
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error al eliminar post:', error);
    }
  };

  // Manejar el cambio de publicación
  const handleChangePublication = (publication?: PublicationCardType) => {
    if (publication) seteditPublication(publication);
    setShowModalEditPublication(!showModalEditPublication);
  };

  // Manejar el cambio de publicación  // Revisar cambio a utilities
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'content') {
      const formattedContent = value.replace(/\n/g, '<br>');
      seteditPublication({ ...editPublication, [name]: formattedContent });
    } else {
      seteditPublication({ ...editPublication, [name]: value });
    }
  };

  // Editar una publicación ya existente
  const editCommentPublication = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSuscribe(true);
    const hasEmptyField = Object.entries(editPublication).some(
      ([key, value]) => {
        if (value === '' && key !== '_id') {
          key = key === 'base64_img' ? 'image' : key;
          setError(`Please complete the ${key} field`);
          setSuscribe(false);
          return true;
        }
        return false;
      }
    );

    if (hasEmptyField) return;

    try {
      await putCommentPublication(editPublication, editPublication._id);
      setCardsBlog(
        cardsBlog.map((card) =>
          card._id === editPublication._id ? editPublication : card
        )
      );
      toast.success('Post edited successfully');
    } catch (error) {
      console.error('Error to edit post', error);
      toast.error('Error to edit post');
    }
    setShowModalEditPublication(false);
    setError('');
    setSuscribe(false);
  };

  return (
    <div id="blog">
      {loading && cardsBlog.length === 0 && (
        <h1
          style={{
            position: 'absolute',
            top: '35%',
            right: '0',
            fontSize: '30px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          No posts available...
        </h1>
      )}
      {/* Muestra el modal de edición de publicación */}
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
                    value={editPublication.content.replace(/<br>/g, '\n')}
                    onChange={handleInputChange}
                    rows={4}
                    cols={50}
                  />
                </li>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" suscribe={suscribe}>
                  Edit
                </Button>
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
                  handleDeletePublication(publication._id)
                }
                className="close-card-button"
              />
              <Button
                className="edited"
                event={() => handleChangePublication(publication)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="svgIcons"
                  width={20}
                  height={20}
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

      {/* Renderiza el botón solo para usuarios específicos los admins */}
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

export default CardPublicationBlog;
