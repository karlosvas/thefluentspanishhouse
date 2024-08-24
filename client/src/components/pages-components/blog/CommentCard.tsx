import ImgUser from "@/components/svg-component/ImgUser";
import Likes from "@/components/svg-component/Likes";
import { useState } from "react";
import { type Comment } from "types/types";

const CommentCard = ({ comments }: { comments: Comment[] }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id_comment}>
          <div>
            {comment.img && !imgError ? (
              <img
                src={comment.img}
                alt="User profile image"
                onError={() => setImgError(true)}
              />
            ) : (
              <ImgUser />
            )}
            <section>
              <strong>{comment.id_user}</strong>
              <small>
                {comment.email.slice(0, comment.email.indexOf("@"))}
              </small>
            </section>
            <div className="comments-content">
              <p>{comment.data}</p>
              <Likes likes={comment.likes} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentCard;
