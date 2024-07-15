import ImgUser from "../svg/ImgUser";
import { type Comment } from "../../../types/types";

const CrudApp = ({ comments }: { comments: Comment[] }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <div>
            {comment.img ? <img src={comment.img} /> : <ImgUser />}
            <section>
              <strong>{comment.user}</strong>
              <small>
                {comment.email.slice(0, comment.email.indexOf("@"))}
              </small>
            </section>
            <p>{comment.data}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CrudApp;
