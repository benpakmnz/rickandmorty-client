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
