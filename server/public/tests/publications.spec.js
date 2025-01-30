import { test, expect } from '@playwright/test';
import { Types } from 'mongoose';
//####################### GET #######################
test('/last obtener la última publicacion', async ({ page }) => {
    const responseLast = await page.goto(`/publications/last`);
    expect(responseLast?.status()).toBe(200);
    const data = await responseLast?.json();
    expect(data).toBeDefined();
});
test('/page/:page obtener publicaciones por página', async ({ page }) => {
    const responseLast = await page.goto(`/publications/page/1`);
    expect(responseLast?.status()).toBe(200);
    const data = await responseLast?.json();
    expect(data).toBeDefined();
});
test.describe.serial('Comment tests', () => {
    //####################### POST #######################
    let id_publication;
    const newPublication = {
        _id: new Types.ObjectId(),
        title: 'Test',
        subtitle: 'Test',
        content: 'Test',
        base64_img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABjElEQVR42mNkAAYy',
        currentPage: 1,
    };
    test('/new añadir publicaciones', async ({ page }) => {
        const responseNewPublication = await page.request.post(`/publications/new`, {
            data: newPublication,
        });
        expect(responseNewPublication?.status()).toBe(201);
        const data = await responseNewPublication?.json();
        expect(data).toBeDefined();
        // La .id cambia en el servidor, por lo que se debe cambiar
        id_publication = data._id;
    });
    //####################### GET #######################
    test('/:id obtener publicaciones por id', async ({ page }) => {
        const responseID = await page.goto(`/publications/${id_publication}`);
        expect(responseID?.status()).toBe(200);
        const data = await responseID?.json();
        expect(data).toBeDefined();
    });
    //####################### PUT #######################
    test('/edit/:id editar publicaciones por id', async ({ page }) => {
        const updateFields = {
            ...newPublication,
        };
        updateFields.title = 'Title edited';
        const responseID = await page.request.put(`/publications/edit/${id_publication}`, {
            data: updateFields,
        });
        expect(responseID?.status()).toBe(200);
        const data = await responseID?.json();
        expect(data).toBeDefined();
    });
    //####################### DELETE #######################
    test('/del/:id eliminar publicaciones por id', async ({ page }) => {
        const responseID = await page.request.delete(`/publications/del/${id_publication}`);
        expect(responseID?.status()).toBe(204);
    });
});
