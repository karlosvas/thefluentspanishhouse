import Prices from "../components/pages-components/main/Prices";
import PlaceholderBanner from "../components/pages-components/main/PlaceholderBanner";
import { useEffect, useState, useCallback } from "react";
import "../styles/main.css";

const Main = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  // Función para obtener la URL de la imagen según el tamaño de la ventana
  const getImageUrl = useCallback(() => {
    if (window.innerWidth >= 1024) return "/img/banner-xl.png";
    if (window.innerWidth >= 766) return "/img/banner-md.png";
    return "/img/banner-sm.png";
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const url = getImageUrl();
      // Pre-cargar la imagen
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImageUrl(url);
        setImageLoaded(true);
      };
    };

    handleResize(); // Establece la URL inicial de la imagen
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getImageUrl]);

  return (
    <>
      {!imageLoaded && <PlaceholderBanner />}
      <img
        id="banner"
        src={imageUrl}
        alt="Banner with inspiring images"
        onError={() => setImageLoaded(false)}
        style={{
          display: imageLoaded ? "block" : "none",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
      <main className="main-index">
        <div id="mainTitle">
          <h1 id="title">The Fluent Spanish House</h1>
          <p>
            <strong>
              Discover Spanish with fluency and precision alongside Marta
              Gutiérrez Fonseca.
            </strong>
            <br />
            Our goal is to help you consolidate essential grammatical
            structures, ensuring you speak with confidence and impeccable
            pronunciation.
            <br /> From beginner to advanced levels, each class is designed to
            help you master the language dynamically and effectively.
          </p>
        </div>
        <Prices />
      </main>
    </>
  );
};

export default Main;
