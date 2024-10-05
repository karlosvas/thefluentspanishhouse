import { Router } from "express";
import { listId, mailchimpErrors, mailchimp, addInterestToCategory, deleteInterestCategory, groupId, } from "../lib/mailchimp/mailchimp.js";
import { log, verifyIdToken } from "../middelware/token-logs.js";
import { validateEmail } from "../utilities/validateEmail.js";
import crypto from "crypto";
const router = Router();
// <--------------- GET --------------->
// Obtener todos los miembros de una lista
router.get("/getall/member", log, verifyIdToken, async (req, res) => {
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
    const memberemail = req.params.email;
    const subscriberHash = crypto.createHash("md5").update(memberemail).digest("hex");
    if (!validateEmail(memberemail))
        return res.status(400).send("Email inválido");
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
    if (!validateEmail(member.email_address))
        return res.status(400).send("Email inválido");
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
router.post("/add/interests", log, verifyIdToken, async (req, res) => {
    const { name } = req.body;
    if (!groupId || !name)
        return res.status(400).send("Category ID and interest name are required");
    try {
        // Verificar si el interés ya existe
        const existingInterests = await mailchimp.lists.listInterestCategoryInterests(listId, groupId);
        if ("interests" in existingInterests) {
            const interestExists = existingInterests.interests.some((interest) => interest.name === name);
            if (interestExists) {
                return res.status(200).send(`Interest "${name}" already exists.`);
            }
        }
        else {
            return res.status(500).send("Failed to retrieve interests.");
        }
        // Añadir el nuevo interés
        const response = await addInterestToCategory(groupId, name);
        res.status(201).json(response);
    }
    catch (error) {
        const parserError = mailchimpErrors(error);
        res.status(parserError.status).json(parserError);
    }
});
// <--------------- PUT --------------->
// Actualizar el estado de un miembro de la lista
router.put("/updatecontact/status/:email", log, verifyIdToken, async (req, res) => {
    const email = req.params.email;
    const status = req.body.status;
    if (!validateEmail(email))
        return res.status(400).send("Email inválido");
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
    const email = req.params.email;
    const tag = req.body.tag;
    if (!validateEmail(email))
        return res.status(400).send("Email inválido");
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
router.delete("/user/del/:email", log, verifyIdToken, async (req, res) => {
    // Obtenemos el email del usuario a eliminar desde la URL
    const email = req.params.email;
    const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
    // Verificamos que el email sea válido
    if (!validateEmail(email))
        return res.status(400).send("Invalid email");
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
router.delete("/tags/del/:email", log, verifyIdToken, async (req, res) => {
    // Obtenemos el email del usuario a eliminar desde la URL
    const email = req.params.email;
    const tag = req.body.tag;
    // Verificamos que el email sea válido
    if (!validateEmail(email))
        return res.status(400).send("Invalid email");
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
router.delete("/del/interests/:idCategoty", log, verifyIdToken, async (req, res) => {
    const { idCategoty } = req.params;
    deleteInterestCategory(idCategoty)
        .then((response) => {
        res.status(204).json(response);
    })
        .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
    });
});
export { router };
