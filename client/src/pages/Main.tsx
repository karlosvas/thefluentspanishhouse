import Prices from "@/components/pages-components/main/Prices";
import PlaceholderImg from "@/components/reusable/PlaceholderImg";
import { useState } from "react";
import "@/styles/main.css";
import { Helmet } from "react-helmet-async";

const Main = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title>The Fluent Spanish House</title>
        <meta
          name="description"
          content="Private teacher, The Fluent Spanish House. Discover Spanish with fluency and precision alongside Marta Gutiérrez Fonseca. Our goal is to help you consolidate essential grammatical structures, ensuring you speak with confidence and impeccable pronunciation. From beginner to advanced levels, each class is designed to help you master the language dynamically and effectively"
        ></meta>
      </Helmet>
      {!imageLoaded && <PlaceholderImg id="banner" />}
      <img
        id="banner"
        src="/img/banner.webp"
        alt="Banner with inspiring images, sevillana dance"
        onError={() => setImageLoaded(false)}
        onLoad={() => setImageLoaded(true)}
        style={{
          display: imageLoaded ? "block" : "none",
        }}
      />
      <main className="main-index">
        <div className="main-title">
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
