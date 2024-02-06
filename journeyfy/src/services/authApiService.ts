import { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import { User } from "../models/user";

export class AuthApiService {
  public static async login(email: string, password: string) {
    try {
      return axiosInstance.post<User>(`login`, { email, password });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  public static async logout() {
    try {
      return axiosInstance.get("logout");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  }

  public static async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<any> {
    try {
      return (
        await axiosInstance.post(`users`, {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        })
      ).data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  }
}
