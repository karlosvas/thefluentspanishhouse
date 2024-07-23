import Header from "../layouts/Header";
import { Toaster } from "react-hot-toast";
import CardBlog from "../components/CardBlog";
import { type Translations } from "../../types/types";
import Footer from "../layouts/Footer";
import "../styles/blog/main-blog.css";

const Blog: React.FC<Translations> = ({ translation }) => {
  return (
    <>
      <Header translation={translation} />
      <main className="mainBlog">
        <CardBlog translation={translation} />
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default Blog;
