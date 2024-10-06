import dotenv from "dotenv";
dotenv.config();
/////////////////////////////////////////////////////////////
import mailchimp from "@mailchimp/mailchimp_marketing";
import axios from "axios";
// Id de la lista publica de contactos en Mailchimp
const listId = process.env.MAILCHIMP_LIST_ID;
// Id del grupo de intereses en Mailchimp
const groupId = process.env.MAILCHIMP_GROUP_ID;
// Api key de Mailchimp y prefijo del servidor
const mailchimpKey = process.env.MAILCHIMP_API_KEY;
const serverPrefix = mailchimpKey.split("-").pop();
// Configuracion del cliente de la API de Mailchimp marketing
mailchimp.setConfig({
    apiKey: mailchimpKey,
    server: serverPrefix,
});
// Convierte los errores de Mailchimp a objeto de javascript
function mailchimpErrors(error) {
    return JSON.parse(error.response.text);
}
async function addInterestToCategory(interestCategoryId, interestName) {
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/interest-categories/${interestCategoryId}/interests`;
    const data = {
        name: interestName,
    };
    try {
        // El user puede ser cualquier string, no importa
        const response = await axios.post(url, data, {
            auth: {
                username: "admin",
                password: mailchimpKey,
            },
        });
        return response;
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw { status: error.response.status, message: error.response.data };
        }
        else {
            throw { status: 500, message: "Unexpected error occurred" };
        }
    }
}
async function deleteInterestCategory(interestCategoryId) {
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/interest-categories/${groupId}/interests/${interestCategoryId}`;
    // const url = https://${dc}.api.mailchimp.com/3.0/lists/{list_id}/interest-categories/{interest_category_id}/interests/{interest_id}
    try {
        // El user puede ser cualquier string, no importa
        const response = await axios.delete(url, {
            auth: {
                username: "admin",
                password: mailchimpKey,
            },
        });
        console.log(response);
        return response;
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log(error);
            throw { status: error.response.status, message: error.response.data };
        }
        else {
            throw { status: 500, message: "Unexpected error occurred" };
        }
    }
}
export { listId, mailchimpErrors, mailchimp, addInterestToCategory, deleteInterestCategory, groupId };
