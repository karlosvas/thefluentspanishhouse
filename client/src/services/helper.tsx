import { type FetchResponse, type ErrorResponseHelper } from 'types/types';

// Función para manejar las peticiones a la API
const Helper = () => {
  // Fetch personalizado
  const customFetch = async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<FetchResponse> => {
    // Obtenemos el token de la sesión o el token por defecto si no hay sesión del usuario
    const token =
      localStorage.getItem('token') || import.meta.env.VITE_DEFAULT_TOKEN;

    // Cabeceras por defecto
    const defaultHeader = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // Opciones de la petición, por defecto en caso de no haber opciones
    // Si no hay señal, creamos una nueva señal de aborto

    options.signal = options.signal || new AbortController().signal;
    options.method = options.method || 'GET';
    options.headers = { ...defaultHeader, ...options.headers };
    options.body =
      options.body && typeof options.body === 'object'
        ? JSON.stringify(options.body)
        : options.body;

    return fetch(endpoint, options)
      .then(async (res) => {
        // Si la respuesta no es correcta, lanzamos un error
        if (!res.ok) {
          // Obtenemos el mensaje de error si no es posible, mostramos un mensaje por defecto
          const text = await res.text();
          let message;
          try {
            message = JSON.parse(text);
          } catch (parseError) {
            message = { message: text };
          }
          // Lanzamos el error
          throw {
            err: true,
            status: res.status || '00',
            statusText: res.statusText || 'Ocurrió un Error personalizado',
            message,
          } as ErrorResponseHelper;
        }

        // Obtenemos el tipo de contenido de la respuesta
        const contentType = res.headers.get('content-type');
        if (contentType) {
          if (contentType.includes('application/json')) {
            return res.json();
          } else if (contentType.includes('application/octet-stream')) {
            return res.blob();
          } else if (
            contentType.includes('multipart/form-data') ||
            contentType.includes('application/x-www-form-urlencoded')
          ) {
            return res.formData();
          } else {
            return res.text();
          }
        } else {
          return res.text();
        }
      })
      .catch((error) => {
        error.name === 'AbortError'
          ? console.log('Fetch abortado')
          : console.error('Error en la petición fetch', error);
        throw error;
      });
  };

  // Métodos de petición
  const get = async (url: string, options: RequestInit = {}) => {
    return await customFetch(url, options);
  };

  const post = async (url: string, options: RequestInit = {}) => {
    options.method = 'POST';
    return await customFetch(url, options);
  };

  const put = async (url: string, options: RequestInit = {}) => {
    options.method = 'PUT';
    return await customFetch(url, options);
  };

  const del = async (url: string, options: RequestInit = {}) => {
    options.method = 'DELETE';
    return await customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};

export default Helper;
