import dotenv from "dotenv";
dotenv.config();
/////////////
import { connectDB } from "./mongodb.js";
import express from "express";
import cors from "cors";
import admin from "./lib/firebase/firebase-config.js";
import { addSubscriberChamp } from "./lib/mailchamp/mailchamp.js";
import {
  submitNote,
  // submitEmalSuscriber,
} from "./lib/nodemailer/nodemailer.js";
import { validateEmail } from "./utilities/validateEmail.js";
import { router } from "./routes/routes.js";
import { ChampTag, Member, NewUserChamp, SubscriberType } from "types/types";
import mailchimp from "@mailchimp/mailchimp_marketing";

const app = express();

// Extendemos el límite para que pueda almacenar imagenes en base64
async function inicializeApp() {
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  app.use(express.json());

  // Configuración global de CORS
  const allowedOrigins = [
    process.env.URL_WEB,
    process.env.URL_WEB_TEST,
    "http://localhost:5173",
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: "GET,POST,PUT,DELETE,OPTIONS",
      allowedHeaders: "Content-Type,Authorization",
      credentials: true,
    })
  );

  // Conexión a la base de datos
  try {
    await connectDB();
  } catch (error) {
    throw new Error("Error connecting to the database");
  }

  app.get("/", (req, res) => {
    res.send("Welcome to thefluentespnaishouse server");
  });

  // Rutas de la aplicación
  app.use(router);

  // Rutas de librerias de terceros
  // Obtener la URL de los preview para hacer testing
  app.get("/api/test", async (req, res) => {
    try {
      const previewUrl = process.env.VERCEL_URL;
      if (!previewUrl) throw new Error("VERCEL_URL no está definida");
      res.send(previewUrl);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error en el servidor para obtener URL de preview" });
    }
  });

  // Nuevas suscripciones a Mailchamp
  app.post("/api/mailchamp", async (req, res) => {
    const { name, lastname, email, tags } = req.body;

    if (!validateEmail(email)) return res.status(400).send("Email inválido");

    const newUserChamp: Member = {
      email_address: email,
      status: "pending",
      merge_fields: {
        FNAME: name,
        LNAME: lastname,
      },
      tags,
    };

    try {
      // Usuario y etiquetas para añadir al usuario
      await addSubscriberChamp(newUserChamp);
      res.status(200).send("Email sent successfully");
      // await submitEmalSuscriber(email, name, lastname, type);
    } catch (error) {
      res.status(500).send("Error suscribing to Mailchimp");
    }
  });

  // Envia nota el contact us a gmail de process.env.USER_GMAIL
  app.post("/api/note", async (req, res) => {
    const { email_user, username, subject, note } = req.body;
    if (!email_user || !username || !subject || !note)
      return res.status(400).send({ message: "Missing required fields" });
    try {
      await submitNote(email_user, username, subject, note);
      res.status(200).send({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error sending email", error });
    }
  });

  // app.post("/mailchamp/newsletter", async (req, res) => {
  //   const { email } = req.body;
  //   if (!validateEmail(email)) return res.status(400).send("Email inválido");
  //   const newUserChamp: NewUserChamp = {
  //     members: [
  //       {
  //         email_address: email,
  //         status: "subscribed",
  //       },
  //     ],
  //   };

  //   try {
  //     await newMailChampSuscriber(newUserChamp, res);
  //     res.status(200).send("Email sent successfully");
  //   } catch (error) {
  //     res.status(500).send("Error sending email");
  //   }
  // });

  const PORT_BACKEND = process.env.PORT;
  app.listen(PORT_BACKEND, () => {
    console.log(`Server runing: http://localhost:${PORT_BACKEND}`);
  });
}

inicializeApp().catch((error) => {
  console.error("Error starting the server:", error);
});
