import { type Translations } from "../../types/types";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ContentPublication from "../layouts/ContentPublications";
import "../styles/publication/main-publication.css";

export const Publications: React.FC<Translations> = ({ translation }) => {
  return (
    <>
      <Header translation={translation} />
      <ContentPublication translation={translation} />
      <Footer />
    </>
  );
};

export default Publications;
