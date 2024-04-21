import { IUserAuthParams, IUserParams } from "../utils/interfaces";
import api from "./apiConnect";

export const login = async (userAttrs: IUserAuthParams) => {
  try {
    const { email, password } = userAttrs;
    const response = await api.post(`/auth/login`, { email, password });
    const resData = response.data;

    handleLocalStorageAuth(resData.token);
    return resData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};

export const signup = async (userAttrs: IUserAuthParams) => {
  try {
    const response = await api.post(`/auth/signup`, userAttrs);
    const resData = response.data;

    if (resData && resData.token) {
      handleLocalStorageAuth(resData.token);
      return resData;
    } else {
      return null;
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};

export const autoLogin = async (): Promise<{
  user: IUserParams;
  token: string;
} | null> => {
  try {
    const storageKey = process.env.STORAGE_KEY;
    if (storageKey && localStorage.getItem(storageKey)) {
      const response = await api.get(`/auth/autoLogin`);
      const resData = response.data;
      if (!resData) {
        throw new Error("An error occurred");
      }
      return resData;
    } else {
      throw new Error("An error occurred");
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};

const handleLocalStorageAuth = (token: string) => {
  const storageKey = process.env.STORAGE_KEY;
  if (storageKey) {
    localStorage.setItem(storageKey, token);
  } else {
    throw new Error("storage key is missing");
  }
};
