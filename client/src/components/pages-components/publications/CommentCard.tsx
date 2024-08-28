import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getChildsComment, updateChildrenComment } from "@/scripts/render-data";
import ImgUser from "@/components/svg-component/ImgUser";
import Likes from "@/components/svg-component/Likes";
import OptionsComment from "@/components/svg-component/OptionsComment";
import ReplyToComment from "@/components/svg-component/ReplyToComment";
import { type CommentCardProps, type Comment } from "types/types";

// Se renderiza cada comentario individualmente
const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  user,
  openTread,
  setOpenTread,
  depth,
}) => {
  const [isResponse, setIsResponse] = useState(false);
  const [responseComment, setResponseComment] = useState("");
  const [childs, setChilds] = useState<Comment[]>([]);

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
  }, [comment._id, navigate, isResponse]);

  return (
    <>
      <li className={`depth-${depth}`}>
        <div className="comment">
          <ImgUser photoURL={comment.owner.photoURL} />
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
            <OptionsComment id={comment._id} comment={comment} />
          </div>
          <ReplyToComment
            user={user}
            isResponse={isResponse}
            setIsResponse={setIsResponse}
          />
          <Likes comment={comment} />
        </div>
      </li>
      {isResponse && user && (
        <div className="response-comment">
          <ImgUser photoURL={user?.photoURL} />
          <form onSubmit={handleSubmitChildren}>
            <input
              type="text"
              value={responseComment}
              onChange={(e) => setResponseComment(e.target.value)}
              placeholder="Text here..."
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
      {childs.length > 0 &&
        (depth < 3 || openTread ? (
          <>
            {childs.map((child) => (
              <CommentCard
                key={child._id}
                comment={child}
                user={user}
                openTread={openTread}
                setOpenTread={setOpenTread}
                depth={depth + 1}
              />
            ))}
            {depth > 3 && (
              <p className="state-thread" onClick={() => setOpenTread(false)}>
                Close Tread...
              </p>
            )}
          </>
        ) : (
          <p className="state-thread" onClick={() => setOpenTread(true)}>
            Open thread...
          </p>
        ))}
    </>
  );
};

export default CommentCard;
