import CardsPublicationBlog from "../components/pages-components/blog/CardsPublicationBlog";
import { type PublicationsProp } from "../../types/types";
import "../styles/main-blog.css";

const Blog: React.FC<PublicationsProp> = ({ publications }) => {
  return (
    <>
      <main className="mainBlog">
        <CardsPublicationBlog publications={publications} />
      </main>
    </>
  );
};

export default Blog;
