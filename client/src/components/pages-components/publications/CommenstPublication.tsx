import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentCard from "@/components/pages-components/publications/CommentCard";
import { getComments, postComment } from "@/scripts/render-data";
import { UserContext } from "@/App";
import { type Comment } from "types/types";
import "@/styles/comments.css";

const CommentsPublication = () => {
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
        _id: "",
        id_comment: id || "",
        owner: {
          uid: user?.uid || "",
          displayName: user?.displayName || "Anonyme",
          email: user?.email || "anonyme@gmail.com",
          photoURL: user?.photoURL || "",
        },
        data: newComment,
        likes: 0,
        likedBy: [],
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
  }, [comments]);

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
      <div className="old-comments">
        <h3>Previous Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <>
            {comments.map((comment) => (
              <ul>
                <CommentCard
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
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
