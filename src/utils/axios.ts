import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "https://my-json-server.typicode.com/Psr-mathur/student-learning-assistant";

export const axiosInstance = axios.create({
  baseURL: API_BASE,
});
