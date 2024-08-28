import dotenv from "dotenv";
dotenv.config();
/////////////
import { modelComment, modelPublication } from "./models.js";
import { connectDB } from "./mongodb.js";
import { Types } from "mongoose";
import express from "express";
import cors from "cors";
import { newMailChampSuscriber } from "./mailchamp.js";
import { submitNote } from "./nodemailer.js";
import { validateEmail } from "./utilities.js";

const app = express();

// Extendemos el límite para que pueda almacenar imagenes en base64
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

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
await connectDB();

// <--------------- GET --------------->
// Obtener los hijos de un comentario
app.get("/api/comments/children/:id", async (req, res) => {
  console.log("obteneindo children");
  // El id es el id del comentario padre (parent_id)
  const parentId = req.params.id;
  try {
    // Buscar el comentario padre y obtener sus hijos
    const comments = await modelComment.findById(parentId).populate("answers");
    if (!comments) throw new Error("Comments not found");
    console.log("comments.answers", comments.answers);
    res.json(comments.answers);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
});

// Carga de comentarios al entrar en una publicación
app.get("/api/comments/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const parentComments = await modelComment.find({ pattern_id: id });
    res.json(parentComments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
});

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

// Obtener publicaciones
app.get("/api/publications", async (req, res) => {
  try {
    const publication = await modelPublication.find();
    if (!publication)
      return res.status(404).json({ message: "Publication not found" });
    res.status(200).json(publication);
  } catch (error) {
    console.error("Error retrieving publication:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Entrar en la publicación selecionada
app.get("/api/publications/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid publication ID" });
    const publication = await modelPublication.findById(id);
    if (!publication)
      return res.status(404).json({ message: "Publication not found" });
    res.status(200).json(publication);
  } catch (error) {
    console.error("Error retrieving publication:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// <--------------- POST --------------->
// Agregar comentarios
app.post("/api/comments", async (req, res) => {
  let newCommentData = req.body;
  try {
    // Crear un nuevo ObjectId para el nuevo comentario
    newCommentData._id = new Types.ObjectId();
    // Crear un nuevo comentario hijo
    const newComment = new modelComment(newCommentData);
    newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error al añadir el comentario:", error);
    res.status(500).json({ error: "Error al añadir el comentario" });
  }
});

// Nuevas publicaciones
app.post("/api/newpublication", async (req, res) => {
  try {
    const { title, subtitle, content, base64_img } = req.body;
    // Validaciones
    if (!title || !subtitle || !content)
      return res.status(400).json({ message: "Missing required fields" });
    if (base64_img && !/^data:image\/[a-zA-Z]+;base64,/.test(base64_img))
      return res.status(400).json({ message: "Invalid image format" });
    // Crear una nueva tarjeta de blog
    const newCardBlog = new modelPublication({
      _id: new Types.ObjectId(),
      title,
      subtitle,
      content,
      base64_img,
    });
    // Guardar el nuevo documento en la base de datos
    await newCardBlog.save();
    res
      .status(201)
      .json({ message: "Card blog added successfully", cardBlog: newCardBlog });
  } catch (error) {
    console.error("Error adding card blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Nuevas suscripciones a mailchamp
app.post("/api/mailchamp", async (req, res) => {
  const { email, name, lastname, interests } = req.body;

  if (!validateEmail(email)) return res.status(400).send("Email inválido");

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

  newMailChampSuscriber(newUserChamp, res);
});

// Envia nota al gmail de process.env.USER_GMAIL
app.post("/api/note", async (req, res) => {
  const { email_user, username, subject, note } = req.body;
  if (!email_user || !username || !subject || !note) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    await submitNote(email_user, username, subject, note);
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error sending email", error });
  }
});

// <--------------- PUT --------------->
// Actualizar likes de comentarios
app.put("/api/comments/likes", async (req, res) => {
  const { uid_user_firebase, _id, likes } = req.body;
  if (likes === undefined || likes === null || !uid_user_firebase || !_id)
    return res.status(400).json({ error: "Los campos son requeridos" });

  try {
    const comment = await modelComment.findById(_id);

    if (!comment)
      return res.status(404).json({ error: "Comentario no encontrado" });

    if (comment.likedBy.includes(uid_user_firebase)) {
      const index = comment.likedBy.indexOf(uid_user_firebase);
      comment.likedBy.splice(index, 1);
      comment.likes -= 1;
    } else {
      comment.likedBy.push(uid_user_firebase);
      comment.likes += 1;
    }

    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error al actualizar los likes del comentario:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar los likes del comentario" });
  }
});

app.put("/api/comments/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { textEdit } = req.body;
  if (!textEdit) return res.status(400).json({ message: "Missing content" });

  try {
    const comment = await modelComment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.data = textEdit;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/comments/children/:id", async (req, res) => {
  const parentCommentId = req.params.id;
  let newCommentData = req.body;

  try {
    // Crear un nuevo ObjectId para el nuevo comentario
    newCommentData._id = new Types.ObjectId();
    // Crear un nuevo comentario hijo
    const newComment = new modelComment(newCommentData);
    newComment.save();

    // Agregar el nuevo comentario al array de comentarios del comentario padre
    const parentComment = await modelComment.findById(parentCommentId);
    parentComment.answers.push(newComment._id);
    await parentComment.save();

    res.status(201).send(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send("Error adding comment: " + error.message);
  }
});

// <--------------- DELETE --------------->
// Eliminar publicaciones
app.delete("/api/publications/del/:id", async (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid publication ID" });
  try {
    const result = await modelPublication.findByIdAndDelete(id);
    if (!result)
      return res.status(404).json({ message: "Publication not found" });
    res.status(200).json({ message: "Publication deleted successfully" });
  } catch (error) {
    console.error("Error deleting publication:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.delete("/api/comments/del/:id", async (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid publication ID" });
  try {
    const result = await modelComment.findByIdAndDelete(id);
    if (!result)
      return res.status(404).json({ message: "Publication not found" });
    res.status(200).json({ message: "Publication deleted successfully" });
  } catch (error) {
    console.error("Error deleting publication:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const PORT_BACKEND = process.env.PORT;
app.listen(PORT_BACKEND, () => {
  console.log(`Server runing: http://localhost:${PORT_BACKEND}`);
});
