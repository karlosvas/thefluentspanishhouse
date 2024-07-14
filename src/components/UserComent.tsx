import { useState } from "react";
import "../styles/publication/comments.css";

const Comments = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="comments">
      <h3>Comentarios de Usuarios</h3>

      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={handleChange}
          placeholder="Escribe tu comentario..."
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit">Enviar Comentario</button>
      </form>
      <div className="oldComments">
        <h3>Comentarios Anteriores</h3>
        {comments.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Comments;
