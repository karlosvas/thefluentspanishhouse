import ImgUser from "@/components/svg-component/ImgUser";
import Likes from "@/components/svg-component/Likes";
import { useContext, useEffect, useState } from "react";
import CommentOptions from "@/components/svg-component/CommentOptions";
import { UserContext } from "@/App";
import { getChildsComment, updateChildrenComment } from "@/scripts/render-data";
import TrashComment from "@/components/svg-component/TrashComment";
import toast from "react-hot-toast";
import { type CommentCardProps, type Comment } from "types/types";
import { useNavigate } from "react-router";

// Se renderiza cada comentario individualmente
const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const [imgError, setImgError] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [responseComment, setResponseComment] = useState("");
  const [childs, setChilds] = useState<Comment[]>([]);

  const user = useContext(UserContext);

  const handleSubmitChildren = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    // Creamos un nuevo comentario
    if (
      responseComment.trim() !== "" &&
      user &&
      user.uid &&
      user.displayName &&
      user.email
    ) {
      const newCommentData: Comment = {
        _id: "",
        pattern_id: comment._id,
        owner: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL || "",
        },
        data: responseComment,
        likes: 0,
        likedBy: [],
        answers: [],
      };
      // Limpiamos el input y lo cerramos
      setResponseComment("");
      setIsResponse(false);
      try {
        await updateChildrenComment(newCommentData, comment._id);
      } catch (error) {
        console.error("Error:", error);
      }
    } else toast.error("Do you need login to comment");
  };

  // Hook para navegar
  const navigate = useNavigate();

  useEffect(() => {
    // Obtenemos los comentarios hijos
    const id = comment._id;
    if (id) {
      getChildsComment(id).then((result) => {
        setChilds(result);
      });
    } else navigate("/404");
  }, [comment._id, navigate, responseComment]);

  return (
    <>
      <li>
        <div>
          {comment.owner && !imgError ? (
            <img
              src={comment.owner.photoURL || ""}
              alt="User profile image"
              onError={() => setImgError(true)}
            />
          ) : (
            <ImgUser />
          )}
          <section>
            <strong>{comment.owner.displayName}</strong>
            {comment.owner.email && (
              <small>
                {comment.owner.email.slice(0, comment.owner.email.indexOf("@"))}
              </small>
            )}
          </section>
          <div className="comments-content">
            <p>{comment.data}</p>
            {user?.uid === comment.owner.uid && (
              <TrashComment id={comment._id} />
            )}
            <Likes comment={comment} />
            <CommentOptions
              isResponse={isResponse}
              setIsResponse={setIsResponse}
            />
          </div>
        </div>
      </li>
      {isResponse && (
        <div className="response-comment">
          <form onSubmit={handleSubmitChildren}>
            <input
              type="text"
              value={responseComment}
              onChange={(e) => setResponseComment(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
      {childs.length > 0 &&
        childs.map((child) => <CommentCard comment={child} />)}{" "}
    </>
  );
};

export default CommentCard;
