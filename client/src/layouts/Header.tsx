import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Hamburger from "@/components/header-components/Hamburger";
import Auth from "@/components/header-components/Auth";
import Exit from "@/components/svg-component/Exit";
import MainNav from "@/components/header-components/MainNav";
import Theme from "@/components/svg-component/Theme";
import Settings from "@/components/svg-component/Settings";
import "@/styles/header.css";
import { Link } from "react-router-dom";
import { handleClickNavigate } from "@/scripts/navigate";

const Header = () => {
  // Estados
  const [theme, setTheme] = useState<string>(getTheme());
  const [isShrunk, setIsShrunk] = useState<boolean>(false);

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

  // Manejar el scroll para cambiar el tamaño del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Uri actual
  const location = useLocation();
  // Navegación
  const navigate = useNavigate();

  return (
    <header className={isShrunk ? "shrink" : ""}>
      <div className="header-animation">
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
            <Link to="/" onClick={handleClickNavigate("/", navigate)}>
              <img
                src="/logos/logo.png"
                alt="fluent spanish house logo"
                id="logo"
              />
            </Link>
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
              <Exit optionalClass="exit-publication" />
            )
          )}
          {window.innerWidth > 766 && (
            <div className="nav-icons">
              <Settings />
              <Theme theme={theme} setTheme={setTheme} />
              <Auth />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
