import axios from "axios";
import { NotificationMsg } from "dolfo";

export function axiosBuilder(baseURL: string) {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 30000, // 30 secondi
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => config,
    (err) => {
      console.error("[REQ]", err);
      NotificationMsg.showError("Errore durante l'invio della richiesta");
      Promise.reject(err);
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => response,
    (err) => {
      console.error(err);
      return Promise.reject(err);
    }
  );

  return axiosInstance;
}
