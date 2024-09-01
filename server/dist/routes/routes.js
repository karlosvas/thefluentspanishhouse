import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PATH_ROUTER = __dirname;
const cleanExtension = (file) => file.split(".")[0];
const router = Router();
readdirSync(PATH_ROUTER).forEach((file) => {
    const fileClean = cleanExtension(file);
    if (fileClean !== "index") {
        console.log(`Adding route /${fileClean}`);
        const modulePath = path.join(PATH_ROUTER, `${fileClean}.js`);
        import(modulePath)
            .then((module) => {
            router.use(`/${fileClean}`, module.router);
        })
            .catch((err) => {
            console.error(`Error loading route ${fileClean}:`, err);
        });
    }
});
export { router };
