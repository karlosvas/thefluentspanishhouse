import { UserContext } from '@/App';
import { deleteComment, editComment } from '@/scripts/render-data';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../reusable/Button';
import { isComment } from '@/utilities/utilities-types';
import OtionsComentSVG from '@/assets//svg/options-coment.svg';
import { type OptionsCommentProps } from 'types/types';

const OptionsComment: React.FC<OptionsCommentProps> = ({
  comment,
  setComments,
  comments,
  responseComment,
  isEdit,
  setIsEdit,
}) => {
  // Mostrar modal de opciones (showModal)
  const [showModal, setShowModal] = useState(false);
  // Usuario actual
  const user = useContext(UserContext);

  // Manejar el borrado de un comentario
  const handleDelete = async () => {
    if (user && user.uid === comment.owner.uid) {
      try {
        await deleteComment(comment._id);
        setComments(comments.filter((v) => v._id !== comment._id));
        toast.success('Comment deleted successfully');
      } catch (error) {
        console.error('Error to submit post', error);
        toast.error('Error to delete comment');
      }
      setShowModal(false);
    } else {
      toast.error("You can't delete this comment, is not yours");
    }
  };

  // Manejar la edición de un comentario
  const handleEdit = () => {
    setIsEdit(true);
    setShowModal(false);
  };

  // Efecto para enfocar el textarea de respuesta y modificarlo para editarlo
  useEffect(() => {
    if (isEdit && responseComment.current) {
      const textarea = responseComment.current;
      textarea.focus();
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
      textarea.onblur = () => {
        setTimeout(() => {
          setIsEdit(false);
        }, 100);
      };
    }
  }, [isEdit, responseComment, setIsEdit]);

  // Manejar el click fuera del modal de opciones
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  // Enviar el comentario editado
  const submitEdit = async () => {
    if (user && user.uid === comment.owner.uid && responseComment.current) {
      try {
        const updatedComment = await editComment(
          comment._id,
          responseComment.current.value
        );

        if (isComment(updatedComment))
          setComments(
            comments.map((comment) =>
              comment._id === updatedComment._id ? updatedComment : comment
            )
          );

        toast.success('Comment edited successfully');
      } catch (error) {
        console.error('Error to submit post', error);
        toast.error('Error to delete comment');
      }
    } else {
      toast.error("You can't delete this comment, is not yours");
    }
  };

  return (
    <>
      {isEdit && (
        <Button className="edit-btn" event={submitEdit}>
          Edit
        </Button>
      )}
      {/* Si se esta mostrando y se hace click fuera del modal, se cierra el modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleClickOutside}>
          {''}
        </div>
      )}
      <div id="options">
        <span onClick={() => setShowModal(!showModal)}>
          <OtionsComentSVG />
        </span>
        {/* Mostramos el input de cambio de comentario */}
        {showModal && (
          <div className="modal-content">
            <ul>
              <li onClick={handleEdit}>Edit</li>
              <li onClick={handleDelete}>Delete</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
export default OptionsComment;
