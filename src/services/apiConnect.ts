import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5004/api",
});

const storageKey = process.env.STORAGE_KEY;

api.interceptors.request.use(
  (config) => {
    if (storageKey) {
      const localStorageItem = localStorage.getItem(storageKey);
      console.log(localStorageItem);
      if (localStorageItem) {
        config.headers.Authorization = `Bearer ${localStorageItem}`;
      }
    }

    if (config.method === "delete" || config.method === "post") {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
