import { UserContext } from "@/App";
import { deleteComment } from "@/scripts/render-data";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { type Comment } from "types/types";

const OptionsComment = ({ id, comment }: { id: string; comment: Comment }) => {
  const [showModal, setShowModal] = useState(false);
  const user = useContext(UserContext);

  const handleDelete = async () => {
    if (user && user.uid === comment.owner.uid) {
      try {
        await deleteComment(id);
        toast.success("Comment deleted successfully");
      } catch (error) {
        console.error("Error to submit post", error);
        toast.error("Error to delete comment");
      }
      setShowModal(false);
    }
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div id="options">
      {showModal && (
        <div className="modal-overlay" onClick={handleClickOutside}>
          <div className="modal-content">
            <ul>
              <li onClick={() => setShowModal(false)}>Cancel</li>
              <li onClick={handleDelete}>Delete</li>
            </ul>
          </div>
        </div>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"
        onClick={() => setShowModal(!showModal)}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      </svg>
    </div>
  );
};
export default OptionsComment;
