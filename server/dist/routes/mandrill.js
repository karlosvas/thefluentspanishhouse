import { Router } from "express";
import { submitEmalSuscriber, submitNote } from "../lib/mandrill/mandrill.js";
import { log, verifyIdToken } from "../middelware/token-logs.js";
const router = Router();
router.post("/note", log, verifyIdToken, async (req, res) => {
    const newNote = req.body;
    if (!newNote.email_user || !newNote.username || !newNote.subject || !newNote.note)
        return res.status(400).send({ message: "Missing required fields" });
    submitNote(newNote.email_user, newNote.username, newNote.subject, newNote.note)
        .then(() => res.status(200).send({ message: "Email sent successfully" }))
        .catch((error) => res.status(500).send({ message: "Error sending email", error }));
});
router.post("/newstudent", log, verifyIdToken, async (req, res) => {
    const newSuscriber = req.body;
    if (!newSuscriber.email || !newSuscriber.name || !newSuscriber.lastname || !newSuscriber.class)
        return res.status(400).send({ message: "Missing required fields" });
    submitEmalSuscriber(newSuscriber.email, newSuscriber.name, newSuscriber.lastname, newSuscriber.class)
        .then((response) => res.status(200).json({ message: "Email sent successfully", response }))
        .catch((error) => res.status(500).send({ message: "Error sending email", error }));
});
export { router };
