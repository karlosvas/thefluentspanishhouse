import dotenv from "dotenv";
dotenv.config();
import mailchimp from "@mailchimp/mailchimp_transactional";
// Configurar el cliente de Mandrill
const mandrillClient = mailchimp(process.env.MANDRILL_API_KEY);
export async function submitNote(email_user, username, subject, note) {
    // Datos del correo y opciones
    const message = {
        from_email: "no-reply@thefluentspanishhouse.com",
        from_name: `${email_user} via TheFluentSpanishHouse`,
        to: [
            {
                email: "carlosvassan@thefluentspanishhouse.com",
                type: "to",
            },
        ],
        subject: subject,
        html: `<p>The user <strong>${username}</strong> sent you this message:</p><br /><p>${note}</p>`,
        headers: {
            "Reply-To": email_user,
        },
    };
    // Enviar el correo mediante el cliente de Mandrill
    try {
        const response = await mandrillClient.messages.send({ message });
        return response;
    }
    catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
}
submitNote("example@gmail.com", "carlos", "Test", "This is a test message")
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
