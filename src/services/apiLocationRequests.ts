import api from "./apiConnect";

export const addLocationRequest = async (input: string): Promise<unknown> => {
  try {
    const response = await api.post(`http://localhost:5004/api/location-req/`, {
      location: input,
    });
    const resData = response.data;
    return resData;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add location request");
  }
};
