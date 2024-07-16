import sqlite3 from "sqlite3";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("db.sqlite");
db.run(`CREATE TABLE IF NOT EXISTS COMMENTS (
  id_comment TEXT PRIMARY KEY,
  id_user TEXT,
  email TEXT,
  img TEXT,
  data TEXT
)`);

// Crear un nuevo comentario en la DB
app.post("/api/comments", (req, res) => {
  const { id_comment, id_user, email, img, data } = req.body;

  if (!id_comment || !id_user || !email || !img || !data)
    return res.status(400).json({ error: "Todos los campos son requeridos" });

  db.run(
    "INSERT INTO COMMENTS (id_comment, id_user, email, img, data) VALUES (?, ?, ?, ?, ?)",
    [id_comment, id_user, email, img, data],
    function (err) {
      if (err) {
        console.error("Error al crear el comentario:", err.message);
        res.status(500).json({ error: "Error al crear el comentario" });
      } else {
        res.status(201).json({ message: "Comentario creado correctamente" });
      }
    }
  );
});

// Devuelbe el array de commentarios
app.get("/api/comments", (req, res) => {
  db.all("SELECT * FROM COMMENTS", (err, rows) => {
    if (err)
      res.status(500).json({ error: "Error al obtener los comentarios" });
    else res.json(rows);
  });
});

const PORT_BACKEND = 3001;

// Iniciar el servidor en local
app.listen(PORT_BACKEND, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT_BACKEND}`);
});
