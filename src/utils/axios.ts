import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export const axiosInstance = axios.create({
  baseURL: API_BASE,
});
