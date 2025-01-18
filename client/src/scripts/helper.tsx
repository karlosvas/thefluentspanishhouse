import { type ErrorResponseHelper } from 'types/types';

type FetchResponse = unknown | Blob | FormData | string | ErrorResponseHelper;

const Helper = () => {
  const customFetch = async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<FetchResponse> => {
    const token =
      localStorage.getItem('token') || import.meta.env.VITE_DEFAULT_TOKEN;

    const defaultHeader = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    options.signal = options.signal || new AbortController().signal;
    options.method = options.method || 'GET';
    options.headers = { ...defaultHeader, ...options.headers };
    options.body =
      options.body && typeof options.body === 'object'
        ? JSON.stringify(options.body)
        : options.body;

    return fetch(endpoint, options)
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            let message;
            try {
              message = JSON.parse(text);
            } catch (parseError) {
              message = { message: text };
            }
            throw {
              err: true,
              status: res.status || '00',
              statusText: res.statusText || 'Ocurrió un Error personalizado',
              message,
            } as ErrorResponseHelper;
          });
        }
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
        throw error;
      });
  };

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
