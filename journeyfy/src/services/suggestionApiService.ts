import { CreateSuggestionRequest } from "../models/createSuggestionRequest";
import { axiosInstance } from "..";
import { SuggestionRequestStatus } from "../enums/suggestionRequestStatus";
import { SuggestionRequest } from "../models/suggestionRequest";

export class SuggestionApiService {
  public static async createSuggestionRequest(
    payload: CreateSuggestionRequest
  ) {
    try {
      await axiosInstance.post("suggestions/addRequest", payload);
    } catch (err) {
      console.log("Error sending suggestion request:", err);
    }
  }

  public static async getSuggestionRequests(status: SuggestionRequestStatus) {
    try {
      return (
        await axiosInstance.get<SuggestionRequest[]>(
          `suggestions/getRequests/${status}`
        )
      ).data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  }
}
