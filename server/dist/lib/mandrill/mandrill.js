import dotenv from "dotenv";
dotenv.config();
////////////////////////////////////////////////////////////////
import mailchimp from "@mailchimp/mailchimp_transactional";
// Configurar el cliente de Mandrill
const mandrill = mailchimp(process.env.MANDRILL_API_KEY);
export async function submitNote(email_user, username, subject, note) {
    // Datos del correo y opciones
    const message = {
        from_email: "no-reply@thefluentspanishhouse.com",
        from_name: `${email_user}`,
        to: [
            {
                email: process.env.USER_GMAIL,
                type: "to",
            },
        ],
        subject: subject,
        html: `<p>The user <strong>${username}</strong> sent you this message:</p><br /><p>${note}</p>`,
    };
    // Enviar el correo mediante el cliente de Mandrill
    try {
        const response = await mandrill.messages.send({ message });
        return response;
    }
    catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
}
export async function submitEmalSuscriber(email_user, username, lastname, type) {
    // Datos del correo y opciones
    let message = {
        from_email: "no-reply@thefluentspanishhouse.com",
        from_name: `${email_user}`,
        to: [
            {
                email: process.env.USER_GMAIL,
                type: "to",
            },
        ],
        subject: `New subscriber on TheFluentSpanishHouse ${username} ${lastname}`,
        html: `<p>The user <strong>${username} ${lastname}</strong> sent you this message:</p><br />
    <p>Wants to subscribe to ${type}<p/>`,
    };
    // Enviar el correo mediante el transporte
    try {
        const info = await mandrill.messages.send({ message });
        return info;
    }
    catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
}
export async function submitEmailComment(email_user, username, data, originUrl) {
    // Configuración del transporte
    // Datos del correo y opciones
    let message = {
        from_email: `"${email_user} via TheFluentSpanishHouse" ${process.env.USER_GMAIL}`,
        from_name: `${email_user}`,
        to: [
            {
                email: process.env.USER_GMAIL,
                type: "to",
            },
        ],
        subject: `${username} has sent the following comment`,
        html: `<p>The user <strong>${username} </strong> say:</p><br />
    <p>${data}<p/><br />
    <p>Desde la publicación: ${originUrl}<p/>`,
    };
    // Enviar el correo mediante el transporte
    try {
        const info = await mandrill.messages.send({ message });
        return info;
    }
    catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
}
