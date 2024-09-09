import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CommentCard from "@/components/pages-components/publications/CommentCard";
import { getCommentsByID, postComment } from "@/scripts/render-data";
import { UserContext } from "@/App";
import { type Comment } from "types/types";
import "@/styles/comments.css";
import toast from "react-hot-toast";
import { isCommentArray } from "@/utilities/utilities-types";

const CommentsPublication = () => {
  // Estado de los comentarios actuales, y del Text Area
  const [comments, setComments] = useState<Comment[]>([]);
  const newCommentRef = useRef<HTMLTextAreaElement>(null);
  const [openTread, setOpenTread] = useState(false);

  // Id de la publicación
  const { id } = useParams<{ id: string }>();

  //Usuario actual
  const user = useContext(UserContext);

  // Cada vez que se envia el formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      newCommentRef.current &&
      newCommentRef.current.value.trim() !== "" &&
      id &&
      user &&
      user.uid &&
      user.displayName &&
      user.email
    ) {
      // Crear el nuevo comentario
      const newCommentData: Comment = {
        _id: "",
        pattern_id: id,
        owner: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL || "",
        },
        data: newCommentRef.current.value,
        likes: 0,
        likedBy: [],
        answers: [],
      };
      // Limpiar el text area
      newCommentRef.current.value = "";
      // Enviar el comentario
      await postComment(newCommentData);
      // Si se ha enviado correctamente, añadirlo a la lista de comentarios
      const updatedComments = await getCommentsByID(id);
      if (isCommentArray(updatedComments)) {
        updatedComments.reverse();
        setComments(updatedComments);
      }
    } else toast.error("Do you need login to comment");
  };

  const navigate = useNavigate();

  // Obtener comentarios cuando el componente se monta o cuando cambia el id
  useEffect(() => {
    if (id)
      getCommentsByID(id).then((result) => {
        if (isCommentArray(result)) {
          result.reverse();
          setComments(result);
        }
      });
    else navigate("/404");
  }, [id, navigate]);

  return (
    <div className="comments">
      <h3>User Comments</h3>

      <form onSubmit={handleSubmit}>
        <textarea ref={newCommentRef} placeholder="Write your comment..." rows={4} cols={50} />
        <br />
        <button type="submit">Submit Comment</button>
      </form>
      <div className="old-comments">
        <h3>Previous Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <>
            {comments.map((comment) => (
              <ul key={comment._id}>
                <CommentCard
                  comment={comment}
                  user={user}
                  openTread={openTread}
                  setOpenTread={setOpenTread}
                  setComments={setComments}
                  comments={comments}
                  depth={0}
                />
              </ul>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentsPublication;
