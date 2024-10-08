import dotenv from "dotenv";
dotenv.config();
////////////////////////////////////////////////////////////////
import mailchimp from "@mailchimp/mailchimp_transactional";
import { Message } from "types/types";

// Configurar el cliente de Mandrill
const mandrill = mailchimp(process.env.MANDRILL_API_KEY as string);
const admin = process.env.ADMIN_GMAIL as string;

// Enviar nota de contact us a el administrador
export async function submitNote(email_user: string, username: string, subject: string, note: string) {
  const message: Message = {
    from_email: "no-reply@thefluentspanishhouse.com",
    from_name: `${email_user}`,
    to: [
      {
        email: admin,
        type: "to" as const,
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
    if (process.env.NODE_ENV === "production") return await mandrill.messages.send({ message });
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}

// Enviar email de nuevo estuidiante a el administrador
export async function submitEmalStudent(email_user: string, username: string, lastname: string, className: string) {
  let message: Message = {
    from_email: "no-reply@thefluentspanishhouse.com",
    from_name: `${email_user}`,
    to: [
      {
        email: admin,
        type: "to" as const,
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
    if (process.env.NODE_ENV === "production") return await mandrill.messages.send({ message });
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}

// Enviar email de nuevo comentario a el administrador
export async function submitEmailComment(email_user: string, username: string, data: string, originUrl: string) {
  let message: Message = {
    from_email: "no-reply@thefluentspanishhouse.com",
    from_name: `${email_user}`,
    to: [
      {
        email: admin,
        type: "to" as const,
      },
    ],
    subject: `${username} has sent the following comment`,
    html: `<p>The user <strong>${username} </strong> say:</p><br />
    <p>${data}<p/><br />
    <p>Desde la publicación: ${originUrl}<p/>`,
  };

  try {
    if (process.env.NODE_ENV === "production") return await mandrill.messages.send({ message });
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}
