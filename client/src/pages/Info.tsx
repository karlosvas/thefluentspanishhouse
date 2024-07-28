import { useEffect, useState } from "react";
import { Translations } from "../../types/types";
import Footer from "../layouts/Footer";
import "../styles/info.css";
import Theme from "../components/svg-component/Theme";

const Info: React.FC<Translations> = ({ translation }) => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const terms = translation("terms", { returnObjects: true });
  const privacy = translation("privacy", { returnObjects: true });

  return (
    <>
      <main className="main-terminos">
        <span>
          <Theme theme={theme} setTheme={setTheme} />
        </span>
        <section>
          <h2 id="terminos">{terms.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: terms.content }} />
        </section>
        <section>
          <h2 id="privacy">{privacy.title}</h2>
          <p>
            <strong>{privacy.effectiveDate}</strong>
            {privacy.content}
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Info;
