import { useParams } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import UserComments from "../components/render-data/CommentPublication";
import {
  type Translations,
  type PublicationCardType,
  type RouteParams,
} from "../../types/types";
import "../styles/main-publication.css";

export const Publications: React.FC<Translations> = ({ translation }) => {
  const cardsBlog: PublicationCardType[] = translation("cardsBlog", {
    returnObjects: true,
  });
  const { id } = useParams<RouteParams>();
  const publication = cardsBlog.find((card) => card.id === id);

  return (
    <>
      <Header translation={translation} />
      <main className="publicationMain">
        <div className="publication">
          <h2>{publication?.title}</h2>
          <img src={publication?.base64_img} alt="" />
          <strong>{publication?.subtitle}</strong>
          <p>{publication?.content}</p>
        </div>
        <UserComments />
      </main>
      <Footer />
    </>
  );
};

export default Publications;
