import { Router } from "express";
import { submitEmalStudent, submitNote } from "../lib/mandrill/mandrill.js";
import { log, verifyIdToken } from "../middelware/token-logs.js";
const router = Router();
router.post("/note", log, verifyIdToken, async (req, res) => {
    const newNote = req.body;
    if (!newNote.email_user || !newNote.username || !newNote.subject || !newNote.note)
        return res.status(400).send({ message: "Missing required fields" });
    submitNote(newNote.email_user, newNote.username, newNote.subject, newNote.note)
        .then((response) => res.status(201).json({ message: "Email sent successfully", response }))
        .catch((error) => res.status(500).send({ message: "Error sending email", error }));
});
router.post("/newstudent", log, verifyIdToken, async (req, res) => {
    const newSubcriber = req.body;
    if (!newSubcriber.email || !newSubcriber.name || !newSubcriber.lastname || !newSubcriber.class)
        return res.status(400).send({ message: "Missing required fields" });
    submitEmalStudent(newSubcriber.email, newSubcriber.name, newSubcriber.lastname, newSubcriber.class)
        .then((response) => res.status(201).json({ message: "Email sent successfully", response }))
        .catch((error) => res.status(500).send({ message: "Error sending email", error }));
});
export { router };
