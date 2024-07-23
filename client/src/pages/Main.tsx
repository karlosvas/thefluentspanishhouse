import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Prices from "../components/Prices";
import { type Translations } from "../../types/types";
import "../styles/main/main.css";
import Inscriptions from "../components/Insription";

const Main: React.FC<Translations> = ({ translation }) => {
  return (
    <>
      <Header translation={translation} />
      {window.innerWidth >= 1024 ? (
        <img
          id="banner"
          src="/img/banner-xl.png"
          alt="Banner with inspiring images"
        />
      ) : window.innerWidth >= 766 ? (
        <img
          id="banner"
          src="/img/banner-md.png"
          alt="Banner with inspiring images"
        />
      ) : (
        <img
          id="banner"
          src="/img/banner-sm.png"
          alt="Banner with inspiring images"
        />
      )}
      <main className="main-index">
        <div id="mainTitle">
          <h1 id="title">{translation("title")}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html:
                `<strong>Descubre el español con fluidez y precisión junto a Marta Gutiérrez Fonseca.</strong> Nuestro objetivo es ayudarte a consolidar estructuras gramaticales esenciales, garantizando que hables con confianza y una pronunciación impecable. Desde niveles principiantes hasta avanzados, cada clase está diseñada para hacerte dominar el idioma de manera dinámica y efectiva.`
                  .split(".")
                  .join(".<br>"),
            }}
          />
        </div>
        <Prices translation={translation} />
        <Inscriptions />
      </main>
      <Footer />
    </>
  );
};

export default Main;
