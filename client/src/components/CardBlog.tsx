import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { type Translations, CardType } from "../../types/types";
import "../styles/main/blog.css";
import CardPlaceholder from "./PlaceHolder";

const CardBlog: React.FC<Translations> = ({ translation }) => {
  const cardsBlog: CardType[] = translation("cardsBlog", {
    returnObjects: true,
  });

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div id="blog">
        {cardsBlog.map((publication, index) => (
          <div className="cardBlog" key={publication.id}>
            <Link
              to={`/publication/${publication.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "normal",
              }}
            >
              {!imagesLoaded && <CardPlaceholder />}{" "}
              {/* Mostrar el placeholder mientras se carga */}
              <img
                src={`/img/${index}.png`}
                alt=""
                style={{ display: imagesLoaded ? "block" : "none" }} // Mostrar la imagen solo cuando esté cargada
              />
              <h3>{publication.title}</h3>
              <p>{publication.content}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardBlog;
