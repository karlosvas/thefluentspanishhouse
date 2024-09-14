import dotenv from "dotenv";
dotenv.config();
/////////////////////////////////////////////////////////////
import mailchimp from "@mailchimp/mailchimp_marketing";
import axios from "axios";

// Id de la lista publica de contactos en Mailchimp
const listId = process.env.MAILCHIMP_LIST_ID as string;
// Id del grupo de intereses en Mailchimp
const groupId = process.env.MAILCHIMP_GROUP_ID as string;
// Api key de Mailchimp y prefijo del servidor
const mailchimpKey = process.env.MAILCHIMP_API_KEY as string;
const serverPrefix = mailchimpKey.split("-").pop() as string;

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
    const response = await axios.post(url, data, {
      auth: {
        username: "anystring",
        password: mailchimpKey as string,
      },
    });
    console.log("Interest added to category:", response.data);
    return response;
  } catch (error) {
    console.error("Error adding interest to category:", error);
  }
}

async function deleteInterestCategory(interestCategoryId: string) {
  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/interest-categories/${interestCategoryId}`;

  try {
    const response = await axios.delete(url, {
      auth: {
        username: "anystring",
        password: mailchimpKey as string,
      },
    });
    console.log("Interest category deleted:", response.data);
    return response;
  } catch (error) {
    console.error("Error deleting interest category:", error);
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
