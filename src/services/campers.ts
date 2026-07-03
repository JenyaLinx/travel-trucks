import { api } from "./api";

export const getCampers = async () => {
  const response = await api.get("/campers");

  return response.data;
};