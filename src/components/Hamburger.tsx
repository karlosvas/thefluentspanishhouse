import { useState } from "react";
import Languajes from "./svg/Language";
import Theme from "./svg/Theme";
import Exit from "./svg/Exit";
import Account from "./svg/Account";
import Settings from "./svg/Settings";
import Profile from "./Profile";
import { type Translations, ThemeProps } from "../../types/types";
import "../styles/layouts/hamburger.css";

const Hamburger: React.FC<Translations & ThemeProps> = ({
  translation,
  theme,
  setTheme,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleScroll = (showModal: boolean) => {
    showModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  };

  const handleClick = () => {
    if (showModal) {
      setClosing(true);
      setTimeout(() => {
        setShowModal(false);
        setClosing(false);
        handleScroll(false);
      }, 500);
    } else {
      setShowModal(true);
      handleScroll(true);
    }
  };

  const hamburger = translation
    ? translation("hamburger", { returnObjects: true })
    : [];

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
        {(showModal || closing) && (
          <>
            <div className={`menuLeft ${closing ? "closing" : ""}`}>
              <Profile translation={translation} />
              <div className="config">
                {location.pathname !== "/" && (
                  <section>
                    <Exit>{hamburger[0]}</Exit>
                  </section>
                )}
                <section>
                  <Theme theme={theme} setTheme={setTheme}>
                    {hamburger[1]}
                  </Theme>
                </section>
                <section>
                  <Languajes>{hamburger[2]}</Languajes>
                </section>
                <section>
                  <Account>{hamburger[3]}</Account>
                </section>
                <section>
                  <Settings>{hamburger[4]}</Settings>
                </section>
              </div>
            </div>
            <div
              className={`modalBackdrop ${closing ? "closing" : ""}`}
              onClick={handleClick}
            ></div>
          </>
        )}
      </div>
    </>
  );
};

export default Hamburger;
