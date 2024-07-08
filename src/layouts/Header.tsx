import React from "react";
import Hamburger from "../components/Hamburger";
import Auth from "../components/Auth";
import Languajes from "../components/Languajes";
import Theme from "../components/Theme";
import { type Translations } from "../../types/types";
import "../styles/header.css";

const Header: React.FC<Translations> = ({ translation }) => {
  const navInfo: string[] = translation("navInfo", { returnObjects: true });
  return (
    <>
      <header>
        <div className="header">
          {window.innerWidth > 766 ? (
            <a href="#">
              <img
                src="/img/logo.png"
                alt="fluent spanish house logo"
                id="logo"
              />
            </a>
          ) : (
            <Hamburger translation={translation} />
          )}
          <nav>
            <ul>
              <li>
                <a href="#blog">{navInfo[0]}</a>
              </li>
              <li>
                <a href="#reviews">{navInfo[1]}</a>
              </li>
              <li>
                <a href="#contactForm">{navInfo[2]}</a>
              </li>
            </ul>
          </nav>
          {window.innerWidth > 766 && (
            <div className="navIcons">
              <Languajes />
              <Theme />
              <Auth translation={translation} />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
