import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import CommentCard from "../blog/CommentCard";
import { type Comment } from "../../../../types/types";
import { getComments, postComment } from "../../../scripts/render-data";
import "../../../styles/comments.css";
import { UserContext } from "../../../App";

const CommentPublication = () => {
  // Estado de los comentarios actuales, y del Text Area
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Id de la publicación
  const { id } = useParams<{ id: string }>();

  //Usuario actual
  const user = useContext(UserContext);

  // Cada vez que se pulsa una tecla
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  // Cada vez que se envia el formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentData: Comment = {
        id_comment: uuidv4().toString(),
        id_publication: id || "",
        id_user: user?.displayName || "Anonyme",
        email: user?.email || "Anonyme@gmail.com",
        img: user?.photoURL || "",
        data: newComment,
      };

      const updatedComments = [...comments, newCommentData];
      setComments(updatedComments);
      setNewComment("");

      try {
        const data = await postComment(newCommentData);
        Array.isArray(data) && data.length !== 0 && setComments(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Obtener comentarios cuando el componente se monta o cuando cambia el id
  useEffect(() => {
    getComments(id).then((data) => {
      setComments(data);
    });
  }, []);

  return (
    <div className="comments">
      <h3>User Comments</h3>

      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={handleChange}
          placeholder="Write your comment..."
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit">Submit Comment</button>
      </form>
      <div className="oldComments">
        <h3>Previous Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <CommentCard comments={comments} />
        )}
      </div>
    </div>
  );
};

export default CommentPublication;
