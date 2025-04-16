import { Router } from 'express';
import { modelComment, modelPublication } from '../src/mongodb/models.js';
import { isValidObjectId, Types } from 'mongoose';
import { handleServerError } from '../utilities/errorHandle.js';
import { log, verifyIdToken } from '../middelware/token-logs.js';
const router = Router();
// <--------------- GET --------------->
// Obtener la última publicación
router.get('/last', log, verifyIdToken, async (_req, res) => {
    try {
        const lastPublication = await modelPublication
            .findOne()
            .sort({ currentPage: -1 })
            .select('currentPage')
            .exec();
        if (!lastPublication) {
            res.status(404).json({ message: 'No posts available' });
            return;
        }
        res.status(200).json(lastPublication);
    }
    catch (error) {
        console.error('Error retrieving publication:', error);
        handleServerError(res, error);
    }
});
// Obtener publicaciones segun la página
router.get('/page/:page', log, verifyIdToken, async (req, res) => {
    const page = parseInt(req.params.page, 10);
    if (isNaN(page)) {
        res.status(400).json({ message: 'Invalid page number' });
        return;
    }
    try {
        const publications = await modelPublication.find({ currentPage: page });
        if (!publications) {
            res.status(404).json({ message: 'Publication not found' });
            return;
        }
        res.status(200).json(publications);
    }
    catch (error) {
        console.error('Error retrieving publication:', error);
        handleServerError(res, error);
    }
});
// Encontrar publicación por id del publication para entrar en la publicación selecionada
router.get('/:id', log, verifyIdToken, async (req, res) => {
    const { id } = req.params;
    try {
        if (!isValidObjectId(id)) {
            res.status(400).json({ message: 'Invalid publication ID' });
            return;
        }
        const publication = await modelPublication.findById(id);
        if (!publication) {
            res.status(404).json({ message: 'Publication not found' });
            return;
        }
        res.status(200).json(publication);
    }
    catch (error) {
        console.error('Error retrieving publication:', error);
        handleServerError(res, error);
    }
});
// <--------------- POST --------------->
// Añadir nuevas publicaciones
router.post('/new', log, verifyIdToken, async (req, res) => {
    const newPublication = req.body;
    try {
        // Validaciones
        if (!newPublication.title ||
            !newPublication.subtitle ||
            !newPublication.content) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        if (newPublication.base64_img &&
            !/^data:image\/[a-zA-Z]+;base64,/.test(newPublication.base64_img)) {
            res.status(400).json({ message: 'Invalid image format' });
            return;
        }
        // Crear una nueva tarjeta de blog
        const newCardBlog = new modelPublication({
            _id: new Types.ObjectId(),
            title: newPublication.title,
            subtitle: newPublication.subtitle,
            content: newPublication.content,
            base64_img: newPublication.base64_img,
            currentPage: newPublication.currentPage,
        });
        // Guardar el nuevo documento en la base de datos
        await newCardBlog.save();
        res.status(201).json(newCardBlog);
    }
    catch (error) {
        console.error('Error adding card blog:', error);
        handleServerError(res, error);
    }
});
// <--------------- PUT --------------->
// Editar publicaciones
router.put('/edit/:id', log, verifyIdToken, async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const publication = await modelPublication.findById(id);
        if (!publication) {
            res.status(404).json({ message: 'Publication not found' });
            return;
        }
        publication.title = updatedFields.title;
        publication.subtitle = updatedFields.subtitle;
        publication.content = updatedFields.content;
        await publication.save();
        res.status(200).json(publication);
    }
    catch (error) {
        console.error('Error updating publication:', error);
        handleServerError(res, error);
    }
});
// <--------------- DEL --------------->
// Eliminar publicaciones
router.delete('/del/:id', log, verifyIdToken, async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        res.status(400).json({ message: 'Invalid publication ID' });
        return;
    }
    try {
        const result = await modelPublication.findByIdAndDelete(id);
        await modelComment.deleteMany({ pattern_id: id });
        if (!result) {
            res.status(404).json({ message: 'Publication not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting publication:', error);
        handleServerError(res, error);
    }
});
export { router };
