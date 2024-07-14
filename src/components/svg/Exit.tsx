import { Link } from "react-router-dom";
import { type ChildrenType, OptionalClass } from "../../../types/types";

const Exit: React.FC<ChildrenType & OptionalClass> = ({
  children,
  optionalClass,
}) => {
  return (
    <Link to="/" id="exit">
      <div className={`menuSection ${optionalClass}`}>
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
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
          />
        </svg>
        {children}
      </div>
    </Link>
  );
};

export default Exit;
