import { Router } from "express";
import { modelComment, modelPublication } from "..//models.js";
import { isValidObjectId, Types } from "mongoose";
import { handleServerError } from "../utilities/errorHandle.js";
import { log, verifyIdToken } from "../middelware/token-logs.js";
const router = Router();
// <--------------- GET --------------->
// Obtener la última publicación
router.get("/last", log, verifyIdToken, async (req, res) => {
    try {
        const lastPublication = await modelPublication.findOne().sort({ currentPage: -1 }).select("currentPage").exec();
        if (!lastPublication)
            return res.status(404).json({ message: "Publication not found" });
        res.status(200).json(lastPublication);
        res.status(200);
    }
    catch (error) {
        console.error("Error retrieving publication:", error);
        handleServerError(res, error);
    }
});
// Obtener publicaciones segun la página
router.get("/page/:page", log, verifyIdToken, async (req, res) => {
    const page = parseInt(req.params.page, 10);
    if (isNaN(page)) {
        return res.status(400).json({ message: "Invalid page number" });
    }
    try {
        const publications = await modelPublication.find({ currentPage: page });
        if (!publications)
            return res.status(404).json({ message: "Publication not found" });
        res.status(200).json(publications);
    }
    catch (error) {
        console.error("Error retrieving publication:", error);
        handleServerError(res, error);
    }
});
// Encontrar publicación por id del publication para entrar en la publicación selecionada
router.get("/:id", log, verifyIdToken, async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id))
            return res.status(400).json({ message: "Invalid publication ID" });
        const publication = await modelPublication.findById(id);
        if (!publication)
            return res.status(404).json({ message: "Publication not found" });
        res.status(200).json(publication);
    }
    catch (error) {
        console.error("Error retrieving publication:", error);
        handleServerError(res, error);
    }
});
// <--------------- POST --------------->
// Añadir nuevas publicaciones
router.post("/new", log, verifyIdToken, async (req, res) => {
    try {
        const { title, subtitle, content, base64_img, currentPage } = req.body;
        // Validaciones
        if (!title || !subtitle || !content)
            return res.status(400).json({ message: "Missing required fields" });
        if (base64_img && !/^data:image\/[a-zA-Z]+;base64,/.test(base64_img))
            return res.status(400).json({ message: "Invalid image format" });
        // Crear una nueva tarjeta de blog
        const newCardBlog = new modelPublication({
            _id: new Types.ObjectId(),
            title,
            subtitle,
            content,
            base64_img,
            currentPage,
        });
        // Guardar el nuevo documento en la base de datos
        await newCardBlog.save();
        res.status(201).json(newCardBlog);
    }
    catch (error) {
        console.error("Error adding card blog:", error);
        handleServerError(res, error);
    }
});
// <--------------- PUT --------------->
// Editar publicaciones
router.put("/edit/:id", log, verifyIdToken, async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    try {
        const publication = await modelPublication.findById(id);
        if (!publication)
            return res.status(404).json({ message: "Publication not found" });
        publication.title = updatedFields.title;
        publication.subtitle = updatedFields.subtitle;
        publication.content = updatedFields.content;
        await publication.save();
        res.status(200).json(publication);
    }
    catch (error) {
        console.error("Error updating publication:", error);
        handleServerError(res, error);
    }
});
// <--------------- DEL --------------->
// Eliminar publicaciones
router.delete("/del/:id", log, verifyIdToken, async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id))
        return res.status(400).json({ message: "Invalid publication ID" });
    try {
        const result = await modelPublication.findByIdAndDelete(id);
        await modelComment.deleteMany({ pattern_id: id });
        if (!result)
            return res.status(404).json({ message: "Publication not found" });
        res.status(200).json({ message: "Publication deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting publication:", error);
        handleServerError(res, error);
    }
});
export { router };