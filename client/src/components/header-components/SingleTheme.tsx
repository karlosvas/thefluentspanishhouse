import { useEffect, useState } from "react";
import Theme from "../svg-component/Theme";
import "../../styles/reusables/singletheme.css";

export const SingleTheme = () => {
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

  return (
    <span className="singleTheme">
      <Theme theme={theme} setTheme={setTheme} />
    </span>
  );
};

export default SingleTheme;