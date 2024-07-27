import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "../../scripts/oauth2-0";
import { url_api } from "../../../public/constants/global";
import CommentCard from "../pages-components/blog/CommentCard";
import { type Comment } from "../../../types/types";
import "../../styles/comments.css";

const CommentPublication = () => {
  // Estado de los comentarios actuales, y del Text Area
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const { id } = useParams();

  //Usuario actual
  const user = getUser();

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
        await postComment(newCommentData);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(`${url_api}/api/comments/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok)
        throw new Error("Hubo un problema al obtener los datos.");
      const data = await response.json();
      Array.isArray(data) && data.length !== 0 && setComments(data);
      if (!response.ok)
        throw new Error("Hubo un problema al obtener los datos.");
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const postComment = async (newCommentData: Comment) => {
    try {
      const response = await fetch(`${url_api}/api/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentData),
      });
      if (!response.ok)
        throw new Error("Hubo un problema al crear el comentario.");
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

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
          <CommentCard comments={comments} />
        )}
      </div>
    </div>
  );
};

export default CommentPublication;
