import { axiosInstance } from "..";

export class AuthApiService {
  public static async login(email: string, password: string): Promise<any> {
    try {
      return (await axiosInstance.post(`login`, { email, password })).data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
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
