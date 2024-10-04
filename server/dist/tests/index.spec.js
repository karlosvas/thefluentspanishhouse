import { test, expect } from "@playwright/test";
test("La ruta raíz devuelve el mensaje esperado", async ({ page }) => {
    // Navegar a la página principal
    await page.goto("http://127.0.0.1:8080/");
    // Verificar que el contenido de la página sea el esperado
    const content = await page.textContent("body");
    expect(content).toBe("Welcome to thefluentespnaishouse server");
});
