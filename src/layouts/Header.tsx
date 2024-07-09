import React from "react";
import Hamburger from "../components/Hamburger";
import Auth from "../components/Auth";
import Languajes from "../components/Languajes";
import Theme from "../components/Theme";
import { type Translations } from "../../types/types";
import "../styles/header.css";
import { Route, Routes } from "react-router-dom";

type NavType = {
  navInfo: string[];
};

const IndexNav: React.FC<NavType> = ({ navInfo }) => {
  return (
    <nav>
      <ul>
        <li>
          <a href="#blog">{navInfo[0]}</a>
        </li>
        <li>
          <a href="#reviews">{navInfo[1]}</a>
        </li>
        <li>
          <a href="#haboutme">{navInfo[2]}</a>
        </li>
        <li>
          <a href="#hprices">{navInfo[3]}</a>
        </li>
        <li>
          <a href="#contactForm">{navInfo[4]}</a>
        </li>
      </ul>
    </nav>
  );
};

const PublicationNav: React.FC<NavType> = ({ navInfo }) => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/#bloooog">{navInfo[0]}</a>
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
          <Routes>
            <Route path="/" element={<IndexNav navInfo={navInfo} />} />
            <Route
              path="/publication/:id"
              element={<PublicationNav navInfo={navInfo} />}
            />
          </Routes>
          {window.innerWidth > 766 && (
            <div className="navIcons">
              <Theme />
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
