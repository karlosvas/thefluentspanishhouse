const url_api =
  import.meta.env.VITE_VERCEL_ENV === "production"
    ? import.meta.env.VITE_URL_API
    : "http://localhost:8080";

export { url_api };
