import toast from "react-hot-toast";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getChildsComment } from "@/scripts/render-data";
import OptionsComment from "@/components/svg-component/OptionsComment";
import ReplyToComment from "@/components/svg-component/ReplyToComment";
import { isCommentArray } from "@/utilities/utilities-types";
import { type CommentCardProps, type Comment } from "types/types";
import ImgUser from "@/components/svg-component/ImgUser";
import Likes from "@/components/svg-component/Likes";
import Response from "@/components/pages-components/publications/Response";

// Se renderiza cada comentario individualmente
const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  user,
  openTread,
  setOpenTread,
  setComments,
  comments,
  depth,
}) => {
  // Manejar cuando se esta respondiendo a un comentario (isResponse)
  const [isResponse, setIsResponse] = useState(false);
  // Estado para saber si se esta editando un comentario (isEdit)
  const [isEdit, setIsEdit] = useState(false);
  // Estado de los comentarios hijos del actual comentario (childs)
  const [childs, setChilds] = useState<Comment[]>([]);
  // Estado para saber si se ha mostrado el mensaje de cerrar el hilo (hasShownCloseTread)
  const [hasShownCloseTread, setHasShownCloseTread] = useState(false);
  // Estado del texto del comentario
  const [commentText, setCommentText] = useState(comment.data);

  // Referencia al input de respuesta
  const responseComment = useRef<HTMLTextAreaElement>(null);

  // Hook para navegar
  const navigate = useNavigate();

  // Obtener los comentarios hijos
  async function fetchChildComments(id: string) {
    try {
      const result = await getChildsComment(id);
      if (isCommentArray(result)) setChilds(result.reverse());
    } catch (error) {
      console.error("Error al obtener datos:", error);
      toast.error("Error al obtener datos");
    }
  }

  // Luego llama a esta función donde sea necesario
  useEffect(() => {
    // Obtenemos los comentarios hijos
    if (comment.answers.length > 0) {
      const id = comment._id;
      if (id) fetchChildComments(id);
      else navigate("/404");
    }
  }, [comment, navigate]);

  const handleCommentChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setCommentText(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (responseComment.current) {
      responseComment.current.style.height = "auto";
      responseComment.current.style.height = `${responseComment.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [commentText]);

  useEffect(() => {
    if (responseComment.current) {
      adjustTextareaHeight();
    }
  }, []);

  return (
    <>
      <li className={`depth-${depth}`}>
        <div className="comments-wrapper">
          <div className="comments-user">
            <ImgUser photoURL={comment.owner.photoURL} />
            <section>
              <strong>{comment.owner.displayName}</strong>
              {comment.owner.email && (
                <small>
                  {comment.owner.email.slice(
                    0,
                    comment.owner.email.indexOf("@")
                  )}
                </small>
              )}
            </section>
          </div>
          <div className="comments-content">
            <textarea
              ref={responseComment}
              value={commentText}
              onChange={handleCommentChange}
              disabled={!isEdit}
            />
            <OptionsComment
              comment={comment}
              setComments={setComments}
              comments={comments}
              responseComment={responseComment}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
            />
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
        <Response
          user={user}
          setIsResponse={setIsResponse}
          childs={childs}
          setChilds={setChilds}
          comment={comment}
        />
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
                setComments={setComments}
                comments={comments}
                depth={depth + 1}
              />
            ))}
            {depth > 3 && !hasShownCloseTread && (
              <p
                className="state-thread"
                onClick={() => {
                  setOpenTread(false);
                  setHasShownCloseTread(true);
                }}
              >
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
