import { useEffect, useState } from "react";
import Profile from "./Profile";
import MainNav from "./MainNav";
import { handleScroll } from "@/scripts/modal";
import { useLocation } from "react-router-dom";
import Backdrop from "@/components/reusable/Backdrop";
import { type ThemeProps } from "types/types";
import "@/styles/hamburger.css";

const Hamburger: React.FC<ThemeProps> = ({ theme, setTheme }) => {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    if (showModal) {
      setClosing(true);
      setTimeout(() => {
        setShowModal(false);
        setClosing(false);
      }, 300);
    } else {
      setShowModal(true);
    }
    handleScroll(!showModal);
  };

  useEffect(() => {
    if (showModal) {
      setClosing(true);
      setTimeout(() => {
        setShowModal(false);
        setClosing(false);
      }, 300);
    }
    handleScroll(false);
  }, [location]);

  return (
    <>
      <div id="hamburger">
        <svg
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className="svgIcons"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        {(showModal || closing) && (
          <>
            <div className={`menu-left ${closing ? "closing" : ""}`}>
              <Profile />
              <div className="config">
                <MainNav theme={theme} setTheme={setTheme} />
              </div>
            </div>
            <Backdrop handleSusribeChange={handleClick} closing={closing} />
          </>
        )}
      </div>
    </>
  );
};

export default Hamburger;
