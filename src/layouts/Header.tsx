import React, { useEffect, useState } from "react";
import Hamburger from "../components/Hamburger";
import Auth from "../components/Auth";
import Languajes from "../components/Languajes";
import Theme from "../components/Theme";
import { type Translations, type NavType } from "../../types/types";
import "../styles/layouts/header.css";
import { useLocation } from "react-router";
import { Exit } from "../components/svg/Exit";

const MainNav: React.FC<NavType> = ({ navInfo }) => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/#mainTitle">{navInfo[0]}</a>
        </li>
        <li>
          <a href="/#reviews">{navInfo[1]}</a>
        </li>
        <li>
          <a href="/#haboutme">{navInfo[2]}</a>
        </li>
        <li>
          <a href="/#hprices">{navInfo[3]}</a>
        </li>
        <li>
          <a href="/#contactForm">{navInfo[4]}</a>
        </li>
      </ul>
    </nav>
  );
};

const Header: React.FC<Translations> = ({ translation }) => {
  const navInfo: string[] = translation("navInfo", { returnObjects: true });
  const [theme, setTheme] = useState<string>(getTheme());
  function getTheme() {
    const darkorligth = localStorage.getItem("theme");
    return darkorligth || "light";
  }
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

  const location = useLocation();

  return (
    <>
      <header>
        <div className="header">
          {window.innerWidth > 766 ? (
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
            <Hamburger
              translation={translation}
              theme={theme}
              setTheme={setTheme}
            />
          )}
          {location.pathname === "/" && <MainNav navInfo={navInfo} />}
          {window.innerWidth > 766 && (
            <div className="navIcons">
              {location.pathname !== "/" && <Exit />}
              <Theme theme={theme} setTheme={setTheme} />
              <Languajes />
              <Auth translation={translation} />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
