import { Response } from "express";
import https from "https";
import { type NewUserChamp } from "types/types";

export async function newMailChampSuscriber(
  newUserChamp: NewUserChamp,
  res: Response
) {
  const jsonChamp = JSON.stringify(newUserChamp.members);

  const apiKey = process.env.MAILCHIMP_API;
  const dataCenter = process.env.MAILCHIMP_SERVER_PREFIX;
  const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/21cf8c94a8`;

  const options = {
    method: "POST",
    auth: `karlosvas:${apiKey}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Solicitud HTTPS a Mailchimp
  const request = https.request(url, options, function (response) {
    let data = "";

    // Recibe los datos de la respuesta en chunks
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      // Cuando la repuesta haya terminado lo parseamos a JSON
      const responseData = JSON.parse(data);
      if (responseData.title === "Member Exists")
        res.status(400).send("The user is already subscribed");
      else if (response.statusCode === 200)
        res.status(200).send({ message: "Subscription sent successfully" });
      else {
        console.error(responseData);
        if (response.statusCode)
          res.status(response.statusCode).send(responseData);
      }
    });
  });

  // Error in response
  request.on("error", (error) => {
    console.error("Error in response", error);
    res.status(500).send("Error sending request");
  });

  // Enviar la información a Mailchimp
  request.write(jsonChamp);
  request.end();
}