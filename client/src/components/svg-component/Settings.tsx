import { useNavigate } from "react-router-dom";
import { isLogged } from "../../scripts/oauth2-0";
import toast from "react-hot-toast";

export const Settings = () => {
  const navigate = useNavigate();

  function goToAccount(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isLogged()) navigate("/account");
    else toast.error("You need to log in first");
    event.preventDefault();
  }

  return (
    <>
      <a
        href="/account"
        id="exit"
        className="menu-section"
        onClick={goToAccount}
      >
        <div className="menu-section">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="svgIcons"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </div>
      </a>
    </>
  );
};

export default Settings;
