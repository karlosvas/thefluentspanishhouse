import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { Types } from "mongoose";
dotenv.config();
//####################### GET #######################
test("/comments/all obtener todos los comentarios", async ({ page }) => {
    const responseAll = await page.goto("/comments/all");
    expect(responseAll?.status()).toBe(200);
    const allComments = await responseAll?.json();
    expect(allComments).toBeDefined();
});
test("/comments/:id obtener por id", async ({ page }) => {
    const responseAll = await page.goto("/comments/all");
    expect(responseAll?.status()).toBe(200);
    const allComments = await responseAll?.json();
    expect(allComments).toBeDefined();
    if (allComments.length > 0) {
        // Si existe algun comentario se obtiene el primer comentario
        const responseID = await page.goto(`/comments/${allComments[0]._id}`);
        expect(responseID?.status()).toBe(200);
    }
    else {
        // Se espera que esté vacio, lo que indica que no hay comentarios por lo que el test pasa correctamente
        console.warn("allComments está vacío");
        expect(allComments.length).toBe(0);
    }
});
test("comments/children/:id obtener por id los hijos", async ({ page }) => {
    const responseAll = await page.goto("/comments/all");
    expect(responseAll?.status()).toBe(200);
    const allComments = await responseAll?.json();
    expect(allComments).toBeDefined();
    if (allComments.length > 0) {
        // Si existe algun comentario se obtiene el primer comentario
        const responseChildren = await page.goto(`/comments/children/${allComments[0]._id}`);
        expect(responseChildren?.status()).toBe(200);
    }
    else {
        // Se espera que esté vacio, lo que indica que no hay comentarios por lo que el test pasa correctamente
        console.warn("allComments está vacío");
        expect(allComments.length).toBe(0);
    }
});
test.describe.serial("Comment tests", () => {
    let createdCommentId;
    const originUrl = "https://thefluentspanishhouse.com/publication/66d4e739b705f46a0a395947";
    const fatherID = new Types.ObjectId().toString();
    const requestBody = {
        uid_user_firebase: "user_firebase_123",
        _id: "",
        likes: 0,
        originUrl,
    };
    //####################### POST #######################
    test("/comments/new agregar nuevo comentario", async ({ page }) => {
        const newComment = {
            _id: fatherID,
            pattern_id: "66d4e739b705f46a0a395947",
            owner: {
                uid: "user123",
                displayName: "John Doe",
                email: "john.doe@example.com",
                photoURL: "http://example.com/photo.jpg",
            },
            data: "Este es un nuevo comentario",
            likes: 0,
            likedBy: [],
            answers: [],
        };
        // Cremos un comentario padre
        const responseNewComment = await page.request.post("/comments/new", {
            data: { ...newComment, originUrl },
        });
        expect(responseNewComment.status()).toBe(201);
        // Almaecenamos la id del comentario creado
        const fatherComment = await responseNewComment.json();
        createdCommentId = fatherComment._id;
        requestBody._id = fatherComment._id;
    });
    //####################### PUT #######################
    test("/comments/edit/:id editar nuevo comentario", async ({ page }) => {
        const textEdit = "Este es un comentario editado";
        // Cremos un comentario padre
        const responsePost = await page.request.put(`/comments/edit/${createdCommentId}`, {
            data: textEdit,
            headers: {
                "Content-Type": "text/plain",
            },
        });
        expect(responsePost.status()).toBe(200);
    });
    test("/likes add", async ({ page }) => {
        const responseLike = await page.request.put(`/comments/likes`, {
            data: requestBody,
        });
        expect(responseLike.status()).toBe(200);
        const updatedComment = await responseLike.json();
        expect(updatedComment.likes).toBe(1);
    });
    test("/likes del", async ({ page }) => {
        const newRequestBody = { ...requestBody };
        newRequestBody.likes = 1;
        const responseDislike = await page.request.put(`/comments/likes`, {
            data: newRequestBody,
        });
        expect(responseDislike.status()).toBe(200);
        const newUpdatedComment = await responseDislike.json();
        expect(newUpdatedComment.likes).toBe(0);
    });
    //####################### DELETE #######################
    test("/comments/del/:id eliminar comentario", async ({ page }) => {
        if (!createdCommentId)
            throw new Error("No comment ID available to delete");
        const responseDel = await page.request.delete(`/comments/del/${createdCommentId}`);
        expect(responseDel.status()).toBe(204);
    });
});
