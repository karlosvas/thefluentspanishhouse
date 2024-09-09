import { Router } from "express";
import { listId, mailchimpErrors, mailchimp } from "../lib/mailchimp/mailchimp.js";
import { log, verifyIdToken } from "../middelware/token-logs.js";
import { validateEmail } from "../utilities/validateEmail.js";
import crypto from "crypto";
import { submitEmalSuscriber } from "../lib/mandrill/mandrill.js";
const router = Router();
// <--------------- GET --------------->
// Obtener todos los miembros de una lista
router.get("/", log, verifyIdToken, async (req, res) => {
    try {
        const response = await mailchimp.ping.get();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json(mailchimpErrors(error));
    }
});
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
router.get("/category", log, verifyIdToken, async (req, res) => {
    mailchimp.lists
        .getListInterestCategories(listId)
        .then((response) => {
        res.status(200).json(response);
    })
        .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
    });
});
router.get("/interests/:idCategory", log, verifyIdToken, async (req, res) => {
    const { idCategory } = req.params;
    if (!idCategory)
        return res.status(400).send("Category ID is required");
    mailchimp.lists
        .listInterestCategoryInterests(listId, idCategory.toString())
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
    try {
        console.log(member);
        // Añadimos el usuario a Mailchimp
        const response = await mailchimp.lists.addListMember(listId, member);
        // Enviamos un email al administrador
        const email = await submitEmalSuscriber(member.email_address, member.merge_fields.FNAME, member.merge_fields.LNAME, member.tags[member.tags.length - 1]);
        res.status(200).json({ response, email });
    }
    catch (error) {
        res.status(500).json(mailchimpErrors(error));
    }
});
// Añadir varios miembros a la lista
router.post("/add/batchcontact", log, verifyIdToken, async (req, res) => {
    const members = req.body.member;
    try {
        // Usuario y etiquetas para añadir al usuario
        const response = await mailchimp.lists.batchListMembers(listId, {
            members,
            update_existing: true,
        });
        members.forEach(async (member) => {
            await submitEmalSuscriber(member.email_address, member.merge_fields.FNAME, member.merge_fields.LNAME, member.tags[member.tags.length - 1]);
        });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json(mailchimpErrors(error));
    }
});
// <--------------- PUT --------------->
// Actualizar el estado de un miembro de la lista
router.put("/updatecontact/status/:email", log, verifyIdToken, async (req, res) => {
    const email = req.params.email;
    const status = req.body.status;
    if (!validateEmail(email))
        return res.status(400).send("Email inválido");
    try {
        const subscriberHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
        const response = await mailchimp.lists.updateListMember(listId, subscriberHash, {
            status: status,
        });
        res.status(200).json(response);
    }
    catch (error) {
        const parserError = mailchimpErrors(error);
        res.status(parserError.status).json(parserError);
    }
});
// Añadir el tag de un miembro de la lista
router.put("/updatecontact/tag/:email", log, verifyIdToken, async (req, res) => {
    const email = req.params.email;
    const newTag = req.body.tag;
    console.log(newTag, email);
    if (!validateEmail(email))
        return res.status(400).send("Email inválido");
    const subscriberHash = crypto.createHash("md5").update(email).digest("hex");
    await mailchimp.lists
        .updateListMemberTags(listId, subscriberHash, {
        tags: [{ name: newTag, status: "active" }],
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
    const deleteTag = req.body.tag;
    // Verificamos que el email sea válido
    if (!validateEmail(email))
        return res.status(400).send("Invalid email");
    const subscriberHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
    // Eliminamos el tag de la lista, si no existe, se envía un error, si existe devuelve null
    await mailchimp.lists
        .updateListMemberTags(listId, subscriberHash, {
        tags: [{ name: deleteTag, status: "inactive" }],
    })
        .then(() => res.status(204).end())
        .catch((error) => {
        const parserError = mailchimpErrors(error);
        res.status(parserError.status).json(parserError);
    });
});
export { router };
