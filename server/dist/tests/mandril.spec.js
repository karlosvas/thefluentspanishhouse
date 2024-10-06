import { test, expect } from "@playwright/test";
//####################### POST #######################
test("/note enviar email de la nota de contact", async ({ page }) => {
    let newNote = {
        email_user: "carlosrvasquezsanchez@gmail.com",
        username: "Carlos",
        subject: "Test",
        note: "Test",
    };
    // Cremos un comentario padre
    const responseNewComment = await page.request.post("/mandrill/note", {
        data: newNote,
    });
    expect(responseNewComment.status()).toBe(201);
});
test("/newstudent enviar email de neuvo estudiante", async ({ page }) => {
    let newSubcriber = {
        email: "carlosrvasquezsanchez@gmail.com",
        name: "Carlos",
        lastname: "Vasquez",
        class: "FREE_CLASS",
        consentEmails: false,
        acceptTerms: false,
        acceptPrivacy: false,
    };
    // Cremos un comentario padre
    const responseNewComment = await page.request.post("/mandrill/newstudent", {
        data: newSubcriber,
    });
    expect(responseNewComment.status()).toBe(201);
});
