import { modelComment, modelPublication } from "./models.js";
import { connectDB } from "./mongodb.js";
import { Types } from "mongoose";
import express from "express";
import cors from "cors";
import https from "https";
import dotenv from "dotenv";
import { submitNote } from "./nodemailer.js";
dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Configuración global de CORS
const allowedOrigins = [
  process.env.URL_WEB,
  process.env.URL_WEB_TEST,
  process.env.URL_WEB_LOCAL,
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

// Conexión a la base de datos
await connectDB();

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
    // Verifica si el id es un ObjectId válido
    if (!Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid publication ID" });
    // Encuentra la publicación por id
    const publication = await modelPublication.findById(id);
    // Si no se encuentra la publicación
    if (!publication)
      return res.status(404).json({ message: "Publication not found" });
    // Devuelve el elemento encontrado
    res.status(200).json(publication);
  } catch (error) {
    console.error("Error retrieving publication:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Nuevas publicaciones
app.post("/api/newpublication", async (req, res) => {
  try {
    const { title, subtitle, content, base64_img } = req.body;
    // Validar campos requeridos
    if (!title || !subtitle || !content)
      return res.status(400).json({ message: "Missing required fields" });
    // Validar formato de imagen si se proporciona
    if (
      (base64_img && !/^data:image\/[a-zA-Z]+;base64,/.test(base64_img)) ||
      /^\d+$/.test(base64_img)
    )
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

  const request = https.request(url, options, function (response) {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      const responseData = JSON.parse(data);
      if (response.statusCode === 200) {
        res.status(200).send("Suscripción enviada");
      } else if (responseData.title === "Member Exists") {
        res.status(400).send("El usuario ya está suscrito");
      } else {
        console.error(responseData);
        res.status(response.statusCode).send(responseData);
      }
    });
  });

  request.on("error", (error) => {
    console.error("Error al enviar la solicitud:", error);
    res.status(500).send("Error al enviar la solicitud");
  });

  // Enviar la información a Mailchimp
  request.write(jsonChamp);
  request.end();
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

// Eliminar publicaciones
app.delete("/api/publications/del/:id", async (req, res) => {
  const id = req.params.id;
  // Verifica si el id es un ObjectId válido
  if (!Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid publication ID" });
  try {
    // Encuentra y elimina la publicación por id
    const result = await modelPublication.findByIdAndDelete(id);
    // Si no se encuentra ninguna publicación con ese ID
    if (!result)
      return res.status(404).json({ message: "Publication not found" });
    // Publicación eliminada exitosamente
    res.status(200).json({ message: "Publication deleted successfully" });
  } catch (error) {
    console.error("Error deleting publication:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/note", async (req, res) => {
  const { email_user, name_user, note } = req.body;
  try {
    await submitNote(email_user, name_user, note);
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error sending email", error });
  }
});

const PORT_BACKEND = process.env.PORT;
app.listen(PORT_BACKEND, () => {
  console.log(`Server runing: http://localhost:${PORT_BACKEND}`);
});
