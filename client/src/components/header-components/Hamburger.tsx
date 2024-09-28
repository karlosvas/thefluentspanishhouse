import { useContext, useEffect, useState } from "react";
import Profile from "./Profile";
import MainNav from "./MainNav";
import { handleScroll } from "@/scripts/modal";
import { useLocation } from "react-router-dom";
import Backdrop from "@/components/reusable/Backdrop";
import { UserContext } from "@/App";
import "@/styles/hamburger.css";

const Hamburger = () => {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);
  const location = useLocation();
  const user = useContext(UserContext);

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

  useEffect(() => {
    if (user) {
      if (!user.displayName) {
        setTimeout(() => {
          handleClick();
        }, 800);
      }
    }
  }, [user]);

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
                <MainNav />
              </div>
            </div>
          </>
        )}
      </div>
      {(showModal || closing) && (
        <Backdrop handleSusribeChange={handleClick} closing={closing} />
      )}
    </>
  );
};

export default Hamburger;
