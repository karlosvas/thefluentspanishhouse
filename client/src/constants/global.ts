const env = import.meta.env.VITE_VERCEL_ENV;

export const url_api =
  env === "production"
    ? import.meta.env.VITE_URL_API
    : env === "preview"
    ? import.meta.env.VITE_URL_API_TEST
    : import.meta.env.VITE_URL_API_LOCAL;

export const url_client =
  env === "production"
    ? import.meta.env.VITE_URL_CLIENT
    : env === "preview"
    ? import.meta.env.VITE_URL_API_TEST
    : import.meta.env.VITE_URL_CLIENT_LOCAL;

export const MAX_PUBLICATIONS_PER_PAGE = 6;
