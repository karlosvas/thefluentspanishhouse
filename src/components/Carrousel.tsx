import { Link } from "react-router-dom";
import { type Translations, CardType } from "../../types/types";
import "../styles/main/carrousel.css";

const Carrousel: React.FC<Translations> = ({ translation }) => {
  const cardsBlog: CardType[] = translation("cardsBlog", {
    returnObjects: true,
  });

  return (
    <>
      <div id="blogCarrusel">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <Link to={`/publication/${0}`}>
                <img className="d-block w-100" src="img/0.png" />
                <h3>{cardsBlog[0].title}</h3>
                <p>{cardsBlog[0].content}</p>
              </Link>
            </div>
            {cardsBlog
              .filter((_, index) => index !== 0)
              .map((publication, index) => (
                <>
                  <div className="carousel-item" key={index}>
                    <Link to={`publication/${(index + 1) % cardsBlog.length}`}>
                      <img
                        src={`img/${(index + 1) % cardsBlog.length}.png`}
                        alt={publication.title}
                      />
                      <h3>{publication.title}</h3>
                      <p>{publication.content}</p>
                    </Link>
                  </div>
                </>
              ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Carrousel;
