import { useState } from "react";
import Auth from "./Auth";
import Languajes from "./Languajes";
import Theme from "./Theme";
import { toggleModal } from "../scripts/modal";
import { type Translations, ThemeProps } from "../../types/types";
import { Exit } from "./svg/Exit";

const Hamburger: React.FC<Translations & ThemeProps> = ({
  translation,
  theme,
  setTheme,
}) => {
  const [showModal, setShowModal] = useState(false);
  const hamburger: string[] = translation("hamburger", { returnObjects: true });

  const handleScroll = (showModal: boolean) => {
    showModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  };

  const handleClick = () => {
    toggleModal(showModal, setShowModal);
    handleScroll(!showModal);
  };

  return (
    <>
      <div id="hamburger">
        <svg
          onClick={handleClick}
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
              <div className="config">
                <section>
                  Exit <Exit />
                </section>
                <section>
                  {hamburger[0]} <Theme theme={theme} setTheme={setTheme} />
                </section>
                <section>
                  {hamburger[1]} <Languajes />
                </section>
                <section>
                  Cuenta
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="svgIcon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </section>
                <section>
                  Ajustes
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="svgIcon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                </section>
              </div>
            </div>
            <div className="modalBackdrop" onClick={handleClick}></div>
          </>
        )}
      </div>
    </>
  );
};

export default Hamburger;
