import { modelComment } from "../models.js";
export const deleteCommentAndChildren = async (commentId) => {
    // Obtener el comentario con sus hijos
    const comment = await modelComment.findById(commentId).populate("answers");
    if (!comment)
        throw new Error("Comment not found");
    // Eliminar recursivamente todos los hijos
    for (const childCommentId of comment.answers)
        await deleteCommentAndChildren(childCommentId);
    // Eliminar el comentario padre
    await modelComment.findByIdAndDelete(commentId);
};
