import api from "./apiConnect";

export const addLocationRequest = async (input: string): Promise<unknown> => {
  try {
    const response = await api.post(`/location-req/`, {
      location: input,
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

export const getAllLocationRequests = async (): Promise<
  {
    location: string;
    id: string;
  }[]
> => {
  try {
    const response = await api.get(`/location-req/`);
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

export const deleteLocationRequests = async (
  id: string
): Promise<
  {
    id: string;
  }[]
> => {
  try {
    const response = await api.delete(`/location-req/${id}`);
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
