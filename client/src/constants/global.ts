const env = import.meta.env.VITE_VERCEL_ENV;

export const url_api =
  env === "production"
    ? import.meta.env.VITE_URL_API
    : env === "preview"
    ? import.meta.env.VITE_URL_API_TEST
    : "http://localhost:8080";

export const url_client =
  env === "production"
    ? import.meta.env.VITE_URL_CLIENT
    : env === "preview"
    ? import.meta.env.VITE_URL_CLIENT_TEST
    : "http://http://localhost:5173";

export const MAX_PUBLICATIONS_PER_PAGE = 6;
