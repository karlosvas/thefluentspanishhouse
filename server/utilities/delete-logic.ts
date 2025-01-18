import { ObjectId, Types } from 'mongoose';
import { modelComment } from '../src/mongodb/models.js';

export const deleteCommentAndChildren = async (commentId: ObjectId[]) => {
  // Obtener el comentario con sus hijos
  const comment = await modelComment.findById(commentId).populate('answers');

  if (!comment) throw new Error('Comment not found');

  // Eliminar recursivamente todos los hijos
  if (comment.answers)
    for (const childCommentId of comment.answers)
      await deleteCommentAndChildren(childCommentId as unknown as ObjectId[]);

  // Eliminar el comentario padre
  await modelComment.findByIdAndDelete(commentId);
};
