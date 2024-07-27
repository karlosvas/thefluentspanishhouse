const Helper = () => {
  const customFetch = async (endpoint: string, options: RequestInit = {}) => {
    const defaultHeader = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    const controller = new AbortController();

    options.signal = controller.signal;
    options.method = options.method || "GET";
    options.headers = { ...defaultHeader, ...options.headers };
    options.body =
      options.body && typeof options.body === "object"
        ? JSON.stringify(options.body)
        : options.body;

    return fetch(endpoint, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject({
            err: true,
            status: res.status || "00",
            statusText: res.statusText || "Ocurrió un Error personalizado",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  const get = (url: string, options = {}) => customFetch(url, options);

  const post = (url: string, options: RequestInit = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url: string, options: RequestInit = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url: string, options: RequestInit = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};

export default Helper;
