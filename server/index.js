import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { modelComment, moodelTranslation } from "./models.js";
import { connectDB } from "./mongodb.js";
import { Types } from "mongoose";

dotenv.config();

const app = express();

// Configuración global de CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: false,
  })
);

app.use(express.json());

// Manejo explícito de solicitudes OPTIONS
app.options("*", cors());

await connectDB();

// Rutas
app.get("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await modelComment.find({ id_publication: id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
});

app.post("/api/comments", async (req, res) => {
  const { id_comment, id_publication, id_user, email, img, data } = req.body;

  if (!id_comment || !id_user || !email || !data)
    return res.status(400).json({ error: "Todos los campos son requeridos" });

  try {
    const newComment = new modelComment({
      _id: new Types.ObjectId(),
      id_comment,
      id_publication,
      id_user,
      email,
      img,
      data,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error al añadir el comentario:", error);
    res.status(500).json({ error: "Error al añadir el comentario" });
  }
});

app.get("/api/translations/:lng/:ns", async (req, res) => {
  const { lng, ns } = req.params;
  try {
    const translation = await moodelTranslation.findOne({
      language: lng,
      namespace: ns,
    });
    if (translation) {
      res.json(translation.translations);
    } else {
      res.status(404).json({ error: "Translations not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT_BACKEND = process.env.PORT || 3001;
app.listen(PORT_BACKEND, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT_BACKEND}`);
});
