import ImgUser from "@/components/svg-component/ImgUser";
import Likes from "@/components/svg-component/Likes";
import { useContext, useEffect, useState } from "react";
import { type CommentCardProps, type Comment } from "types/types";
import CommentOptions from "@/components/svg-component/CommentOptions";
import { UserContext } from "@/App";
import { postComment } from "@/scripts/render-data";
import TrashComment from "@/components/svg-component/TrashComment";

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  comments,
  setComments,
}) => {
  const [imgError, setImgError] = useState(false);
  const [responseComment, setResponseComment] = useState(false);
  const [contentResponse, setContentResponse] = useState("");

  const user = useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (contentResponse.trim() !== "") {
      const newCommentData: Comment = {
        _id: "",
        id_comment: comment._id,
        owner: {
          uid: user?.uid || "",
          displayName: user?.displayName || "Anonyme",
          email: user?.email || "",
          photoURL: user?.photoURL || "",
        },
        data: contentResponse,
        likes: 0,
        likedBy: [],
      };

      console.log(comment._id === newCommentData.id_comment);
      const updatedComments = [...comments, newCommentData];
      setComments(updatedComments);
      // setNewComment("");

      try {
        await postComment(newCommentData);
        console.log("Comment posted successfully");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const [childs, setChild] = useState<Comment[]>([]);

  useEffect(() => {
    // Aun falta filtrar los comentarios hijos
    const childs = comments.filter((child) => child.id_comment === null);
    setChild(childs);
  }, [comments, comment._id]);

  return (
    <>
      <li key={comment._id}>
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
              responseComment={responseComment}
              setResponseComment={setResponseComment}
            />
          </div>
        </div>
      </li>
      {responseComment && (
        <div className="response-comment">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={contentResponse}
              onChange={(e) => setContentResponse(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
      {Array.isArray(childs) && childs.length > 0 && (
        <ul>
          {childs.map((child) => (
            <CommentCard
              comment={child}
              comments={comments}
              setComments={setComments}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default CommentCard;
