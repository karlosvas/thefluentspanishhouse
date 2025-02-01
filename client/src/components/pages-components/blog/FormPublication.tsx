import { useState } from 'react';
import toast from 'react-hot-toast';
import { getPublications, postPublication } from '@/services/render-data';
import ButtonClose from '@/components/reusable/ButtonClose';
import Backdrop from '@/components/reusable/Backdrop';
import { useNavigate, useParams } from 'react-router';
import { MAX_PUBLICATIONS_PER_PAGE } from '@/constants/global';
import Button from '@/components/reusable/Button';
import {
  type PublicationCardType,
  type FormPublicationProps,
} from 'types/types';
import '@/styles/uploadfiles.css';

const FormPublication: React.FC<FormPublicationProps> = ({
  closing,
  handleChange,
  cardsBlog,
}) => {
  // Estado de error (error), estado de la vista previa de la imagen (imagePreview)
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  // Ultima pagina de publicaciones
  const lastPage =
    cardsBlog.length > 0 ? cardsBlog[cardsBlog.length - 1].currentPage : 1;

  // Estado de la nueva publicación (newPublication)
  const [newPublication, setNewPublication] = useState<PublicationCardType>({
    _id: '',
    title: '',
    subtitle: '',
    content: '',
    base64_img: '',
    currentPage: lastPage,
  });

  // Parametro de la URL que indica la pagina actual (page)
  const { page } = useParams<{ page: string }>();
  if (page) newPublication.currentPage = parseInt(page);

  // Redimensionar la imagen (resizeImage)
  const resizeImage = (
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('No se pudo obtener el contexto del canvas'));
            return;
          }
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((maxWidth / width) * height);
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = Math.round((maxHeight / height) * width);
            height = maxHeight;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 1);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Manejar el cambio de archivo (handleFileChange)
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && !file.type.startsWith('image/')) {
      setError('Por favor, selecciona un archivo de imagen.');
      event.target.value = '';
    } else {
      setError('');
      if (file) {
        try {
          const resizedBase64Image = await resizeImage(file, 800, 600);
          setNewPublication((prev: PublicationCardType) => ({
            ...prev,
            base64_img: resizedBase64Image,
          }));
          setImagePreview(resizedBase64Image);
        } catch (error) {
          setError('Error al redimensionar la imagen.');
          console.error(error);
        }
      }
    }
  };

  // Manejar el cambio de entrada (handleInputChange)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'content') {
      const formattedContent = value.replace(/\n/g, '<br>');
      setNewPublication({ ...newPublication, [name]: formattedContent });
    } else {
      setNewPublication({ ...newPublication, [name]: value });
    }
  };

  // Manejar el arrastre (handleDrop)
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && !file.type.startsWith('image/')) {
      setError('Please select an image file');
      toast.error('Please select an image file');
    } else {
      setError('');
      if (file) {
        try {
          const resizedBase64Image = await resizeImage(file, 800, 600);
          setNewPublication((prev: PublicationCardType) => ({
            ...prev,
            base64_img: resizedBase64Image,
          }));
          setImagePreview(resizedBase64Image);
        } catch (error) {
          setError('Error al redimensionar la imagen.');
          console.error(error);
        }
      }
    }
  };

  // Manejar el arrastre sobre (handleDragOver)
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Verificar si es un tipo de tarjeta de publicación (isPublicationCardType)
  function isPublicationCardType(obj: unknown): obj is PublicationCardType {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof (obj as PublicationCardType)._id === 'string' &&
      typeof (obj as PublicationCardType).title === 'string' &&
      typeof (obj as PublicationCardType).subtitle === 'string' &&
      typeof (obj as PublicationCardType).content === 'string' &&
      typeof (obj as PublicationCardType).base64_img === 'string' &&
      typeof (obj as PublicationCardType).currentPage === 'number'
    );
  }

  // Función de React para navegar entre rutas (navigate)
  const navigate = useNavigate();
  // Estado de suscripción al evento, oseqa si esta enviandose la informacion (suscribe)
  const [suscribe, setSuscribe] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Nos suscribimos al evento, enviando informacion
    setSuscribe(true);

    // Verificar que esten todos los campos completos
    const hasEmptyField = Object.entries(newPublication).some(
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
      if (cardsBlog.length < MAX_PUBLICATIONS_PER_PAGE) {
        const newCard = await postPublication(event, newPublication);
        if (isPublicationCardType(newCard)) cardsBlog.push(newCard);
      } else {
        // Desde la pagina uno buscamos cual es la siguiente pagina donde hay menos de 6 publicaciones para insertar contenido
        let actualPage = 1;
        let arrayPublications = [] as PublicationCardType[];
        while (
          arrayPublications.length >= MAX_PUBLICATIONS_PER_PAGE ||
          actualPage === 1
        ) {
          actualPage++;
          const data = await getPublications(actualPage.toString());
          if (Array.isArray(data)) arrayPublications = data;

          if (actualPage == 10) break;
        }
        const updatedPublication = {
          ...newPublication,
          currentPage: actualPage,
        };
        await postPublication(event, updatedPublication);
        navigate(`/blog/${actualPage}`);
      }
    } catch (error) {
      console.error('Error al enviar el post:', error);
    }
    handleChange();
    setTimeout(() => {
      setSuscribe(false);
    }, 1000);
  };

  return (
    <>
      <div className={'upload-publication'}>
        <ButtonClose handleSusribeChange={handleChange} />
        <h3>New Publication</h3>
        <form onSubmit={onSubmit}>
          <ul>
            <li>
              Title
              <input
                type="text"
                name="title"
                value={newPublication.title}
                onChange={handleInputChange}
              />
            </li>
            <li>
              Subtitle
              <input
                type="text"
                name="subtitle"
                value={newPublication.subtitle}
                onChange={handleInputChange}
              />
            </li>
            <li>
              New content
              <br />
              <textarea
                name="content"
                value={newPublication.content.replace(/<br>/g, '\n')}
                onChange={handleInputChange}
                rows={4}
                cols={50}
              />
            </li>
            <li>
              <div onDrop={handleDrop} onDragOver={handleDragOver}>
                <label className="custom-file-upload">
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <p>Select or drag the image</p>
                  )}
                </label>
              </div>
              {error && (
                <p style={{ color: 'red', fontWeight: 'semibold' }}>{error}</p>
              )}
            </li>
            <Button id="submit-post" type="submit" suscribe={suscribe}>
              Submit
            </Button>
          </ul>
        </form>
      </div>
      <Backdrop handleSusribeChange={handleChange} closing={closing} />
    </>
  );
};

export default FormPublication;
