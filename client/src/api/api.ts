import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig) =>
      axios.get<T>(url, config),
    post: <T>(url: string, data: unknown, config: AxiosRequestConfig) =>
      axios.post<T>(url, data, config),
  };
};

export default api(axiosInstance);
