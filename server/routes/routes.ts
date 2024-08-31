import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanExtension = (file: string) => file.split(".")[0];

readdirSync(PATH_ROUTER).forEach((file) => {
  if (file !== "index.ts") {
    import(`./${cleanExtension(file)}`).then((module) => {
      console.log(`Adding route /${cleanExtension(file)}`);
      router.use(`/${cleanExtension(file)}`, module.router);
    });
  }
});

export { router };
