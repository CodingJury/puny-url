import axios from "axios";

export const BASE_URL = "https://tiny-url-4gdz.onrender.com";
// export const BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: BASE_URL + '/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance;