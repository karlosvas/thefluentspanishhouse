import { useNavigate, Link } from "react-router-dom";
import { handleScroll } from "../../scripts/modal";
import { type ChildrenType, type OptionalClass } from "../../../types/types";

const Exit: React.FC<ChildrenType & OptionalClass> = ({
  children,
  optionalClass,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    handleScroll(false);
    navigate(-1);
  };

  return (
    <Link to="#" id="exit" onClick={goBack}>
      <div className={`menu-section ${optionalClass}`}>
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
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
          />
        </svg>
        {children}
      </div>
    </Link>
  );
};

export default Exit;
