import dotenv from 'dotenv';
dotenv.config();
/////////////////////////////////////////////////////////////
import mailchimp from '@mailchimp/mailchimp_marketing';
import axios from 'axios';

// Id de la lista publica de contactos en Mailchimp
const listId = process.env.MAILCHIMP_LIST_ID as string;
// Id del grupo de intereses en Mailchimp
const groupId = process.env.MAILCHIMP_GROUP_ID as string;
// Api key de Mailchimp y prefijo del servidor
const mailchimpKey = process.env.MAILCHIMP_API_KEY as string;
const serverPrefix = mailchimpKey.split('-').pop() as string;

// Configuracion del cliente de la API de Mailchimp marketing
mailchimp.setConfig({
  apiKey: mailchimpKey,
  server: serverPrefix,
});

// Convierte los errores de Mailchimp a objeto de javascript
function mailchimpErrors(error: any) {
  return JSON.parse(error.response.text);
}

async function addInterestToCategory(
  interestCategoryId: string,
  interestName: string
) {
  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/interest-categories/${interestCategoryId}/interests`;
  const data = {
    name: interestName,
  };

  try {
    // El user puede ser cualquier string, no importa
    const response = await axios.post(url, data, {
      auth: {
        username: 'admin',
        password: mailchimpKey as string,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw { status: error.response.status, message: error.response.data };
    } else {
      throw { status: 500, message: 'Unexpected error occurred' };
    }
  }
}

async function deleteInterestCategory(interestCategoryId: string) {
  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/interest-categories/${groupId}/interests/${interestCategoryId}`;

  try {
    // El user puede ser cualquier string, no importa
    const response = await axios.delete(url, {
      auth: {
        username: 'admin',
        password: mailchimpKey as string,
      },
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      throw { status: error.response.status, message: error.response.data };
    } else {
      throw { status: 500, message: 'Unexpected error occurred' };
    }
  }
}

export {
  listId,
  mailchimpErrors,
  mailchimp,
  addInterestToCategory,
  deleteInterestCategory,
  groupId,
};
