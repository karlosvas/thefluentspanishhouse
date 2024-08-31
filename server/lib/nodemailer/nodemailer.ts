import { createTransport } from "nodemailer";

export async function submitNote(
  email_user: string,
  username: string,
  subject: string,
  note: string
) {
  // Configuración del transporte
  let transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });
  // Datos del correo y opciones
  let mailOptions = {
    from: `"${email_user} via TheFluentSpanishHouse" ${process.env.USER_GMAIL}`,
    to: process.env.USER_GMAIL,
    subject: subject,
    html: `<p>The user <strong>${username}</strong> sent you this message:</p><br /><p>${note}</p>`,
    replyTo: email_user,
  };

  // Enviar el correo mediante el transporte
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}

export async function submitEmalSuscriber(
  email_user: string,
  username: string,
  lastname: string,
  type: string
) {
  // Configuración del transporte
  let transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });
  // Datos del correo y opciones
  let mailOptions = {
    from: `"${email_user} via TheFluentSpanishHouse" ${process.env.USER_GMAIL}`,
    to: process.env.USER_GMAIL,
    subject: `New subscriber on TheFluentSpanishHouse ${username} ${lastname}`,
    html: `<p>The user <strong>${username} ${lastname}</strong> sent you this message:</p><br />
    <p>Wants to subscribe to ${type}<p/>`,
    replyTo: email_user,
  };

  // Enviar el correo mediante el transporte
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}

export async function submitEmailComment(
  email_user: string,
  username: string,
  data: string,
  originUrl: string
) {
  // Configuración del transporte
  let transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });
  // Datos del correo y opciones
  let mailOptions = {
    from: `"${email_user} via TheFluentSpanishHouse" ${process.env.USER_GMAIL}`,
    to: process.env.USER_GMAIL,
    subject: `${username} has sent the following comment`,
    html: `<p>The user <strong>${username} </strong> say:</p><br />
    <p>${data}<p/><br />
    <p>Desde la publicación: ${originUrl}<p/>`,
    replyTo: email_user,
  };

  // Enviar el correo mediante el transporte
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}
