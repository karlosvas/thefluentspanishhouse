import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { type Translations } from "../../types/types";
import "../styles/main-aboutme.css";
import { useState } from "react";
import PlaceholderAboutme from "../components/pages-components/aboutme/PlaceholderAboutme";

const AboutMe: React.FC<Translations> = ({ translation }) => {
  const navInfo: string[] = translation("navInfo", { returnObjects: true });
  const aboutme: string[] = translation("aboutme", { returnObjects: true });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Header translation={translation} />
      <main className="main-aboutme">
        <div className="div-aboutme">
          <h2 id="haboutme">{navInfo[2]}</h2>
          {!imageLoaded && <PlaceholderAboutme />}
          <img
            src="/img/profe.png"
            alt="Descripción de la imagen"
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: aboutme[0].split(".").join(".<br>"),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: aboutme[1].split(".").join(".<br>"),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutMe;
