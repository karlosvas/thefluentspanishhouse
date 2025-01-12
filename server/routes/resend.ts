import { Router } from "express";
import { submitEmailStudent, submitNote } from "../lib/resend/resend.js";
import { SubscriberType, type NoteType } from "types/types";
import { log, verifyIdToken } from "../middelware/token-logs.js";

const router = Router();

// Enviamos un email con una nota de contact us
router.post("/note", log, verifyIdToken, async (req, res) => {
  const newNote: NoteType = req.body;

  if (!newNote.email_user || !newNote.username || !newNote.subject || !newNote.note)
    return res.status(400).send({ message: "Missing required fields" });

  submitNote(newNote)
    .then((response) => res.status(201).json({ message: "Email sent successfully", response }))
    .catch((error) => res.status(500).send({ message: "Error sending email", error }));
});

// Avisamos de que se a suscrito un nuevo estudiante a una clase
router.post("/newstudent", log, verifyIdToken, async (req, res) => {
  const newSubcriber: SubscriberType = req.body;

  console.log(newSubcriber);
  if (!newSubcriber.email || !newSubcriber.name || !newSubcriber.lastname || !newSubcriber.class)
    return res.status(400).send({ message: "Missing required fields" });

  console.log("Enviando email");
  submitEmailStudent(newSubcriber)
    .then((response) => res.status(201).json({ message: "Email sent successfully", response }))
    .catch((error) => res.status(500).send({ message: "Error sending email", error }));
});

export { router };
