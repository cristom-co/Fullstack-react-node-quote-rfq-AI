import axiosInstance from "./axiosInstance";

export const getQuotes = async () => {
  return await axiosInstance.get('/api/rfq/list-qoutes');
};

export const SendEmail = async (body: string) => {
  return await axiosInstance.post("api/rfq", {
    body,
  });
};
