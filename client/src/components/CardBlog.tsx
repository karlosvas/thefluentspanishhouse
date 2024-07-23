import React, { useState } from "react";
import { Link } from "react-router-dom";
import { type Translations, CardType } from "../../types/types";
import CardPlaceholder from "./PlaceHolder";

const CardBlog: React.FC<Translations> = ({ translation }) => {
  const cardsBlog: CardType[] = translation("cardsBlog", {
    returnObjects: true,
  });

  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(cardsBlog.length).fill(false)
  );

  const handleImageLoad = (index: number) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[index] = true;
      return newLoadedImages;
    });
  };

  return (
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
            {!loadedImages[index] && <CardPlaceholder />}
            <img
              src={`/img/${index}.png`}
              alt=""
              onLoad={() => handleImageLoad(index)}
              style={{ display: loadedImages[index] ? "block" : "none" }}
            />
            <h3>{publication.title}</h3>
            <p>{publication.content}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardBlog;
