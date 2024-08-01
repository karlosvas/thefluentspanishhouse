import { getUrlTest } from "../scripts/render-data";

let url_api: string;
const env = import.meta.env.VITE_VERCEL_ENV;

export async function initializeUrlApi() {
  url_api =
    env === "production"
      ? import.meta.env.VITE_URL_API
      : env === "preview"
      ? await getUrlTest()
      : "http://localhost:8080";
  console.log("Conseguido", url_api);
  return url_api;
}

export { url_api };
