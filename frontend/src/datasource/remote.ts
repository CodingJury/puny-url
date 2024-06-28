import axiosInstance from "../core/axios.instance";
import { ExpireValueType } from "../core/type";

export const generateShortLink = async (originalUrl: string, expire: ExpireValueType) => {
  const response = await axiosInstance.post('/url', { originalUrl, expire })
  return response;
}

export const getList = async () => {
  const response = await axiosInstance.get('/url')
  return response;
}