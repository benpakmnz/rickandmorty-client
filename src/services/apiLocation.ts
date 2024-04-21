import { ILocationParams, IResidentParams } from "../utils/interfaces";
import api from "./apiConnect";

export const getLocations = async (
  name: string
): Promise<ILocationParams[]> => {
  try {
    const searchPath = name.length > 0 ? `search/${name}` : "";
    const response = await api.get(
      `http://localhost:5004/api/location/${searchPath}`
    );
    const resData = response.data;
    return resData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getLocation = async (
  locationId: string
): Promise<ILocationParams | null> => {
  try {
    const response = await api.get(
      `http://localhost:5004/api/location/${locationId}`
    );
    const resData = await response.data;
    console.log(resData);
    return resData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCharecters = async (
  charctersIdArr: string[]
): Promise<IResidentParams[] | null> => {
  try {
    const response = await api.post(
      `http://localhost:5004/api/location/residents`,
      { residentsIds: charctersIdArr }
    );
    const resData = response.data;
    return resData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addLocation = async (locationObj: ILocationParams) => {
  try {
    const response = await api.post(
      `http://localhost:5004/api/location-req/add-location`,
      {
        ...locationObj,
      }
    );
    const resData = response.data;
    return resData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
