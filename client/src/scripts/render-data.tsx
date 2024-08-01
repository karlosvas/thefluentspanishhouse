import { url_api } from "../constants/global";
import {
  type PublicationCardType,
  type SubscriberType,
  type Comment,
} from "../../types/types";
import Helper from "./helper";
import toast from "react-hot-toast";

const app = Helper();

export const handleSubmitPost = async (
  event: React.FormEvent<HTMLFormElement>,
  newPublication: PublicationCardType
) => {
  event.preventDefault();
  try {
    const response = await app.post(`${url_api}/api/newpublication`, {
      body: JSON.stringify(newPublication),
    });
    if (response.ok) window.location.reload();
    else console.error("Error al enviar el post");
  } catch (error) {
    console.error("Error al enviar el post:", error);
  }
};

export const loadPublications = async () => {
  try {
    const response = await app.get(`${url_api}/api/publications`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Hubo un problema al obtener los datos.");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export const handleSubmitSubscription = async (
  event: React.FormEvent<HTMLFormElement>,
  handleChange: () => void,
  newSubscriber: SubscriberType,
  buttonName: string | undefined
) => {
  event.preventDefault();

  try {
    const response = await app.post(`${url_api}/api/mailchamp`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newSubscriber.name,
        lastname: newSubscriber.lastname,
        email: newSubscriber.email,
        interests: buttonName,
      }),
    });

    response.ok
      ? toast.success("Submitted successfully")
      : toast.error("Error when sending the data");

    response.ok ? handleChange() : "";
  } catch (error) {
    console.error("Error al enviar el post:", error);
  }
};

export const getComments = async (id: string | undefined) => {
  try {
    const response = await app.get(`${url_api}/api/comments/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Hubo un problema al obtener los datos.");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export const postComment = async (newCommentData: Comment) => {
  try {
    const response = await app.post(`${url_api}/api/comments/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentData),
    });
    if (!response.ok)
      throw new Error("Hubo un problema al crear el comentario.");
  } catch (error) {
    console.error("Error al enviar el comentario:", error);
  }
};

export const getUrlTest = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/api/test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const text = await response.text();
    console.log("Succes", text);
    return text;
  } catch (error) {
    console.error(
      "Error al hacer fetch para obtener la URL de los test desde el cliente",
      error
    );
    throw error;
  }
};
