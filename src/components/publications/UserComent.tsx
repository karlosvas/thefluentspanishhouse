import { useEffect, useState } from "react";
import CrudApp from "../db/CrudApp";
import Helper from "../db/Helper";
import "../../styles/publication/comments.css";
import { getUser } from "../../scripts/oauth2-0";
import { type Comment } from "../../../types/types";
import { v4 as uuidv4 } from "uuid";

const Comments = () => {
  // Estado de los comentarios actuales, y del Text Area
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  //Usuario actual
  const user = getUser();

  // Api helper y su url
  const api = Helper();
  const url_api =
    import.meta.env.VITE_ENV === "development"
      ? import.meta.env.VITE_API_LOCAL_URL
      : import.meta.env.VITE_API_URL;

  // Cada vez que se pulsa una tecla
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  // Cada vez que se envia el formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newComment.trim() !== "") {
      const newCommentData = {
        id: uuidv4().toString(),
        user: user?.displayName || "Anonyme",
        email: user?.email || "Anonyme@gmail.com",
        img: user?.photoURL || null,
        data: newComment,
      };

      const updatedComments = [...comments, newCommentData];
      setComments(updatedComments);
      setNewComment("");

      try {
        await api.post(url_api, {
          body: JSON.stringify(newCommentData),
        });
        console.log("Datos enviados correctamente:");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    console.log(url_api);
    api
      .get(url_api)
      .then((res) => {
        if (!res.err && Array.isArray(res)) {
          setComments(res);
        } else {
          setComments([]);
        }
      })
      .catch((e) => {
        console.error(e);
        setComments([]);
      });
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
          // Itera para mostrar todos los comentarios
          <CrudApp comments={comments} />
        )}
      </div>
    </div>
  );
};

export default Comments;
