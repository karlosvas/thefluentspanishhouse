import { modelComment, modelTranslation } from "./models.js";
import { connectDB } from "./mongodb.js";
import { Types } from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Configuración global de CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: false,
  })
);

// Uso de json
app.use(express.json());

// Manejo explícito de solicitudes OPTIONS
app.options("*", cors());

// Conexión a la base de datos
await connectDB();

// Rutas
// Carga de comentarios al entrar en una publicación
app.get("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await modelComment.find({ id_publication: id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
});

// Carga las traduciones para i18n
app.get("/api/translations/:lng/:ns", async (req, res) => {
  const { lng, ns } = req.params;
  try {
    const translation = await modelTranslation.findOne({
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

// Agregar comentarios
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

app.post("/api/newpublication", async (req, res) => {
  try {
    const { title, subtitle, content, base64_img } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validar formato de image si se proporciona
    if (base64_img && !/^data:image\/[a-zA-Z]+;base64,/.test(base64_img)) {
      return res.status(400).json({ message: "Invalid image format" });
    }

    // Busca la traducción por el _id correcto
    const translation = await modelTranslation.findOne({
      _id: "en_global", // Asegúrate de usar el valor correcto para _id
    });

    if (!translation)
      return res.status(404).json({ message: "Translation not found" });

    // Crea un nuevo cardBlog
    const newCardBlog = {
      id: new Types.ObjectId().toString(),
      title,
      subtitle,
      content,
      base64_img,
    };

    // Añade el nuevo cardBlog al array de cardsBlog
    translation.translations.cardsBlog.push(newCardBlog);

    // Guarda la traducción actualizada
    await translation.save();

    res
      .status(201)
      .json({ message: "Card blog added successfully", cardBlog: newCardBlog });
  } catch (error) {
    console.error("Error adding card blog:", error); // Imprime el error en la consola
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const PORT_BACKEND = process.env.PORT;
app.listen(PORT_BACKEND, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT_BACKEND}`);
});
