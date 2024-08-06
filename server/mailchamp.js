import https from "https";

const apiKey = process.env.MAILCHIMP_API;
const dataCenter = process.env.MAILCHIMP_SERVER_PREFIX;

export async function subscribeUser(email, name, lastname, interests) {
  const newUserChamp = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          LNAME: lastname,
          INTERESTSS: interests,
        },
      },
    ],
  };

  const jsonChamp = JSON.stringify(newUserChamp);
  const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/21cf8c94a8`;

  const options = {
    method: "POST",
    auth: `anystring:${apiKey}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    const request = https.request(url, options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const responseData = JSON.parse(data);
        if (response.statusCode === 200) {
          resolve("Suscripción enviada");
        } else if (responseData.title === "Member Exists") {
          reject(new Error("El usuario ya está suscrito"));
        } else {
          reject(new Error(responseData));
        }
      });
    });

    request.on("error", (error) => {
      reject(new Error("Error al enviar la solicitud: " + error.message));
    });

    request.write(jsonChamp);
    request.end();
  });
}
