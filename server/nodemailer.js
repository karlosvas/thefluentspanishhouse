import { createTransport } from "nodemailer";

// Configuración del transporte
let transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.PASSWORD_GMAIL,
  },
});

export async function submitNote(email_user, username, subject, note) {
  // Datos del correo y opciones
  let mailOptions = {
    from: `"${email_user} via TheFluentSpanishHouse" ${process.env.USER_GMAIL}`,
    to: process.env.USER_GMAIL,
    subject: subject,
    text: `The user ${username} sent you this message:\n\n${note}`,
    replyTo: email_user,
  };

  // Enviar el correo mediante el transporte
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}
