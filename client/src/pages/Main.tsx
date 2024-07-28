import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Prices from "../components/pages-components/main/Prices";
import { type Translations } from "../../types/types";
import "../styles/main.css";
import PlaceholderBanner from "../components/pages-components/main/PlaceholderBanner";
import { useEffect, useState } from "react";

const Main: React.FC<Translations> = ({ translation }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const handleResize = () => {
      let url = "";
      if (window.innerWidth >= 1024) {
        url = "/img/banner-xl.png";
      } else if (window.innerWidth >= 766) {
        url = "/img/banner-md.png";
      } else {
        url = "/img/banner-sm.png";
      }

      // Pre-load the image
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImageUrl(url);
        setImageLoaded(true);
      };
    };

    handleResize(); // Set initial image URL
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const descriptionTitle: string = translation("descriptionTitle", {
    returnObjects: true,
  });
  const renderData = descriptionTitle.split(".").join(".<br>");

  return (
    <>
      <Header translation={translation} />
      {!imageLoaded && <PlaceholderBanner />}
      {imageLoaded && (
        <img
          id="banner"
          src={imageUrl}
          alt="Banner with inspiring images"
          style={{
            display: imageLoaded ? "block" : "none",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      )}
      <main className="main-index">
        <div id="mainTitle">
          <h1 id="title">{translation("title")}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: renderData,
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
