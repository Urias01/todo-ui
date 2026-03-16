import type { ApiError } from "@/features/common/types/api-error";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: "http://localhost:8080"
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    const message = error.response?.data?.message ?? "Erro inesperado";

    toast.error(message);

    if (error.response && error.response.status === 401) {
      window.location.href = "/sign-in";

      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);
