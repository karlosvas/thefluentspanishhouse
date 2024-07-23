import React, { useEffect, useState } from "react";
import Hamburger from "../components/Hamburger";
import Auth from "../components/Auth";
import Languajes from "../components/svg/Language";
import { useLocation } from "react-router";
import Exit from "../components/svg/Exit";
import { isLogged } from "../scripts/oauth2-0";
import { type Translations } from "../../types/types";
import "../styles/layouts/header.css";
import MainNav from "../components/MainNav";

const Header: React.FC<Translations> = ({ translation }) => {
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

  // Objeto de traducción del hamburger
  const hamburger = translation
    ? translation("hamburger", { returnObjects: true })
    : [];

  // Botones de login
  const [logged, setLogged] = useState<boolean>(isLogged());
  const handleLoginChange = (status: boolean) => {
    setLogged(status);
  };

  const navInfo: string[] = translation("navInfo", { returnObjects: true });

  return (
    <>
      <header>
        <div className="header">
          {window.innerWidth >= 766 ? (
            location.pathname === "/" ? (
              <a href="#">
                <img
                  src="/img/logo.png"
                  alt="fluent spanish house logo"
                  id="logo"
                />
              </a>
            ) : (
              <a href="/">
                <img
                  src="/img/logo.png"
                  alt="fluent spanish house logo"
                  id="logo"
                />
              </a>
            )
          ) : (
            <>
              <Hamburger
                translation={translation}
                theme={theme}
                setTheme={setTheme}
              />
            </>
          )}
          {location.pathname === "/"
            ? window.innerWidth > 766 && (
                <MainNav
                  navInfo={navInfo}
                  hamburger={hamburger}
                  theme={theme}
                  setTheme={setTheme}
                />
              )
            : window.innerWidth <= 766 && (
                <Exit optionalClass="exitPublication" />
              )}
          {window.innerWidth > 766 && (
            <div className="navIcons">
              {location.pathname !== "/" && (
                <Exit optionalClass="exitHeader">
                  {hamburger && hamburger[0]}
                </Exit>
              )}
              <Languajes />
              <Auth
                translation={translation}
                onLoginChange={handleLoginChange}
                logged={logged}
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
