import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { modelComment } from "./models.js";
import { connectDB } from "./mongodb.js";
import { Types } from "mongoose";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

await connectDB();

app.get("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await modelComment.find({ id_publication: id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
});

// Crear un nuevo comentario en la DB
app.post("/api/comments", async (req, res) => {
  const { id_comment, id_publication, id_user, email, img, data } = req.body;

  if (!id_comment || !id_user || !email || !data)
    return res.status(400).json({ error: "Todos los campos son requeridos" });

  try {
    // Crear un nuevo comentario utilizando el modelo modelComment
    const newComment = new modelComment({
      _id: new Types.ObjectId(),
      id_comment,
      id_publication,
      id_user,
      email,
      img,
      data,
    });

    // Guardar el comentario en la base de datos
    await newComment.save();

    // Responder con el comentario creado
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error al añadir el comentario:", error);
    res.status(500).json({ error: "Error al añadir el comentario" });
  }
});

const PORT_BACKEND = process.env.PORT || 3001;
app.listen(PORT_BACKEND, () => {
  console.log(`http://localhost:${PORT_BACKEND}`);
});
