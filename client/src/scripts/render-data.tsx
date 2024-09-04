import { url_api } from "@/constants/global";
import Helper from "./helper";
import toast from "react-hot-toast";
import { FormEvent } from "react";
import {
  type PublicationCardType,
  type SubscriberType,
  type Comment,
  type NoteType,
  ChampTag,
  Member,
} from "types/types";

const helper = Helper();

///////////////////////////// GET /////////////////////////////
export const getUrlTest = async () => {
  try {
    return await helper.get(`${import.meta.env.VITE_URL_API}/api/test`);
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
    return await helper.get(`${url_api}/comments/${id}`);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export const getChildsComment = async (id: string) => {
  try {
    const data = await helper.get(`${url_api}/comments/${id}`);
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export const getPublicationByID = async (id: string) => {
  try {
    const publication = await helper.get(`${url_api}/publications/${id}`);
    return publication;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export const getPublications = async (page: string) => {
  try {
    return await helper.get(`${url_api}/publications/page/${page}`);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export const getLastPublication = async () => {
  try {
    return await helper.get(`${url_api}/publications/last`);
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
    await helper.post(`${url_api}/comments/new`, {
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
    return await helper.post(`${url_api}/comments/children/${id}`, {
      body: JSON.stringify(newCommentData),
    });
  } catch (error) {
    console.error("Error al enviar el comentario:", error);
  }
};

interface HttpError extends Error {
  response?: {
    status?: number;
  };
}

export const submitSubscriptionMailchamp = async (
  event: React.FormEvent<HTMLFormElement>,
  handleChange: () => void,
  newSubscriber: SubscriberType,
  buttonName: string | undefined
) => {
  event.preventDefault();
  if (!url_api) throw new Error("URL API no inicializada");
  try {
    const tag: ChampTag =
      buttonName === "Group classes" ? "GROUP_CLASS" : "PRIVATE_CLASS";

    const tags = [tag];

    const member: Member = {
      email_address: newSubscriber.email,
      status: "pending",
      email_type: "html",
      merge_fields: {
        FNAME: newSubscriber.name,
        LNAME: newSubscriber.lastname,
      },
      tags,
      status_if_new: "pending",
      update_existing: true
    };

    
    const response = await helper.put(`${url_api}/mailchimp/updatecontact`, {
      body: JSON.stringify(member),
    });
    if (response) toast.success("Submitted successfully");
    handleChange();
  } catch (error) {
    const httpError = error as HttpError;
    if (httpError.response && httpError.response.status === 409) {
      toast.error("Member already exists");
    } else {
      toast.error("The information sent is not valid");
    }
  }
};

export const postPublication = async (
  event: FormEvent<HTMLFormElement>,
  newPublication: PublicationCardType
) => {
  event.preventDefault();
  try {
    return await helper.post(`${url_api}/publications/new`, {
      body: JSON.stringify(newPublication),
    });
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

export const subscribeNewsletter = async (email: string) => {
  try {
    await helper.post(`${url_api}/mailchamp/newsletter`, {
      body: JSON.stringify({ email }),
    });
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
    await helper.put(`${url_api}/comments/likes`, {
      body: JSON.stringify({ uid_user_firebase, _id, likes }),
    });
  } catch (error) {
    console.error("Error to submit post", error);
  }
};

export const putCommentPublication = async (
  editPublication: PublicationCardType,
  id: string
) => {
  try {
    await helper.put(`${url_api}/publications/edit/${id}`, {
      body: JSON.stringify(editPublication),
    });
  } catch (error) {
    console.error("Error to submit post", error);
  }
};

export const editComment = async (id: string, textEdit: string) => {
  try {
    return await helper.put(`${url_api}/comments/edit/${id}`, {
      body: JSON.stringify({ textEdit }),
    });
  } catch (error) {
    console.error("Error to submit post", error);
  }
};

///////////////////////////// DELETE /////////////////////////////
export const delatePublication = async (id: string) => {
  try {
    await helper.del(`${url_api}/publications/del/${id}`);
  } catch (error) {
    console.error("Error to submit post", error);
  }
};

export const deleteComment = async (id: string) => {
  try {
    await helper.del(`${url_api}/comments/del/${id}`);
  } catch (error) {
    console.error("Error to submit post", error);
  }
};
