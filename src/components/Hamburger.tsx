import { useState } from "react";
import Auth from "./Auth";
import Languajes from "./Languajes";
import Theme from "./Theme";
import { toggleModal } from "../scripts/modal";
import { type Translations } from "../../types/types";

const Hamburger: React.FC<Translations> = ({ translation }) => {
  const [showModal, setShowModal] = useState(false);
  document.documentElement.classList.add("light");
  const hamburger: string[] = translation("hamburger", { returnObjects: true });

  return (
    <>
      <div id="hamburger">
        <svg
          onClick={() => toggleModal(showModal, setShowModal)}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="svgIcon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        {showModal && (
          <>
            <div className="menuLeft">
              <div className="auth">
                <Auth translation={translation} />
              </div>
              <section>
                {hamburger[0]} <Theme />
              </section>
              <section>
                {hamburger[1]} <Languajes />
              </section>
            </div>
            <div
              className="modalBackdrop"
              onClick={() => toggleModal(showModal, setShowModal)}
            ></div>
          </>
        )}
      </div>
    </>
  );
};

export default Hamburger;
