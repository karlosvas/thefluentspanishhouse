import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Prices from "../components/pages-components/main/Prices";
import { type Translations } from "../../types/types";
import "../styles/main.css";

const Main: React.FC<Translations> = ({ translation }) => {
  const descriptionTitle: string = translation("descriptionTitle", {
    returnObjects: true,
  });
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
              __html: descriptionTitle.split(".").join(".<br>"),
            }}
          />
        </div>
        <Prices translation={translation} />
      </main>
      <Footer />
    </>
  );
};

export default Main;
