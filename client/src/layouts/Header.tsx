import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Hamburger from "../components/header-components/Hamburger";
import Auth from "../components/header-components/Auth";
import Exit from "../components/svg-component/Exit";
import MainNav from "../components/header-components/MainNav";
import Theme from "../components/svg-component/Theme";
import "../styles/header.css";
import Settings from "../components/svg-component/Settings";

const Header = () => {
  // Estados
  const [theme, setTheme] = useState<string>(getTheme());

  // Recisar si estaba enteriormente en localstorage
  function getTheme() {
    const darkorligth = localStorage.getItem("theme");
    return darkorligth || "light";
  }

  // Efectos para cambiar de tema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
    else setTheme("light");
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Uri actual
  const location = useLocation();

  return (
    <>
      <header>
        <section id="sect">
          <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
          </div>
        </section>
        <div className="header">
          {window.innerWidth >= 766 ? (
            location.pathname === "/" ? (
              <a href="#">
                <img
                  src="./logos/logo-o.webp"
                  alt="fluent spanish house logo"
                  id="logo"
                />
              </a>
            ) : (
              <a href="/">
                <img
                  src="./logos/logo-o.webp"
                  alt="fluent spanish house logo"
                  id="logo"
                />
              </a>
            )
          ) : (
            <>
              <Hamburger theme={theme} setTheme={setTheme} />
            </>
          )}
          {window.innerWidth > 766 ? (
            <MainNav theme={theme} setTheme={setTheme} />
          ) : (
            window.innerWidth <= 766 &&
            location.pathname !== "/" && (
              <Exit optionalClass="exitPublication" />
            )
          )}
          {window.innerWidth > 766 && (
            <div className="navIcons">
              <Settings />
              <Theme theme={theme} setTheme={setTheme} />
              <Auth />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
