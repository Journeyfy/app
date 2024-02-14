import { NotificationMsg } from "dolfo";
import { axiosInstance } from "..";
import { User } from "../models/user";

export class AuthApiService {
  public static login(email: string, password: string) {
    try {
      return axiosInstance.post<User>(`/login`, { email, password });
    } catch (err) {
      NotificationMsg.showError("Errore durante il login");
    }
  }

  public static logout() {
    try {
      return axiosInstance.get("/logout");
    } catch (err) {
      NotificationMsg.showError("Errore durante il logout");
      return Promise.reject(err);
    }
  }

  public static register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    try {
      return axiosInstance.post(`/users`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
    } catch (err) {
      NotificationMsg.showError("Errore di registrazione");
    }
  }
}
