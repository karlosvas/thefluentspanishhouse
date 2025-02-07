import { url_api } from '@/constants/global';
import Helper from './helper';
import toast from 'react-hot-toast';
import { FormEvent } from 'react';
import { errorMailchimp } from '@/utils/utilities';
import { isErrorResponseHelper } from '@/utils/utilities-types';
import {
  type PublicationCardType,
  type Comment,
  type NoteType,
  type Member,
  type InterestCategoryResponse,
  type InterestResponse,
  type SubscriberType,
} from 'types/types';

const helper = Helper();

///////////////////////////// GET /////////////////////////////
export const getUrlTest = async () => {
  try {
    return await helper.get(`${url_api}/api/test`);
  } catch (error) {
    console.error(
      'Error al hacer fetch para obtener la URL de los test desde el cliente',
      error
    );
    throw error;
  }
};

export const getCommentsByID = async (id: string) => {
  try {
    return await helper.get(`${url_api}/comments/${id}`);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

export const getChildsComment = async (id: string) => {
  try {
    const data = await helper.get(`${url_api}/comments/${id}`);
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

export const getPublicationByID = async (id: string) => {
  try {
    const publication = await helper.get(`${url_api}/publications/${id}`);
    return publication;
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};

export const getPublications = async (page: string) => {
  try {
    return await helper.get(`${url_api}/publications/page/${page}`);
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};

export const getLastPublication = async () => {
  try {
    return await helper.get(`${url_api}/publications/last`);
  } catch (error) {
    throw new Error('Error al obtener la última publicación');
  }
};

export const getMailchimpUser = async (email: string) => {
  try {
    return await helper.get(`${url_api}/mailchimp/getone/member/${email}`);
  } catch (error) {
    isErrorResponseHelper(error) && errorMailchimp(error);
  }
};

export const fetchGetUidByEmail = async (
  email: string
): Promise<{ uid: string } | null> => {
  try {
    const uuid = await helper.get(`${url_api}/firebase/user/${email}`);
    return uuid as { uid: string };
  } catch (error) {
    // El usuario no existe en la base de datos algo normal ya que puede no haberse inscrito a una clase y querer entrar en la new
    return null;
  }
};

///////////////////////////// POST /////////////////////////////
export const postComment = async (newCommentData: Comment) => {
  try {
    const originUrl = window.location.href;
    return await helper.post(`${url_api}/comments/new`, {
      body: JSON.stringify({ newCommentData, originUrl }),
    });
  } catch (error) {
    console.error('Error al enviar el comentario:', error);
  }
};

export const postChildrenComment = async (
  newCommentData: Comment,
  id: string
) => {
  try {
    const originUrl = window.location.href;
    return await helper.post(`${url_api}/comments/children/${id}`, {
      body: JSON.stringify({ newCommentData, originUrl }),
    });
  } catch (error) {
    console.error('Error al enviar el comentario:', error);
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
    console.error('Error al enviar el post:', error);
  }
};

export const subscribeNewsletter = async (email: string) => {
  try {
    await helper.post(`${url_api}/mailchamp/newsletter`, {
      body: JSON.stringify({ email }),
    });
  } catch (error) {
    console.error('Error to submit post', error);
  }
};

///////////////////////////// EMAILS /////////////////////////////
export const sendEmailNewClass = async (newSubscriber: SubscriberType) => {
  try {
    helper.post(`${url_api}/resend/newstudent`, {
      body: JSON.stringify(newSubscriber),
    });
  } catch (error) {
    isErrorResponseHelper(error) && errorMailchimp(error);
  }
};

export const submitNote = async (newNote: NoteType) => {
  try {
    const response = await helper.post(`${url_api}/resend/note`, {
      body: JSON.stringify(newNote),
    });
    if (response) toast.success('The email has been sent successfully');
  } catch (error) {
    console.error('Error to submit post', error);
  }
};

///////////////////////////// PUT /////////////////////////////
export const updateLikes = async (
  uid_user_firebase: string,
  _id: string,
  likes: number,
  originUrl: string,
  like_from: string
) => {
  try {
    await helper.put(`${url_api}/comments/likes`, {
      body: JSON.stringify({
        uid_user_firebase,
        _id,
        likes,
        originUrl,
        like_from,
      }),
    });
  } catch (error) {
    console.error('Error to submit post', error);
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
    console.error('Error to submit post', error);
  }
};

export const editComment = async (id: string, textEdit: string) => {
  try {
    return await helper.put(`${url_api}/comments/edit/${id}`, {
      body: JSON.stringify({ textEdit }),
    });
  } catch (error) {
    console.error('Error to submit post', error);
  }
};

export const submitSubscriptionMailchimp = async (member: Member) => {
  helper
    .post(`${url_api}/mailchimp/add/member`, {
      body: JSON.stringify(member),
    })
    .then(() => {
      toast.success('You have been successfully subscribed to the newsletter');
    })
    .catch((error) =>
      isErrorResponseHelper(error)
        ? errorMailchimp(error)
        : toast.error('An expeted error ocurred')
    );
};

export const updateTagsMailchimp = async (
  mailchimpUser: Member,
  tag: string,
  handleChange: () => void
) => {
  const email = mailchimpUser.email_address;

  helper
    .put(`${url_api}/mailchimp/updatecontact/tag/${email}`, {
      body: JSON.stringify({ tag }),
    })
    .then(() => handleChange())
    .catch((error) =>
      isErrorResponseHelper(error)
        ? errorMailchimp(error)
        : toast.error('An expeted error ocurred')
    );
};

///////////////////////////// DELETE /////////////////////////////
export const delatePublication = async (id: string) => {
  await helper
    .del(`${url_api}/publications/del/${id}`)
    .catch((error) => console.error('Error to delete publication', error));
};

export const deleteComment = async (id: string) => {
  await helper
    .del(`${url_api}/comments/del/${id}`)
    .catch((error) => console.error('Error to delete publication', error));
};

export const deleteUserChamp = async (email: string) => {
  await helper
    .del(`${url_api}/user/del/${email}`)
    .catch((error) => console.error('Error to delete user', error));
};

export const delateTagCahmp = async (email: string, tag: string) => {
  await helper
    .del(`${url_api}/tag/del/${email}`, {
      body: JSON.stringify({ tag }),
    })
    .catch((error) => console.error('Error to delete tag', error));
};

export const getFirstInterestCategory =
  async (): Promise<InterestCategoryResponse> => {
    try {
      const data = await helper.get(`${url_api}/mailchimp/category`);
      return data as InterestCategoryResponse;
    } catch (error) {
      console.error('Error to get interest category', error);
      throw error;
    }
  };

export const getInterests = async (): Promise<InterestResponse> => {
  try {
    const data = await helper.get(`${url_api}/mailchimp/get/interests`);
    return data as InterestResponse;
  } catch (error) {
    console.error('Error to get interest category', error);
    throw error;
  }
};
