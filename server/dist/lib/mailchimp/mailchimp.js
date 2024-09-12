import dotenv from "dotenv";
dotenv.config();
import mailchimp from "@mailchimp/mailchimp_marketing";
// Configuracion del cliente de la API de Mailchimp marketing
mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
});
// Id de la lista publica
const listId = process.env.MAILCHIMP_LIST_ID;
const groupId = process.env.MAILCHIMP_GROUP_ID;
// Convierte los errores de Mailchimp a objeto de javascript
function mailchimpErrors(error) {
    return JSON.parse(error.response.text);
}
import axios from "axios";
async function addInterestToCategory(interestCategoryId, interestName) {
    const url = `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${listId}/interest-categories/${interestCategoryId}/interests`;
    const data = {
        name: interestName,
    };
    try {
        const response = await axios.post(url, data, {
            auth: {
                username: "anystring",
                password: process.env.MAILCHIMP_API_KEY,
            },
        });
        console.log("Interest added to category:", response.data);
        return response;
    }
    catch (error) {
        console.error("Error adding interest to category:", error.response ? error.response.data : error.message);
    }
}
async function deleteInterestCategory(interestCategoryId) {
    const url = `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${listId}/interest-categories/${interestCategoryId}`;
    try {
        const response = await axios.delete(url, {
            auth: {
                username: "anystring",
                password: process.env.MAILCHIMP_API_KEY,
            },
        });
        console.log("Interest category deleted:", response.data);
        return response;
    }
    catch (error) {
        console.error("Error deleting interest category:", error.response ? error.response.data : error.message);
    }
}
export { listId, mailchimpErrors, mailchimp, addInterestToCategory, deleteInterestCategory, groupId };
