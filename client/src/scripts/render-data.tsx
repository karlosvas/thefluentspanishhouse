import { url_api } from "@/constants/global";
import Helper from "./helper";
import toast from "react-hot-toast";
import { FormEvent } from "react";
import {
  type PublicationCardType,
  type SubscriberType,
  type Comment,
  type NoteType,
} from "types/types";

const app = Helper();

///////////////////////////// GET /////////////////////////////
export const getUrlTest = async () => {
  try {
    return await app.get(`${import.meta.env.VITE_URL_API}/api/test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(
      "Error al hacer fetch para obtener la URL de los test desde el cliente",
      error
    );
    throw error;
  }
};

export const getCommentsById = async (id: string) => {
  try {
    return await app.get(`${url_api}/api/comments/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export const getChildsComment = async (id: string) => {
  try {
    const data = await app.get(`${url_api}/api/comments/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export const loadPublication = async (id: string) => {
  try {
    const publication = await app.get(`${url_api}/api/publications/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return publication;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export const loadPublications = async () => {
  try {
    return await app.get(`${url_api}/api/publications`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

///////////////////////////// POST /////////////////////////////
export const postComment = async (newCommentData: Comment) => {
  try {
    await app.post(`${url_api}/api/comments/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentData),
    });
  } catch (error) {
    console.error("Error al enviar el comentario:", error);
  }
};

export const updateChildrenComment = async (
  newCommentData: Comment,
  id: string
) => {
  try {
    return await app.post(`${url_api}/api/comments/children/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentData),
    });
  } catch (error) {
    console.error("Error al enviar el comentario:", error);
  }
};

export const handleSubmitSubscription = async (
  event: React.FormEvent<HTMLFormElement>,
  handleChange: () => void,
  newSubscriber: SubscriberType,
  buttonName: string | undefined
) => {
  event.preventDefault();
  if (!url_api) throw new Error("URL API no inicializada");
  try {
    const mailChampSubscribe = {
      ...newSubscriber,
      interests: buttonName,
    };
    const response = await app.post(`${url_api}/api/mailchamp`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailChampSubscribe),
    });
    if (response) toast.success("Submitted successfully");
    handleChange();
  } catch (error) {
    console.error("Error al enviar el post:", error);
    throw Error;
  }
};

export const handleSubmitPost = async (
  event: FormEvent<HTMLFormElement>,
  newPublication: PublicationCardType
) => {
  event.preventDefault();
  try {
    const response = await app.post(`${url_api}/api/newpublication`, {
      body: JSON.stringify(newPublication),
    });
    if (response && window.location.pathname === "/blog")
      window.location.reload();
    else {
      toast.error("Error al enviar el post");
      throw Error;
    }
  } catch (error) {
    console.error("Error al enviar el post:", error);
  }
};

export const submitNote = async (newNote: NoteType) => {
  try {
    const response = await app.post(`${url_api}/api/note`, {
      body: JSON.stringify(newNote),
    });
    if (response) toast.success("The email has been sent successfully");
  } catch (error) {
    console.error("Error to submit post", error);
  }
};

///////////////////////////// PUT /////////////////////////////
export const updateLikes = async (
  uid_user_firebase: string,
  _id: string,
  likes: number
) => {
  try {
    await app.put(`${url_api}/api/comments/likes`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid_user_firebase, _id, likes }),
    });
  } catch (error) {
    console.error("Error to submit post", error);
  }
};

export const putCommentPublication = async (
  editPublication: PublicationCardType
) => {
  try {
    await app.put(`${url_api}/api/publications/edit`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPublication),
    });
  } catch (error) {
    console.error("Error to submit post", error);
  }
};

///////////////////////////// DELETE /////////////////////////////
export const delatePublication = async (id: string) => {
  try {
    await app.del(`${url_api}/api/publications/del/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error to submit post", error);
  }
};

export const deleteComment = async (id: string) => {
  try {
    await app.del(`${url_api}/api/comments/del/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error to submit post", error);
  }
};

export const editComment = async (id: string, textEdit: string) => {
  try {
    return await app.put(`${url_api}/api/comments/edit/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textEdit }),
    });
  } catch (error) {
    console.error("Error to submit post", error);
  }
};
