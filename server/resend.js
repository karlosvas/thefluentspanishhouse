export async function sendEmail(contact, resend) {
  try {
    const response = await resend.emails.send({
      from: contact.email,
      to: "carlosvassan@gmail.com",
      subject: contact.name,
      text: contact.note,
      attachments: [],
      headers: {
        "X-Entity-Ref-ID": "123456789",
      },
      tags: [
        {
          name: "category",
          value: "confirm_email",
        },
      ],
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
