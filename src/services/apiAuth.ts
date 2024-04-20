import {
  IUserAuthParams,
  IUserParams,
} from "../utils/Interfaces/auth-interface";
import api from "./apiConnect";

export const login = async (
  userAttrs: IUserAuthParams
): Promise<{ user: IUserParams; token: string } | null> => {
  try {
    const response = await api.post(`/auth/login`, userAttrs);
    const resData = response.data;

    if (resData && resData.token) {
      handleLocalStorageAuth(resData.token);
      return resData;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signup = async (
  userAttrs: IUserAuthParams
): Promise<{ user: IUserParams; token: string } | null> => {
  try {
    const response = await api.post(`/auth/signup`, userAttrs);
    const resData = response.data;

    if (resData && resData.token) {
      handleLocalStorageAuth(resData.token);
      return resData;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
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

      if (resData) {
        return resData;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
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
