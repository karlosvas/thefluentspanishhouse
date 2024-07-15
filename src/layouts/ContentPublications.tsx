import Comments from "../components/publications/UserComent";
import { type ContentPublicationType } from "../../types/types";
import "../styles/publication/main-publication.css";

const ContentPublication: React.FC<ContentPublicationType> = ({
  publication,
  index,
}) => {
  return (
    <>
      <main className="publicationMain">
        <div className="publication">
          <h2>{publication?.title}</h2>
          <img src={`/img/${index}.png`} alt="" />
          <strong>{publication?.content}</strong>
          <p>
            <strong>L</strong>orem ipsum dolor sit amet consectetur adipisicing
            elit. Ullam atque repudiandae, quaerat nobis quo praesentium
            suscipit fuga repellat ex blanditiis quibusdam error, nesciunt culpa
            illo distinctio quas quos voluptate soluta. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Corporis adipisci ipsa nemo
            pariatur, dolorum culpa repellendus quis officiis expedita veniam
            vitae, aliquam omnis cupiditate atque suscipit. Corporis quam
            voluptatibus eveniet. Doloremque aliquam maxime nemo asperiores,
            numquam tempore ducimus beatae similique perspiciatis ipsam illum,
            magnam voluptate veritatis minus iusto placeat nesciunt quod
            voluptatem sapiente laboriosam consequatur quasi? Aspernatur
            cupiditate placeat voluptatem!
          </p>
        </div>
        <Comments />
      </main>
    </>
  );
};

export default ContentPublication;
