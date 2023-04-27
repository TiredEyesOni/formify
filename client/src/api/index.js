import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://formify-api.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
