import { test, expect } from "@playwright/test";
//####################### POST #######################
test("/note enviar email de la nota de contact", async ({ page }) => {
    let newNote = {
        email_user: "carlosrvasquezsanchez@gmail.com",
        username: "Test",
        subject: "Test",
        note: "Test",
    };
    // Enviamos un email de la nota de contacto a admin
    const responseNewComment = await page.request.post("/mandrill/note", {
        data: newNote,
    });
    expect(responseNewComment.status()).toBe(201);
    const data = await responseNewComment.json();
    expect(data).toBeDefined();
});
test("/newstudent enviar email de neuvo estudiante", async ({ page }) => {
    let newSubcriber = {
        email: "carlosrvasquezsanchez@gmail.com",
        name: "Test",
        lastname: "Test",
        class: "FREE_CLASS",
        consentEmails: true,
        acceptTerms: true,
        acceptPrivacy: true,
    };
    // Enviamos un email de la nota de nuevo estudiante a admin
    const responseNewComment = await page.request.post("/mandrill/newstudent", {
        data: newSubcriber,
    });
    expect(responseNewComment.status()).toBe(201);
    const data = await responseNewComment.json();
    expect(data).toBeDefined();
});
