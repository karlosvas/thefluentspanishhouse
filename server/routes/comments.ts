import e, { type Request, type Response, Router } from "express";
import { modelComment } from "../models.js";
import { isValidObjectId, Types } from "mongoose";
import { submitEmailComment } from "../lib/nodemailer/nodemailer.js";
import { deleteCommentAndChildren } from "../utilities/delete-logic.js";
import { handleServerError } from "utilities/errorHandle.js";

const router = Router();

// <--------------- GET --------------->
// Obtener los hijos de un comentario
router.get("/api/comments/children/:id", async (req, res) => {
  // El id es el id del comentario padre (parent_id)
  const parentId = req.params.id;
  try {
    // Buscar el comentario padre y obtener sus hijos
    const comments = await modelComment.findById(parentId).populate("answers");
    if (!comments) throw new Error("Comments not found");
    res.json(comments.answers);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
});

// Carga de comentarios al entrar en una publicación
router.get("/api/comments/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const parentComments = await modelComment.find({ pattern_id: id });
    res.json(parentComments);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
});

// <--------------- POST --------------->
// Agregar comentarios
router.post("/api/comments", async (req, res) => {
  let newCommentData = req.body;
  const originUrl = req.body.originUrl;

  try {
    // Crear un nuevo ObjectId para el nuevo comentario
    newCommentData._id = new Types.ObjectId();
    // Crear un nuevo comentario hijo
    const newComment = new modelComment(newCommentData);
    newComment.save();

    // Avisamos por email a el admin_gmail
    if (!newComment.owner) {
      res.status(400).json({ error: "Owner is required" });
      throw new Error("Owner is required");
    }

    await submitEmailComment(
      newComment.owner.email,
      newComment.owner.displayName,
      newComment.data,
      originUrl
    );

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error al añadir el comentario:", error);
    res.status(500).json({ error: "Error al añadir el comentario" });
  }
});

router.post(
  "/api/comments/children/:id",
  async (req: Request, res: Response) => {
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
      if (!parentComment) {
        res.status(404).send("Parent comment not found");
        throw new Error("Parent comment not found");
      }
      parentComment.answers.push(newComment._id);
      await parentComment.save();

      res.status(201).send(newComment);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).send("Error adding comment:");
    }
  }
);

// <--------------- PUT --------------->
// Actualizar likes de comentarios
router.put("/api/comments/likes", async (req: Request, res: Response) => {
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
    handleServerError(res, error);
  }
});

router.put("/api/comments/edit/:id", async (req: Request, res: Response) => {
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
    handleServerError(res, error);
  }
});

// <--------------- DELETE --------------->
router.delete("/api/comments/del/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "Invalid publication ID" });
  try {
    const fatherComment = await modelComment.findById(id);
    if (!fatherComment)
      return res.status(404).json({ message: "Comment not found" });

    // Elimina los hijos del comentario
    await deleteCommentAndChildren(fatherComment.answers);

    // Elimina el comentario principal
    await modelComment.findByIdAndDelete(id);
    res.status(200).json({ message: "Publication deleted successfully" });
  } catch (error) {
    handleServerError(res, error);
  }
});

export { router };
