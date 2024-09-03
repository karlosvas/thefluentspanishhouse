import dotenv from "dotenv";
dotenv.config();
import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";
mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
});
const listId = process.env.MAILCHIMP_LIST_ID;
export const addSubscriberChamp = async (newUserChamp) => {
    try {
        const response = await mailchimp.lists.addListMember(listId, newUserChamp);
        console.log(response);
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
};
export async function uppdateSuscribe(email, status) {
    const subscriberHash = crypto
        .createHash("md5")
        .update(email.toLowerCase())
        .digest("hex");
    try {
        // Actualizar el estado del suscriptor a "subscribed"
        const response = await mailchimp.lists.updateListMember(listId, subscriberHash, {
            status: status,
        });
        console.log(response);
    }
    catch (error) {
        // Manejar otros errores
        console.error("Error updating status to Mailchimp:", error.response ? error.response.body : error.message);
    }
}
export async function getAllListChamp() {
    try {
        return await mailchimp.lists.getAllLists();
    }
    catch (error) {
        console.error("Error getting all members from Mailchimp:", error.response ? error.response.body : error.message);
    }
}
