const env = import.meta.env.VITE_VERCEL_ENV;

const getLocalhostUrl = async (): Promise<string> => {
  if (env !== 'production' && env !== 'preview') {
    for (let i = 0; i <= 10; i++) {
      const url = `http://localhost:808${i}`;
      try {
        const response = await fetch(url);
        if (response.status === 200) {
          console.log(`API running at ${url}`);
          return url;
        }
      } catch (error) {
        // Continuar con el siguiente puerto
      }
    }
  }
  // Valor por defecto si no se encuentra ningún puerto disponible
  return 'http://localhost:8080'; 
};

let url_api: string;
let url_client: string;

const initializeUrls = async () => {
  url_api =
    env === "production"
      ? import.meta.env.VITE_URL_API
      : env === "preview"
      ? import.meta.env.VITE_URL_API_TEST
      : await getLocalhostUrl();

  url_client =
    env === "production"
      ? import.meta.env.VITE_URL_CLIENT
      : env === "preview"
      ? import.meta.env.VITE_URL_CLIENT_TEST
      : `http://localhost:5173`;
};

const MAX_PUBLICATIONS_PER_PAGE = 6;

export { url_api, url_client, MAX_PUBLICATIONS_PER_PAGE, initializeUrls };
