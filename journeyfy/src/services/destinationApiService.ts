import { axiosInstance } from "..";
import { Destination } from "../models/destination";

export class DestinationApiService {
  public static async getDestinationsByTerm(
    term: string
  ): Promise<Destination[]> {
    try {
      return (await axiosInstance.get(`destinations?term=${term}`)).data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  }
}
