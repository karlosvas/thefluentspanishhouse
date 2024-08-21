import { useParams } from "react-router-dom";
import UserComments from "../components/pages-components/publications/CommentPublication";
import { useEffect, useState } from "react";
import PlaceholderPublications from "../components/pages-components/publications/PlaceholderPublication";
import { loadPublication } from "../scripts/render-data";
import { type PublicationCardType, type RouteParams } from "../../types/types";
import "../styles/main-publication.css";

const Publications = () => {
  const [publication, setPublication] = useState<PublicationCardType>();
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    loadPublication(setPublication, setImageLoading, id);
  }, []);

  return (
    <main className="publicationMain">
      {!imageLoading && <PlaceholderPublications />}
      <div className="publication">
        <h2>{publication?.title}</h2>
        <img
          src={publication?.base64_img}
          alt="Imagen de la publicación"
          style={{ display: imageLoading ? "block" : "none" }}
        />
        <strong>{publication?.subtitle}</strong>
        <p>{publication?.content}</p>
      </div>
      <UserComments />
    </main>
  );
};

export default Publications;
