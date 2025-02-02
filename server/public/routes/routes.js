import { Router } from 'express';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PATH_ROUTER = __dirname;
const cleanExtension = (file) => file.split('.')[0];
const router = Router();
// Lee todos los archivos en el directorio de rutas para cargarlos y construir el modulo en el controlador
readdirSync(PATH_ROUTER).forEach((file) => {
    const fileClean = cleanExtension(file);
    const fileExtension = path.extname(file);
    if (fileClean !== 'routes' &&
        (fileExtension === '.js' || fileExtension === '.ts') &&
        !file.endsWith('.js.map') &&
        !file.endsWith('.ts.map')) {
        const modulePath = path.join(PATH_ROUTER, `${fileClean}${fileExtension}`);
        const moduleURL = pathToFileURL(modulePath).href;
        import(moduleURL)
            .then((module) => {
            if (module.router) {
                console.log(`Route ${fileClean} loaded successfully`);
                router.use(`/${fileClean}`, module.router);
            }
            else {
                console.error(`Error: No router found in module ${fileClean}`);
            }
        })
            .catch((err) => {
            console.error(`Error loading route ${fileClean}:`, err);
        });
    }
});
// Exporta el enrutador para que pueda ser usado en otras partes de la aplicación
export default router;
