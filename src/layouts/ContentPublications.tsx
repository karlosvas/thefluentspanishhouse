import { useParams } from "react-router-dom";
import {
  type Translations,
  type CardType,
  type RouteParams,
} from "../../types/types";
import "../styles/publication/main-publication.css";

const ContentPublication: React.FC<Translations> = ({ translation }) => {
  const cardsBlog: CardType[] = translation("cardsBlog", {
    returnObjects: true,
  });
  const { id } = useParams<RouteParams>();
  if (!id || isNaN(parseInt(id)) || parseInt(id) >= cardsBlog.length) {
    return <strong>No se encontró el elemento.</strong>;
  }
  return (
    <>
      <main className="publicationMain">
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height="30px"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="svgIcons"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
          Exit
        </a>
        <div className="publication">
          <h2>{cardsBlog[parseInt(id)].title}</h2>
          <img src={`/img/${id}.png`} alt="" />
          <strong>{cardsBlog[parseInt(id)].content}</strong>
        </div>
        <p>
          <strong>L</strong>orem ipsum dolor sit amet consectetur adipisicing
          elit. Ullam atque repudiandae, quaerat nobis quo praesentium suscipit
          fuga repellat ex blanditiis quibusdam error, nesciunt culpa illo
          distinctio quas quos voluptate soluta. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Corporis adipisci ipsa nemo pariatur,
          dolorum culpa repellendus quis officiis expedita veniam vitae, aliquam
          omnis cupiditate atque suscipit. Corporis quam voluptatibus eveniet.
          Doloremque aliquam maxime nemo asperiores, numquam tempore ducimus
          beatae similique perspiciatis ipsam illum, magnam voluptate veritatis
          minus iusto placeat nesciunt quod voluptatem sapiente laboriosam
          consequatur quasi? Aspernatur cupiditate placeat voluptatem!
        </p>
      </main>
    </>
  );
};

export default ContentPublication;
