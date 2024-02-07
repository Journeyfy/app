import axios from "axios";

export function axiosBuilder(baseURL: string) {
  return axios.create({
    baseURL,
    timeout: 30000, // 30 secondi
    withCredentials: true
  });
}
