import { Status } from "@mailchimp/mailchimp_marketing";
import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { InterestCategoryResponse, InterestResponse, Member, OptionsChampTag } from "types/types";
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

  let group: InterestResponse;
  test("/get/interests obtener los intereses de un grupo de categorias", async ({ page }) => {
    const responseMember = await page.goto(`/mailchimp/get/interests`);
    expect(responseMember?.status()).toBe(200);

    const data = await responseMember?.json();
    expect(data).toBeDefined();

    group = data;
  });

  //####################### POST #######################
  test("/add/member añadir un miembro", async ({ page }) => {
    const member: Member = {
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

    const responseNewMember = await page.request.post(`mailchimp/add/member`, {
      data: member,
    });
    expect(responseNewMember?.status()).toBe(201);
    const data = await responseNewMember?.json();
    expect(data).toBeDefined();
  });

  //####################### GET #######################
  test("/getone/member/:email obtener un miembro de una lista", async ({ page }) => {
    const responseMember = await page.goto(`/mailchimp/getone/member/${testEmail}`);
    expect(responseMember?.status()).toBe(200);

    const data = await responseMember?.json();
    expect(data).toBeDefined();
  });

  //####################### POST #######################
  test("/add/batchcontact añadir varios miembros a la lista (opcional)", async ({ page }) => {
    const members: Member[] = [
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

  let idCategory = "";
  test("/add/interests añadir intereses", async ({ page }) => {
    const name = {
      name: "testing",
    };
    const responseNewInterests = await page.request.post(`mailchimp/add/interests`, {
      data: name,
    });
    const status = responseNewInterests?.status();
    expect([200, 201]).toContain(status);
    if (status == 201) {
      const data = await responseNewInterests?.json();
      expect(data).toBeDefined();
      idCategory = data.id;
    }
  });

  //####################### PUT #######################
  test("/updatecontact/status/:email editar esatdo de un usuario por email", async ({ page }) => {
    const status: Status = "transactional";
    const responseStatus = await page.request.put(`/mailchimp/updatecontact/status/${testEmail}`, {
      data: { status },
    });
    expect(responseStatus?.status()).toBe(200);
    const data = await responseStatus?.json();
    expect(data).toBeDefined();
  });

  test("/updatecontact/tag/:email editar tag de un usuario por email", async ({ page }) => {
    const tag: OptionsChampTag = "FREE_CLASS";
    const responseTag = await page.request.put(`/mailchimp/updatecontact/tag/${testEmail}`, {
      data: { tag },
    });
    expect(responseTag?.status()).toBe(200);
    const data = await responseTag?.json();
    expect(data).toBeDefined();
  });

  //####################### DELETE #######################

  test("/tags/del/:email eliminar el tag de una user", async ({ page }) => {
    const tag: OptionsChampTag = "FREE_CLASS";
    const responseDelTag = await page.request.delete(`/mailchimp/tags/del/${testEmail}`, {
      data: { tag },
    });
    expect(responseDelTag?.status()).toBe(204);
  });

  test("/del/interests/:idCategoty eliminar intereses de una categoria", async ({ page }) => {
    // Se a creado un interes por lo que podemos elimiinarlo
    if (idCategory != "") {
      const responseInterests = await page.request.delete(`/mailchimp/del/interests/${idCategory}`);
      expect(responseInterests?.status()).toBe(204);
    } else {
      // No se ha creado un interes por que ya existia
      let id_testing;
      for (let i = 0; i < group.total_items; i++) {
        const { name, id } = group.interests[i];
        if (name == "testing") {
          id_testing = id;
          break;
        }
      }
      const responseInterests = await page.request.delete(`/mailchimp/del/interests/${id_testing}`);
      expect(responseInterests?.status()).toBe(204);
    }
  });

  test("/del/:id eliminar el tag del miembro de una lista", async ({ page }) => {
    const responseDelTag = await page.request.delete(`/mailchimp/tags/del/${testEmail}`, {
      data: { tag: "FREE_CLASS" },
    });
    expect(responseDelTag?.status()).toBe(204);
  });

  test("/user/del/:email eliminar intereses de una categoria", async ({ page }) => {
    const responseUser = await page.request.delete(`/mailchimp/user/del/${testEmail}`);
    expect(responseUser?.status()).toBe(204);
    const responseUser1 = await page.request.delete(`/mailchimp/user/del/testing1@gmail.com`);
    expect(responseUser1?.status()).toBe(204);
    const responseUser2 = await page.request.delete(`/mailchimp/user/del/testing2@gmail.com`);
    expect(responseUser2?.status()).toBe(204);
  });
});
