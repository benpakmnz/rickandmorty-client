import axios from "axios";

const storageKey = process.env.STORAGE_KEY;
const baseURL = process.env.BASE_URL;

const api = axios.create({ baseURL });

api.interceptors.request.use(
  (config) => {
    if (storageKey) {
      const localStorageItem = localStorage.getItem(storageKey);
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
