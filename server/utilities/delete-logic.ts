import { modelComment } from "../models.js";
import { Types } from "mongoose";

export const deleteCommentAndChildren = async (commentId: Types.ObjectId) => {
  // Obtener el comentario con sus hijos
  const comment = await modelComment.findById(commentId).populate("answers");

  if (!comment) throw new Error("Comment not found");

  // Eliminar recursivamente todos los hijos
  for (const childCommentId of comment.answers)
    await deleteCommentAndChildren(childCommentId);

  // Eliminar el comentario padre
  await modelComment.findByIdAndDelete(commentId);
};
