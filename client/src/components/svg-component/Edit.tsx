import { useNavigate } from "react-router";
import { changeOptionsUser } from "@/scripts/firebase-options-users";
import { useContext } from "react";
import { UserContext } from "@/App";
import { type EditType } from "types/types";

const Edit: React.FC<EditType> = ({ commentText, event, index, state }) => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  return (
    <>
      {state ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="20px"
          height="20px"
          strokeWidth="1.5"
          stroke="green"
          className="svgIcons"
          onClick={() => {
            event(index);
            changeOptionsUser(commentText, navigate, user);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          width="20px"
          height="20px"
          stroke="currentColor"
          className="svgIcons"
          onClick={() => {
            event(index);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      )}
    </>
  );
};

export default Edit;
