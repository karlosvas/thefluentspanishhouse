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
// Convierte los errores de Mailchimp a objeto de javascript
function mailchimpErrors(error) {
    return JSON.parse(error.response.text);
}
export { listId, mailchimpErrors, mailchimp };
