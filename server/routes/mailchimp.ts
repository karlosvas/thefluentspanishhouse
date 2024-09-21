import { type Request, type Response, Router } from "express";
import {
  listId,
  mailchimpErrors,
  mailchimp,
  addInterestToCategory,
  deleteInterestCategory,
  groupId,
} from "../lib/mailchimp/mailchimp.js";
import { log, verifyIdToken } from "../middelware/token-logs.js";
import { validateEmail } from "../utilities/validateEmail.js";
import { type Status } from "@mailchimp/mailchimp_marketing";
import {
  InterestCategoryResponse,
  type Member,
  type OptionsChampTag,
} from "types/types.js";
import crypto from "crypto";

const router = Router();

// <--------------- GET --------------->
// Obtener todos los miembros de una lista
router.get(
  "/getall/member",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    mailchimp.lists
      .getListMembersInfo(listId)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
      });
  }
);

// Obtener un miembro de la lista por email
router.get(
  "/getone/member/:email",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    const memberemail = req.params.email;
    const subscriberHash = crypto
      .createHash("md5")
      .update(memberemail)
      .digest("hex");

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
  }
);

// Obtener todos los grupos de categorias
router.get(
  "/groupscategory",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    console.log("listId", listId);
    mailchimp.lists
      .getListInterestCategories(listId)
      .then((response) => {
        res.status(200).json(response as InterestCategoryResponse);
      })
      .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
      });
  }
);

// Obtener los intereses de un grupo de categorias
router.get(
  "/get/interests",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    if (!groupId) return res.status(400).send("groupID is required");

    mailchimp.lists
      .listInterestCategoryInterests(listId, groupId.toString())
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
      });
  }
);

// <--------------- POST --------------->
// Añadir un miembro a la lista
router.post(
  "/add/member",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    const member: Member = req.body;

    if (!validateEmail(member.email_address))
      return res.status(400).send("Email inválido");

    mailchimp.lists
      .addListMember(listId, member)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
      });
  }
);

// Añadir varios miembros a la lista
router.post(
  "/add/batchcontact",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    const members: Member[] = req.body.member;

    // Usuario y etiquetas para añadir al usuario
    mailchimp.lists
      .batchListMembers(listId, {
        members,
        update_existing: true,
      })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
      });
  }
);

router.post(
  "/add/interests",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    const groupId = process.env.MAILCHIMP_GROUP_ID;
    const { name } = req.body;

    if (!groupId || !name)
      return res.status(400).send("Category ID and interest name are required");

    addInterestToCategory(groupId, name)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
      });
  }
);

// <--------------- PUT --------------->
// Actualizar el estado de un miembro de la lista
router.put(
  "/updatecontact/status/:email",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    const email: string = req.params.email;
    const status: Status = req.body.status;

    if (!validateEmail(email)) return res.status(400).send("Email inválido");

    const subscriberHash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

    mailchimp.lists
      .updateListMember(listId, subscriberHash, {
        status: status,
      })
      .then((response) => res.status(200).json(response))
      .catch((error) => {
        const parserError = mailchimpErrors(error);
        res.status(parserError.status).json(parserError);
      });
  }
);

// Añadir el tag de un miembro de la lista
router.put(
  "/updatecontact/tag/:email",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    const email: string = req.params.email;
    const newTag: OptionsChampTag = req.body.tag;

    console.log(newTag, email);

    if (!validateEmail(email)) return res.status(400).send("Email inválido");

    const subscriberHash = crypto.createHash("md5").update(email).digest("hex");

    await mailchimp.lists
      .updateListMemberTags(listId, subscriberHash, {
        tags: [{ name: newTag, status: "active" }],
      })
      .then((response) => res.status(200).json(response))
      .catch((error: unknown) => {
        const parserError = mailchimpErrors(error);
        res.status(parserError.status).json(parserError);
      });
  }
);

// <--------------- DEL --------------->
// Eliminar un miembro de la lista
router.delete(
  "/user/del/:email",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    // Obtenemos el email del usuario a eliminar desde la URL
    const email = req.params.email;
    const subscriberHash = crypto.createHash("md5").update(email).digest("hex");

    // Verificamos que el email sea válido
    if (!validateEmail(email)) return res.status(400).send("Invalid email");

    // Eliminamos al usuario de la lista, si no existe, se envía un error, si existe devuelbe null
    await mailchimp.lists
      .deleteListMember(listId, subscriberHash)
      .then(() => res.status(204).end())
      .catch((error) => {
        const parserError = mailchimpErrors(error);
        res.status(parserError.status).json(parserError);
      });
  }
);

// Eliminar un tag de un miembro de la lista
router.delete(
  "/tags/del/:email",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    // Obtenemos el email del usuario a eliminar desde la URL
    const email: string = req.params.email;
    const deleteTag: OptionsChampTag = req.body.tag;

    // Verificamos que el email sea válido
    if (!validateEmail(email)) return res.status(400).send("Invalid email");

    const subscriberHash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

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
  }
);

router.delete(
  "/del/interests/:idCategoty",
  log,
  verifyIdToken,
  async (req: Request, res: Response) => {
    const { idCategoty } = req.params;

    deleteInterestCategory(idCategoty)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(mailchimpErrors(error));
      });
  }
);

export { router };
