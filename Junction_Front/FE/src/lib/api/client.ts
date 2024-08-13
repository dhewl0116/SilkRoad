import axios from "axios";
import defaultClient from "./defaultClient";
import { getCookie } from "./cookie";

const authClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

authClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("jwt");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (_) => {}
);

authClient.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (
      error.response.status === 403 ||
      error.response.status === 401 ||
      error.response.status === 500
    ) {
      localStorage.removeItem("jwt");
    }
    return Promise.reject(error);
  }
);

export default authClient;
