import { UserContext } from "@/App";
import { deleteComment, editComment } from "@/scripts/render-data";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { type Comment } from "types/types";

interface OptionsCommentProps {
  id: string;
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  comments: Comment[];
}

const OptionsComment: React.FC<OptionsCommentProps> = ({
  id,
  comment,
  setComments,
  comments,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);
  const [textEdit, setTextEdit] = useState("");
  const user = useContext(UserContext);

  const handleDelete = async () => {
    if (user && user.uid === comment.owner.uid) {
      try {
        await deleteComment(id);
        setComments(comments.filter((comment) => comment._id !== id));
        toast.success("Comment deleted successfully");
      } catch (error) {
        console.error("Error to submit post", error);
        toast.error("Error to delete comment");
      }
      setShowModal(false);
    } else {
      toast.error("You can't delete this comment, is not yours");
    }
  };

  const handleEdit = async () => {
    if (user && user.uid === comment.owner.uid) {
      try {
        const updatedComment = await editComment(id, textEdit);
        setComments(
          comments.map((comment) =>
            comment._id === updatedComment._id ? updatedComment : comment
          )
        );
        toast.success("Comment edited successfully");
      } catch (error) {
        console.error("Error to submit post", error);
        toast.error("Error to delete comment");
      }
      setShowModal(false);
      setShowEditComment(false);
    } else {
      toast.error("You can't delete this comment, is not yours");
    }
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
      setShowEditComment(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay" onClick={handleClickOutside}>
          {""}
        </div>
      )}
      <div id="options">
        {showModal && !showEditComment && (
          <div className="modal-content">
            <ul>
              <li onClick={() => setShowEditComment(true)}>Edit</li>
              <li onClick={handleDelete}>Delete</li>
            </ul>
          </div>
        )}
        {showEditComment && (
          <div className="modal-content edit">
            <textarea
              value={textEdit}
              onChange={(e) => setTextEdit(e.target.value)}
              className="edit-comment"
            ></textarea>
            <button onClick={handleEdit}>Edit</button>
          </div>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"
          onClick={() => setShowModal(!showModal)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        </svg>
      </div>
    </>
  );
};
export default OptionsComment;
