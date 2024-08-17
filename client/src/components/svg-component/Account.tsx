import { isLogged } from "../../scripts/oauth2-0";
import toast from "react-hot-toast";
import { type ChildrenType } from "../../../types/types";
import { useNavigate } from "react-router-dom";

export const Account: React.FC<ChildrenType> = ({ children }) => {
  const navigate = useNavigate();

  function goToAccount(event: React.MouseEvent<HTMLDivElement>) {
    if (isLogged()) navigate("/account");
    else toast.error("You need to log in first");
    event.preventDefault();
  }

  return (
    <div className="menuSection" onClick={goToAccount}>
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="svgIcon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 1 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </div>
  );
};

export default Account;
