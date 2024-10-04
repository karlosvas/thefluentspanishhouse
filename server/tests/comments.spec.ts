import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { Types } from "mongoose";
dotenv.config();

//####################### GET #######################
// Test para obtener todos los comentarios
test("/comments/all obtener todos los comentarios", async ({ page }) => {
  const responseAll = await page.goto("http://127.0.0.1:8080/comments/all");
  expect(responseAll?.status()).toBe(200);

  const allComments = await responseAll?.json();
  expect(allComments).toBeDefined();
  expect(allComments.length).toBeGreaterThan(0);
});

// Test para obtener un comentario por ID
test("/comments/:id obtener por id", async ({ page }) => {
  const responseAll = await page.goto("http://127.0.0.1:8080/comments/all");
  expect(responseAll?.status()).toBe(200);

  const allComments = await responseAll?.json();
  expect(allComments).toBeDefined();
  expect(allComments.length).toBeGreaterThan(0);

  if (allComments.length > 0) {
    const responseID = await page.goto(
      `http://127.0.0.1:8080/comments/${allComments[0]._id}`
    );
    expect(responseID?.status()).toBe(200);
  } else {
    console.warn("allComments está vacío");
  }
});

// Test para obtener los hijos de un comentario por ID
test("comments/children/:id obtener por id los hijos", async ({ page }) => {
  const responseAll = await page.goto("http://127.0.0.1:8080/comments/all");
  expect(responseAll?.status()).toBe(200);

  const allComments = await responseAll?.json();
  expect(allComments).toBeDefined();
  expect(allComments.length).toBeGreaterThan(0);

  if (allComments.length > 0) {
    const responseChildren = await page.goto(
      `http://127.0.0.1:8080/comments/children/${allComments[0]._id}`
    );
    expect(responseChildren?.status()).toBe(200);
  } else {
    console.warn("allComments está vacío");
  }
});

//####################### POST, PUT, DELETE #######################
test("/comments/new agregar nuevo comentario, /comments/del/:id eliminarlo", async ({
  page,
}) => {
  // Cremos un comentario padre
  const originUrl =
    "https://thefluentspanishhouse.com/publication/66d4e739b705f46a0a395947";
  const fatherID = new Types.ObjectId().toString();
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
  const responsePost = await page.request.post(
    "http://127.0.0.1:8080/comments/new",
    {
      data: {
        ...newComment,
        originUrl,
      },
    }
  );
  expect(responsePost.status()).toBe(201);
  const fatherComment = await responsePost.json();

  // Eliminar el comentario padre
  const responseDel = await page.request.delete(
    `http://127.0.0.1:8080/comments/del/${fatherComment._id}`
  );
  expect(responseDel.status()).toBe(204);
  const response = await responseDel.json();
  console.log(response);
});
