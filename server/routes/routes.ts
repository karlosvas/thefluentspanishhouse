import { Router } from "express";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PATH_ROUTER = __dirname;
const cleanExtension = (file: string) => file.split(".")[0];
const router = Router();

readdirSync(PATH_ROUTER).forEach((file) => {
  const fileClean = cleanExtension(file);
  const fileExtension = path.extname(file);

  if (
    fileClean !== "routes" &&
    (fileExtension === ".js" || fileExtension === ".ts") &&
    !file.endsWith(".js.map") &&
    !file.endsWith(".ts.map")
  ) {
    const modulePath = path.join(PATH_ROUTER, `${fileClean}${fileExtension}`);
    const moduleURL = pathToFileURL(modulePath).href;

    console.log(`Loading route ${fileClean} from ${moduleURL}`);
    import(moduleURL)
      .then((module) => {
        console.log(`Route ${fileClean} loaded successfully`);
        router.use(`/${fileClean}`, module.router);
      })
      .catch((err) => {
        console.error(`Error loading route ${fileClean}:`, err);
      });
  }
});

export { router };
