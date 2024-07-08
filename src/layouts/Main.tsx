import Coments from "../components/Comments";
import CardBlog from "../components/CardBlog";
import ContactForm from "../components/ContactForm";
import { type Translations } from "../../types/types";
import "../styles/main.css";

const Main: React.FC<Translations> = ({ translation }) => {
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

        <div id="blog">
          <CardBlog translation={translation} />
        </div>

        <div id="reviews">
          <Coments />
        </div>

        <ContactForm translation={translation} />
      </main>
    </>
  );
};

export default Main;
