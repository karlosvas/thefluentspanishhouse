import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
//####################### GET #######################
test.describe.serial("Mailchimp tests", () => {
    const testEmail = "testing@gmail.com";
    test("/getall/member obtener todos los miembros de una lista", async ({ page }) => {
        const responseMembersList = await page.goto(`mailchimp/getall/member`);
        expect(responseMembersList?.status()).toBe(200);
        const data = await responseMembersList?.json();
        expect(data).toBeDefined();
    });
    test("/groupscategory obtener todos los grupos de categorias", async ({ page }) => {
        const responseMember = await page.goto(`/mailchimp/groupscategory`);
        expect(responseMember?.status()).toBe(200);
        const data = await responseMember?.json();
        expect(data).toBeDefined();
    });
    let group;
    test("/get/interests obtener los intereses de un grupo de categorias", async ({ page }) => {
        const responseMember = await page.goto(`/mailchimp/get/interests`);
        expect(responseMember?.status()).toBe(200);
        const data = await responseMember?.json();
        expect(data).toBeDefined();
        group = data;
    });
    //####################### POST #######################
    test("/add/member añadir un miembro", async ({ page }) => {
        const member = {
            email_address: `${testEmail}`,
            status: "transactional",
            email_type: "html",
            merge_fields: {
                FNAME: "testing",
                LNAME: "testinglastname",
            },
            interests: {},
            tags: [],
            status_if_new: "transactional",
        };
        let responseNewMember = await page.request.post(`mailchimp/add/member`, {
            data: member,
        });
        const data = await responseNewMember?.json();
        if (data.title === "Member Exists") {
            // Si el miembro ya existe, no se puede añadir
            expect(data.title).toContain(`Member Exists`);
        }
        else {
            expect(responseNewMember?.status()).toBe(201);
            expect(data).toBeDefined();
        }
    });
    //####################### GET #######################
    test("/getone/member/:email obtener un miembro", async ({ page }) => {
        const responseMember = await page.goto(`/mailchimp/getone/member/${testEmail}`);
        expect(responseMember?.status()).toBe(200);
        const data = await responseMember?.json();
        expect(data).toBeDefined();
    });
    //####################### POST #######################
    test("/add/batchcontact añadir varios miembros a la lista (opcional)", async ({ page }) => {
        const members = [
            {
                email_address: "testing1@gmail.com",
                status: "transactional",
                email_type: "html",
                merge_fields: {
                    FNAME: "testing1",
                    LNAME: "testing1lastname",
                },
                interests: {},
                tags: [],
                status_if_new: "transactional",
            },
            {
                email_address: "testing2@gmail.com",
                status: "transactional",
                email_type: "html",
                merge_fields: {
                    FNAME: "testing2",
                    LNAME: "testing2lastname",
                },
                interests: {},
                tags: [],
                status_if_new: "transactional",
            },
        ];
        const responseNewMembers = await page.request.post(`/mailchimp/add/batchcontact`, {
            data: members,
        });
        expect(responseNewMembers?.status()).toBe(201);
        const data = await responseNewMembers?.json();
        expect(data).toBeDefined();
    });
    test("/add/interests añadir intereses", async ({ page }) => {
        const name = "testing";
        const responseNewInterests = await page.request.post(`mailchimp/add/interests`, {
            data: name,
            headers: {
                "Content-Type": "text/plain",
            },
        });
        const data = await responseNewInterests?.json();
        const status = responseNewInterests?.status();
        if (data.detail && data.detail.includes(`Cannot add "${name}" because it already exists on the list.`)) {
            // Si el interés ya existe, no se puede añadir
            expect(data.detail).toContain("because it already exists on the list");
        }
        else {
            // La api de mailchimp no devuelbe nada
            expect(status).toBe(201);
        }
    });
    //####################### PUT #######################
    test("/updatecontact/status/:email editar esatdo de un usuario por email", async ({ page }) => {
        const status = "transactional";
        const responseStatus = await page.request.put(`/mailchimp/updatecontact/status/${testEmail}`, {
            data: status,
            headers: {
                "Content-Type": "text/plain",
            },
        });
        expect(responseStatus?.status()).toBe(200);
        const data = await responseStatus?.json();
        expect(data).toBeDefined();
    });
    test("/updatecontact/tag/:email editar tag de un usuario por email", async ({ page }) => {
        const tag = "FREE_CLASS";
        const responseTag = await page.request.put(`/mailchimp/updatecontact/tag/${testEmail}`, {
            data: tag,
            headers: {
                "Content-Type": "text/plain",
            },
        });
        expect(responseTag?.status()).toBe(200);
        const data = await responseTag?.json();
        expect(data).toBeDefined();
    });
    //####################### DELETE #######################
    test("/del/interests/:idCategoty eliminar intereses de una categoria", async ({ page }) => {
        // Verificamos si existe el interes de testing y obtenemos su id
        let id_testing = "";
        for (let i = 0; i < group.total_items; i++) {
            const { name, id } = group.interests[i];
            if (name == "testing") {
                id_testing = id;
                break;
            }
        }
        if (id_testing != "") {
            const responseInterests = await page.request.delete(`/mailchimp/del/interests/${id_testing}`);
            expect(responseInterests?.status()).toBe(204);
        }
        else {
            expect(id_testing).toBe("");
        }
    });
    test("/del/tag/:email eliminar tag de un miembro", async ({ page }) => {
        const tag = "FREE_CLASS";
        const responseDelTag = await page.request.delete(`/mailchimp/del/tag/${testEmail}`, {
            data: tag,
            headers: {
                "Content-Type": "text/plain",
            },
        });
        expect(responseDelTag?.status()).toBe(204);
    });
    test("/del/user/:email eliminar usuarios", async ({ page }) => {
        const responseUser = await page.request.delete(`/mailchimp/del/user/${testEmail}`);
        expect(responseUser?.status()).toBe(204);
        const responseUser1 = await page.request.delete(`/mailchimp/del/user/testing1@gmail.com`);
        expect(responseUser1?.status()).toBe(204);
        const responseUser2 = await page.request.delete(`/mailchimp/del/user/testing2@gmail.com`);
        expect(responseUser2?.status()).toBe(204);
    });
});
