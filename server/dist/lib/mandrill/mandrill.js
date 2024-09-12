import dotenv from "dotenv";
dotenv.config();
////////////////////////////////////////////////////////////////
import mailchimp from "@mailchimp/mailchimp_transactional";
// Configurar el cliente de Mandrill
const mandrill = mailchimp(process.env.MANDRILL_API_KEY);
// Enviar nota de contact us a el administrador
export async function submitNote(email_user, username, subject, note) {
    const message = {
        from_email: "no-reply@thefluentspanishhouse.com",
        from_name: `${email_user}`,
        to: [
            {
                email: process.env.ADMIN_GMAIL,
                type: "to",
            },
        ],
        subject: subject,
        html: `
    <p>The user <strong>${username}</strong> sent you this message:</p><br /><p>${note}</p>`,
        headers: {
            "Reply-To": email_user,
        },
    };
    try {
        const response = await mandrill.messages.send({ message });
        return response;
    }
    catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
}
// Enviar email de nuevo estuidiante a el administrador
export async function submitEmalStudent(email_user, username, lastname, className) {
    let message = {
        from_email: "no-reply@thefluentspanishhouse.com",
        from_name: `${email_user}`,
        to: [
            {
                email: process.env.ADMIN_GMAIL,
                type: "to",
            },
        ],
        subject: `New student on TheFluentSpanishHouse ${username} ${lastname}`,
        html: `<p>The user <b>${username} ${lastname}</b> wants to be a new student:</p><br />
    <p>He wants to sign up for <b>${className}<b/><p/>`,
        headers: {
            "Reply-To": email_user,
        },
    };
    try {
        return await mandrill.messages.send({ message });
    }
    catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
}
// Enviar email de nuevo comentario a el administrador
export async function submitEmailComment(email_user, username, data, originUrl) {
    let message = {
        from_email: `"${email_user} via TheFluentSpanishHouse" ${process.env.ADMIN_GMAIL}`,
        from_name: `${email_user}`,
        to: [
            {
                email: process.env.ADMIN_GMAIL,
                type: "to",
            },
        ],
        subject: `${username} has sent the following comment`,
        html: `<p>The user <strong>${username} </strong> say:</p><br />
    <p>${data}<p/><br />
    <p>Desde la publicación: ${originUrl}<p/>`,
    };
    try {
        return await mandrill.messages.send({ message });
    }
    catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
}
