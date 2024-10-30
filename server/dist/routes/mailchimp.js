import { Router } from "express";
import { listId, mailchimpErrors, mailchimp, addInterestToCategory, deleteInterestCategory, groupId, } from "../lib/mailchimp/mailchimp.js";
import { log, verifyIdToken } from "../middelware/token-logs.js";
import crypto from "crypto";
import { isErrorAxios } from "../utilities/axios-utils.js";
const router = Router();
// <--------------- GET --------------->
// Obtener todos los miembros de una lista
router.get("/getall/member", log, verifyIdToken, async (_req, res) => {
    mailchimp.lists
        .getListMembersInfo(listId)
        .then((response) => {
        res.status(200).json(response);
    })
        .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
    });
});
// Obtener un miembro de la lista por email
router.get("/getone/member/:email", log, verifyIdToken, async (req, res) => {
    const { email } = req.params;
    const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
    mailchimp.lists
        .getListMember(listId, subscriberHash)
        .then((response) => {
        res.status(200).json(response);
    })
        .catch((error) => {
        const parsedError = mailchimpErrors(error);
        res.status(parsedError.status).json(parsedError);
    });
});
// Obtener todos los grupos de categorias
router.get("/groupscategory", log, verifyIdToken, async (req, res) => {
    mailchimp.lists
        .getListInterestCategories(listId)
        .then((response) => {
        res.status(200).json({ response });
    })
        .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
    });
});
// Obtener el grupo de los intereses especificos
router.get("/get/interests", log, verifyIdToken, async (req, res) => {
    if (!groupId)
        return res.status(400).send("groupID is required");
    mailchimp.lists
        .listInterestCategoryInterests(listId, groupId)
        .then((response) => {
        res.status(200).json(response);
    })
        .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
    });
});
// <--------------- POST --------------->
// Añadir un miembro a la lista
router.post("/add/member", log, verifyIdToken, async (req, res) => {
    const member = req.body;
    mailchimp.lists
        .addListMember(listId, member)
        .then((response) => {
        res.status(201).json(response);
    })
        .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
    });
});
// Añadir varios miembros a la lista
router.post("/add/batchcontact", log, verifyIdToken, async (req, res) => {
    const members = req.body;
    // Usuario y etiquetas para añadir al usuario
    mailchimp.lists
        .batchListMembers(listId, {
        members,
        update_existing: true,
    })
        .then((response) => {
        res.status(201).json(response);
    })
        .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
    });
});
// Añadir el nuevo interés
router.post("/add/interests", log, verifyIdToken, async (req, res) => {
    const { name } = req.body;
    if (!groupId || !name)
        res.status(400).send("Category ID and interest name are required");
    try {
        const response = await addInterestToCategory(groupId, name);
        res.status(201).json(response);
    }
    catch (error) {
        if (isErrorAxios(error)) {
            res.status(error.status).json(error.message);
        }
        else {
            res.status(500).json(error);
        }
    }
});
// <--------------- PUT --------------->
// Actualizar el estado de un miembro de la lista
router.put("/updatecontact/status/:email", log, verifyIdToken, async (req, res) => {
    const { email } = req.params;
    const { status } = req.body;
    const subscriberHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
    mailchimp.lists
        .updateListMember(listId, subscriberHash, {
        status: status,
    })
        .then((response) => res.status(200).json(response))
        .catch((error) => {
        const parserError = mailchimpErrors(error);
        res.status(parserError.status).json(parserError);
    });
});
// Añadir el tag de un miembro de la lista
router.put("/updatecontact/tag/:email", log, verifyIdToken, async (req, res) => {
    const { email } = req.params;
    const { tag } = req.body;
    const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
    await mailchimp.lists
        .updateListMemberTags(listId, subscriberHash, {
        tags: [{ name: tag, status: "active" }],
    })
        .then((response) => res.status(200).json(response))
        .catch((error) => {
        const parserError = mailchimpErrors(error);
        res.status(parserError.status).json(parserError);
    });
});
// <--------------- DEL --------------->
// Eliminar un miembro de la lista
router.delete("/del/member/:email", log, verifyIdToken, async (req, res) => {
    // Obtenemos el email del usuario a eliminar desde la URL
    const { email } = req.params;
    const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
    // Eliminamos al usuario de la lista, si no existe, se envía un error, si existe devuelbe null
    await mailchimp.lists
        .deleteListMember(listId, subscriberHash)
        .then(() => res.status(204).end())
        .catch((error) => {
        const parserError = mailchimpErrors(error);
        res.status(parserError.status).json(parserError);
    });
});
// Eliminar un tag de un miembro de la lista
router.delete("/del/tag/:email", log, verifyIdToken, async (req, res) => {
    // Obtenemos el email del usuario a eliminar desde la URL
    const { email } = req.params;
    const { tag } = req.body;
    const subscriberHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
    // Eliminamos el tag de la lista, si no existe, se envía un error, si existe devuelve null
    await mailchimp.lists
        .updateListMemberTags(listId, subscriberHash, {
        tags: [{ name: tag, status: "inactive" }],
    })
        .then(() => res.status(204).end())
        .catch((error) => {
        const parserError = mailchimpErrors(error);
        res.status(parserError.status).json(parserError);
    });
});
// Eliminar un interes de una categoria
router.delete("/del/interests/:id", log, verifyIdToken, async (req, res) => {
    const { id } = req.params;
    try {
        await deleteInterestCategory(id);
        res.status(204).end();
    }
    catch (error) {
        if (isErrorAxios(error))
            res.status(error.status).json(error.message);
        else
            res.status(500).json(error);
    }
});
export { router };
