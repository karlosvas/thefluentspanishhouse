import Coments from "../components/Comments";
import CardBlog from "../components/CardBlog";
import ContactForm from "../components/ContactForm";
import Prices from "../components/Pracing";
import AboutMe from "../components/AboutMe";
import { type Translations } from "../../types/types";
import "../styles/main/main.css";

const Main: React.FC<Translations> = ({ translation }) => {
  const navInfo: string[] = translation("navInfo", { returnObjects: true });

  return (
    <>
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
      <main>
        <div id="mainTitle">
          <h1 id="title">{translation("title")}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: translation("descriptionTitle").split(".").join(".<br>"),
            }}
          />
        </div>

        <CardBlog translation={translation} />

        <h2 id="hreviews">{navInfo[1]}</h2>
        <Coments />

        <h2 id="haboutme">{navInfo[2]}</h2>
        <AboutMe />

        <h2 id="hprices">{navInfo[3]}</h2>
        <Prices />
        <ContactForm translation={translation} />
      </main>
    </>
  );
};

export default Main;
