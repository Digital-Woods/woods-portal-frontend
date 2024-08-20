const Axios = axios.create({
  baseURL: "https://dev1-marketplace.digitalwoods.io/",
  timeout: 150000000,
  headers: {
    "Content-Type": "application/json",
    // "X-User-Email": "john.doe@example.com",
    // "X-User-Roles": "ROLE_USER, ROLE_ADMIN",
    "ngrok-skip-browser-warning": 1,
  },
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

class HttpClient {
  static async get(url, params) {
    const response = await Axios.get(url, { params });
    return response.data;
  }

  static async post(url, data, options) {
    const response = await Axios.post(url, data, options);
    return response.data;
  }

  static async put(url, data) {
    const response = await Axios.put(url, data);
    return response.data;
  }

  static async delete(url) {
    const response = await Axios.delete(url);
    return response.data;
  }

  static formatSearchParams(params) {
    return Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([k, v]) =>
        ["type", "categories", "tags", "author", "manufacturer"].includes(k)
          ? `${k}.slug:${v}`
          : `${k}:${v}`
      )
      .join(";");
  }
}
