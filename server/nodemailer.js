import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Configuración del transporte
let transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.PASSWORD_GMAIL,
  },
});

export async function submitNote(email_user, name_user, note) {
  // Datos del correo
  let mailOptions = {
    from: email_user,
    to: process.env.USER_GMAIL,
    subject: name_user,
    text: note,
  };
  // Enviar el correo
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
}
