import { ILocationParams, IResidentParams } from "../utils/interfaces";
import api from "./apiConnect";

export const getLocations = async (
  name: string
): Promise<ILocationParams[]> => {
  try {
    const searchPath = name.length > 0 ? `search/${name}` : "";
    const response = await api.get(`/location/${searchPath}`);
    const resData = response.data;
    return resData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};

export const getLocation = async (
  locationId: string
): Promise<ILocationParams | null> => {
  try {
    const response = await api.get(`/location/${locationId}`);
    const resData = await response.data;
    return resData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};

export const getCharecters = async (
  charctersIdArr: string[]
): Promise<IResidentParams[] | null> => {
  try {
    const response = await api.post(`/location/residents`, {
      residentsIds: charctersIdArr,
    });
    const resData = response.data;
    return resData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};

export const addLocation = async (locationObj: ILocationParams) => {
  try {
    const response = await api.post(`/location-req/add-location`, {
      ...locationObj,
    });
    const resData = response.data;
    return resData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred");
    }
  }
};
