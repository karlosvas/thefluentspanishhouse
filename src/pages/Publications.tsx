import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ContentPublication from "../layouts/ContentPublications";
import "../styles/publication/main-publication.css";
import { useParams } from "react-router-dom";
import {
  type Translations,
  type CardType,
  type RouteParams,
} from "../../types/types";

export const Publications: React.FC<Translations> = ({ translation }) => {
  const cardsBlog: CardType[] = translation("cardsBlog", {
    returnObjects: true,
  });
  const { id } = useParams<RouteParams>();
  const publication = cardsBlog.find((card) => card.id === id);
  const index = publication ? cardsBlog.indexOf(publication) : -1;

  return (
    <>
      <Header translation={translation} />
      <ContentPublication publication={publication} index={index} />
      <Footer />
    </>
  );
};

export default Publications;
