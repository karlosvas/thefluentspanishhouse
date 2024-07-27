import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { type Translations } from "../../types/types";
import "../styles/main-aboutme.css";

const AboutMe: React.FC<Translations> = ({ translation }) => {
  const navInfo: string[] = translation("navInfo", { returnObjects: true });
  const aboutme: string[] = translation("aboutme", { returnObjects: true });
  return (
    <>
      <Header translation={translation} />
      <main className="aboutme">
        <h2 id="haboutme">{navInfo[2]}</h2>
        <div className="divAboutMe">
          <img src="/img/profe.png" alt="" />
          <div className="aboutMe">
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutMe;
