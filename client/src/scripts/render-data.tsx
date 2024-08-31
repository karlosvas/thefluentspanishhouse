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

const helper = Helper();

///////////////////////////// GET /////////////////////////////
export const getUrlTest = async () => {
  try {
    return await helper.get(`${import.meta.env.VITE_URL_API}/api/test`, {
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

export const getCommentsByID = async (id: string) => {
  try {
    return await helper.get(`${url_api}/api/comments/${id}`, {
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
    const data = await helper.get(`${url_api}/api/comments/${id}`, {
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

export const getPublicationByID = async (id: string) => {
  try {
    const publication = await helper.get(`${url_api}/api/publications/${id}`, {
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

export const getPublications = async (page: string) => {
  try {
    return await helper.get(`${url_api}/api/publications/${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export const getLastPublication = async () => {
  try {
    return await helper.get(`${url_api}/api/last/publication`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Error al obtener la última publicación");
  }
};

///////////////////////////// POST /////////////////////////////
export const postComment = async (newCommentData: Comment) => {
  try {
    const originUrl = window.location.href;
    const dataToSend = {
      ...newCommentData,
      originUrl,
    };
    await helper.post(`${url_api}/api/comments/`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
  } catch (error) {
    console.error("Error al enviar el comentario:", error);
  }
};

export const postChildrenComment = async (
  newCommentData: Comment,
  id: string
) => {
  try {
    return await helper.post(`${url_api}/api/comments/children/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentData),
    });
  } catch (error) {
    console.error("Error al enviar el comentario:", error);
  }
};

export const submitSubscriptionMailchamp = async (
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
    const response = await helper.post(`${url_api}/api/mailchamp`, {
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

export const postPublication = async (
  event: FormEvent<HTMLFormElement>,
  newPublication: PublicationCardType
) => {
  event.preventDefault();
  try {
    await helper.post(`${url_api}/api/newpublication`, {
      body: JSON.stringify(newPublication),
    });
    window.location.reload();
  } catch (error) {
    console.error("Error al enviar el post:", error);
  }
};

export const submitNote = async (newNote: NoteType) => {
  try {
    const response = await helper.post(`${url_api}/api/note`, {
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
    await helper.put(`${url_api}/api/comments/likes`, {
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
    await helper.put(`${url_api}/api/publications/edit`, {
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
    await helper.del(`${url_api}/api/publications/del/${id}`, {
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
    await helper.del(`${url_api}/api/comments/del/${id}`, {
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
    return await helper.put(`${url_api}/api/comments/edit/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textEdit }),
    });
  } catch (error) {
    console.error("Error to submit post", error);
  }
};

export const setNewSubscriberEmail = async (
  newSuscriber: {
    name: string;
    lastname: string;
    email: string;
    type: string;
  },
  type: string
) => {
  try {
    newSuscriber.type = type;
    await helper.post(`${url_api}/api/subscribers/email`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newSuscriber }),
    });
  } catch (error) {
    console.error("Error to submit post", error);
  }
};
