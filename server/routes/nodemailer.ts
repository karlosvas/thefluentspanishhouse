import { Router } from "express";
import { submitNote } from "../lib/nodemailer/nodemailer.js";
import { type NoteType } from "types/types";

const router = Router();

router.post("/note", async (req, res) => {
  const newNote: NoteType = req.body;
  console.log(newNote);

  if (!newNote.email_user || !newNote.username || !newNote.subject || !newNote.note)
    return res.status(400).send({ message: "Missing required fields" });

  submitNote(newNote.email_user, newNote.username, newNote.subject, newNote.note)
    .then(() => res.status(200).send({ message: "Email sent successfully" }))
    .catch((error) => res.status(500).send({ message: "Error sending email", error }));
});

export { router };
