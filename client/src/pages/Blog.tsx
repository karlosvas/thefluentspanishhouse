import Header from "../layouts/Header";
import CardBlog from "../components/pages-components/blog/CardBlog";
import Footer from "../layouts/Footer";
import { type Translations } from "../../types/types";
import "../styles/main-blog.css";

const Blog: React.FC<Translations> = ({ translation }) => {
  return (
    <>
      <Header translation={translation} />
      <main className="mainBlog">
        <CardBlog translation={translation} />
      </main>
      <Footer />
    </>
  );
};

export default Blog;
