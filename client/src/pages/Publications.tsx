import { useParams } from "react-router-dom";
import UserComments from "../components/render-data/CommentPublication";
import { useEffect, useState } from "react";
import { url_api } from "../constants/global";
import PlaceholderPublications from "../components/render-data/PlaceholderPublication";
import { type PublicationCardType, type RouteParams } from "../../types/types";
import "../styles/main-publication.css";

const Publications = () => {
  const [publication, setPublication] = useState<PublicationCardType>();
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const { id } = useParams<RouteParams>();

  const loadPublications = async () => {
    try {
      const response = await fetch(`${url_api}/api/publications/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok)
        throw new Error("Hubo un problema al obtener los datos.");

      const publication = await response.json();
      setPublication(publication);
      setImageLoading(true);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    loadPublications();
  }, []);

  return (
    <>
      <main className="publicationMain">
        <div className="publication">
          <h2>{publication?.title}</h2>
          {!imageLoading && <PlaceholderPublications />}
          {/* Mostrar el placeholder mientras se carga */}
          {publication?.base64_img ? (
            <img
              src={publication?.base64_img}
              alt="Imagen de la publicación"
              style={{ display: imageLoading ? "block" : "none" }}
            />
          ) : (
            <img
              src={`/img/${Math.random() % 5}.png`}
              alt="Imagen de la publicación"
              style={{ display: imageLoading ? "block" : "none" }}
            />
          )}
          <strong>{publication?.subtitle}</strong>
          <p>{publication?.content}</p>
        </div>
        <UserComments />
      </main>
    </>
  );
};

export default Publications;
