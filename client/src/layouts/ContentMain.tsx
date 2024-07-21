import Coments from "../components/Reviews";
import CardBlog from "../components/CardBlog";
import ContactForm from "../components/ContactForm";
import Prices from "../components/Prices";
import AboutMe from "../components/AboutMe";
import Carrousel from "../components/Carrousel";
import { type Translations } from "../../types/types";
import "../styles/main/main.css";

const ContentMain: React.FC<Translations> = ({ translation }) => {
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
      <main className="main-index">
        <div id="mainTitle">
          <h1 id="title">{translation("title")}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: translation("descriptionTitle").split(".").join(".<br>"),
            }}
          />
        </div>

        {window.innerWidth >= 764 ? (
          <CardBlog translation={translation} />
        ) : (
          <Carrousel translation={translation} />
        )}

        <h2 id="hreviews">{navInfo[1]}</h2>
        <Coments />

        <h2 id="haboutme">{navInfo[2]}</h2>
        <AboutMe />

        <h2 id="hprices">{navInfo[3]}</h2>
        <Prices translation={translation} />
        <ContactForm translation={translation} />
      </main>
    </>
  );
};

export default ContentMain;
