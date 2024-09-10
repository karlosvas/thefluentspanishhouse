import dotenv from "dotenv";
dotenv.config();
////////////////////////////////////////////////////////////////
import mailchimp from "@mailchimp/mailchimp_transactional";
import { Message } from "types/types";

// Configurar el cliente de Mandrill
const mandrill = mailchimp(process.env.MANDRILL_API_KEY);

export async function submitNote(email_user: string, username: string, subject: string, note: string) {
  // Datos del correo y opciones
  const message: Message = {
    from_email: "no-reply@thefluentspanishhouse.com",
    from_name: `${email_user}`,
    to: [
      {
        email: process.env.ADMIN_GMAIL,
        type: "to" as const,
      },
    ],
    subject: subject,
    html: `<p>The user <strong>${username}</strong> sent you this message:</p><br /><p>${note}</p>`,
  };

  // Enviar el correo mediante el cliente de Mandrill
  try {
    const response = await mandrill.messages.send({ message });
    return response;
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}

export async function submitEmalSuscriber(email_user: string, username: string, lastname: string, type: string) {
  // Datos del correo y opciones
  let message: Message = {
    from_email: "no-reply@thefluentspanishhouse.com",
    from_name: `${email_user}`,
    to: [
      {
        email: process.env.ADMIN_GMAIL,
        type: "to" as const,
      },
    ],
    subject: `New student on TheFluentSpanishHouse ${username} ${lastname}`,
    html: `<p>The user <b>${username} ${lastname}</b> wants to be a new student:</p><br />
    <p>He wants to sign up for <b>${type}<b/><p/>`,
    headers: {
      "Reply-To": email_user,
    },
  };

  // Enviar el correo mediante el transporte
  try {
    const info = await mandrill.messages.send({ message });
    return info;
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}

export async function submitEmailComment(email_user: string, username: string, data: string, originUrl: string) {
  // Configuración del transporte
  // Datos del correo y opciones
  let message: Message = {
    from_email: `"${email_user} via TheFluentSpanishHouse" ${process.env.ADMIN_GMAIL}`,
    from_name: `${email_user}`,
    to: [
      {
        email: process.env.ADMIN_GMAIL,
        type: "to" as const,
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
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}
