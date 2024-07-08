import { Link } from "react-router-dom";
import { type Translations, CardType } from "../../types/types";
import "../styles/blog.css";

const CardBlog: React.FC<Translations> = ({ translation }) => {
  const cardsBlog: CardType[] = translation("cardsBlog", {
    returnObjects: true,
  });

  return (
    <>
      {cardsBlog.map((publication, index) => (
        <div className="cardBlog" key={index}>
          <Link
            to={`/publication/${index}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "normal",
            }}
          >
            <img src={`/img/${index}.png`} alt="" />
            <h3>{publication.title}</h3>
            <p>{publication.content}</p>
          </Link>
        </div>
      ))}
    </>
  );
};

export default CardBlog;
