import { Status } from "@mailchimp/mailchimp_marketing";
import { test, expect } from "@playwright/test";
import { InterestResponse, Member, OptionsChampTag } from "types/types";

//####################### GET #######################
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

test.describe.serial("Mailchimp tests", () => {
  const testEmail = "testing@gmail.com";

  // Intereses del grupo actual (Pensado para un unico grupo)
  let group: InterestResponse;
  test("/get/interests obtener los intereses de un grupo de categorias", async ({ page }) => {
    const responseMember = await page.goto(`/mailchimp/get/interests`);
    expect(responseMember?.status()).toBe(200);

    const data = await responseMember?.json();
    expect(data).toBeDefined();

    group = data;
  });

  //####################### POST #######################
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

  test("/add/member añadir un miembro", async ({ page }) => {
    let responseNewMember = await page.request.post(`mailchimp/add/member`, {
      data: member,
    });

    const data = await responseNewMember?.json();

    if (data.title === "Member Exists") {
      // Si el miembro ya existe, no se puede añadir
      expect(data.title).toContain(`Member Exists`);
    } else {
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
    const copyMember1: Member = { ...member };
    copyMember1.email_address = "testing1@gmail.com";
    const copyMember2: Member = { ...member };
    copyMember2.email_address = "testing2@gmail.com";

    const members: Member[] = [copyMember1, copyMember2];

    const responseNewMembers = await page.request.post(`/mailchimp/add/batchcontact`, {
      data: members,
    });
    expect(responseNewMembers?.status()).toBe(201);
    const data = await responseNewMembers?.json();
    expect(data).toBeDefined();
  });

  // Id del interes creado en el test
  let idInterest: string = "";
  test("/add/interests añadir intereses", async ({ page }) => {
    const name = "testing";

    const responseNewInterests = await page.request.post(`mailchimp/add/interests`, {
      data: { name },
    });

    const data = await responseNewInterests?.json();

    if (data.detail && data.detail == `Cannot add "${name}" because it already exists on the list.`) {
      // Si el interés ya existe, no se puede añadir asique lo buscamos
      const responseAllInterests = await page.request.get(`/mailchimp/get/interests`);

      const dataInterest = await responseAllInterests?.json();
      const element = dataInterest.interests.find((element: any) => element.name == name);
      if (element) idInterest = element.id;

      expect(responseAllInterests?.status()).toBe(200);
    } else {
      expect(responseNewInterests?.status()).toBe(201);
      const data = await responseNewInterests?.json();
      idInterest = data.id;
    }
  });

  //####################### PUT #######################
  test("/updatecontact/status/:email editar estado de un usuario por email", async ({ page }) => {
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

  test("/del/interests/:id eliminar intereses de una categoria", async ({ page }) => {
    // Verificamos si existe el interes de testing y obtenemos su id
    if (idInterest == "") console.warn("Dont exist the interest testing");
    else {
      const responseInterests = await page.request.delete(`/mailchimp/del/interests/${idInterest}`);
      expect(responseInterests?.status()).toBe(204);
    }
  });

  test("/del/tag/:email eliminar tag de un miembro", async ({ page }) => {
    const tag: OptionsChampTag = "FREE_CLASS";
    const responseDelTag = await page.request.delete(`/mailchimp/del/tag/${testEmail}`, {
      data: { tag },
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
