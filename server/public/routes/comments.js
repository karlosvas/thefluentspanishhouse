import { Router } from 'express';
import { modelComment } from '../src/mongodb/models.js';
import { isValidObjectId, Types } from 'mongoose';
import { submitEmailComment, submitLikeComment } from '../lib/resend/resend.js';
import { deleteCommentAndChildren } from '../utilities/delete-logic.js';
import { handleServerError } from '../utilities/errorHandle.js';
import { verifyIdToken, log } from '../middelware/token-logs.js';
const router = Router();
// <--------------- GET --------------->
// Obtener todos los comentarios
router.get('/all', log, verifyIdToken, async (_req, res) => {
    try {
        // Buscar el comentario padre y obtener sus hijos
        const comments = await modelComment.find().select('data');
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
});
// Obtener los hijos de un comentario
router.get('/children/:id', log, verifyIdToken, async (req, res) => {
    // El id es el id del comentario padre (parent_id)
    const { id } = req.params;
    try {
        // Buscar el comentario padre y obtener sus hijos
        const comments = await modelComment.findById(id).populate('answers');
        if (!comments)
            throw new Error('Comments not found');
        res.status(200).json(comments.answers);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
});
// Carga de comentarios al entrar en una publicación
router.get('/:id', log, verifyIdToken, async (req, res) => {
    const { id } = req.params;
    try {
        const parentComments = await modelComment.find({ pattern_id: id });
        res.status(200).json(parentComments);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
});
// <--------------- POST --------------->
// Agregar comentarios
router.post('/new', log, verifyIdToken, async (req, res) => {
    const { newCommentData, originUrl } = req.body;
    try {
        // Crear un nuevo ObjectId para el nuevo comentario
        newCommentData._id = new Types.ObjectId();
        // Crear un nuevo comentario hijo
        const newComment = new modelComment(newCommentData);
        newComment.save();
        const note = {
            subject: `${newComment.owner.displayName} has sent a comment`,
            username: newComment.owner.displayName,
            note: newComment.data,
            email_user: newComment.owner.email,
        };
        // Avisamos al administrador de la web del nuevo comentario
        await submitEmailComment(note, originUrl);
        res.status(201).json(newComment);
    }
    catch (error) {
        console.error('Error al añadir el comentario:', error);
        res.status(500).json({ error: 'Error al añadir el comentario' });
    }
});
// Agregar comentarios hijos y hacer referencia al comentario padre
router.post('/children/:id', log, verifyIdToken, async (req, res) => {
    const { id } = req.params;
    const { newCommentData, originUrl } = req.body;
    try {
        // Crear un nuevo ObjectId para el nuevo comentario
        newCommentData._id = new Types.ObjectId();
        // Crear un nuevo comentario hijo
        const newComment = new modelComment(newCommentData);
        newComment.save();
        // Avisamos al administrador de la web del nuevo comentario
        const note = {
            subject: `${newComment.owner.displayName} has sent a comment`,
            username: newComment.owner.displayName,
            note: newComment.data,
            email_user: newComment.owner.email,
        };
        await submitEmailComment(note, originUrl);
        // Agregar el nuevo comentario al array de comentarios del comentario padre
        const parentComment = await modelComment.findById(id);
        if (!parentComment) {
            res.status(404).send('Parent comment not found');
            throw new Error('Parent comment not found');
        }
        parentComment.answers && parentComment.answers.push(newComment._id);
        await parentComment.save();
        res.status(201).send(newComment);
    }
    catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Error adding comment:');
    }
});
// <--------------- PUT --------------->
// Actualizar likes de comentarios
router.put('/likes', log, verifyIdToken, async (req, res) => {
    const { uid_user_firebase, _id, likes, originUrl, like_from } = req.body;
    if (likes === undefined || likes === null || !uid_user_firebase || !_id) {
        res.status(400).json({ error: 'Los campos son requeridos' });
        return;
    }
    try {
        const comment = await modelComment.findById(_id);
        if (!comment) {
            res.status(404).json({ error: 'Comentario no encontrado' });
            return;
        }
        if (comment.likedBy && comment.likedBy.includes(uid_user_firebase)) {
            const index = comment.likedBy.indexOf(uid_user_firebase);
            comment.likedBy.splice(index, 1);
            comment.likes -= 1;
        }
        else {
            comment.likedBy && comment.likedBy.push(uid_user_firebase);
            comment.likes += 1;
            // Implemetaacion futura añadir correo al administrador por likes
            const note = {
                subject: `${comment.owner.displayName} has received a like`,
                username: comment.owner.displayName,
                note: comment.data,
                email_user: comment.owner.email,
            };
            // Avisamos al administrador de la web del nuevo like
            await submitLikeComment(note, originUrl, like_from);
        }
        const updatedComment = await comment.save();
        res.status(200).json(updatedComment);
    }
    catch (error) {
        handleServerError(res, error);
    }
});
// Editar comentarios
router.put('/edit/:id', log, verifyIdToken, async (req, res) => {
    const { id } = req.params;
    const { textEdit } = req.body;
    if (!textEdit) {
        res.status(400).json({ message: 'Missing content' });
        return;
    }
    try {
        const comment = await modelComment.findById(id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        comment.data = textEdit;
        await comment.save();
        res.status(200).json(comment);
    }
    catch (error) {
        handleServerError(res, error);
    }
});
// <--------------- DELETE --------------->
// Eliminar comentarios
router.delete('/del/:id', log, verifyIdToken, async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'Invalid publication ID' });
        return;
    }
    try {
        const fatherComment = await modelComment.findById(id);
        if (!fatherComment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        // Elimina los hijos del comentario
        if (fatherComment.answers && fatherComment.answers.length > 0)
            await deleteCommentAndChildren(fatherComment.answers);
        // Elimina el comentario principal
        await modelComment.findByIdAndDelete(id);
        res.status(204).send();
    }
    catch (error) {
        handleServerError(res, error);
    }
});
export { router };
