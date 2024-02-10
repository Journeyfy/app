import { NotificationMsg } from "dolfo";
import { axiosInstance } from "..";
import { SuggestionRequestStatus } from "../enums/suggestionRequestStatus";
import { SuggestionRequest } from "../models/suggestionRequest";
import { CreateSuggestionRequest } from "./httpContracts/createSuggestionRequest";
import { UpdateSuggestionRequest } from "./httpContracts/updateSuggetionRequest";

export class SuggestionApiService {
  public static async createSuggestionRequest(
    payload: CreateSuggestionRequest
  ) {
    try {
      await axiosInstance.post("/suggestions/addRequest", payload);
    } catch (err) {
      console.log("Error sending suggestion request:", err);
    }
  }

  public static async getSuggestionRequests(status: SuggestionRequestStatus) {
    try {
      return await axiosInstance.get<SuggestionRequest[]>(
        `/suggestions/getRequests/${status}`
      );
    } catch (err) {
      NotificationMsg.showError("Errore durante il recupero delle richieste");
    }
  }

  public static async updateSuggestionRequest(
    payload: UpdateSuggestionRequest
  ) {
    try {
      return await axiosInstance.post("/suggestions/updateRequest", payload);
    } catch (err) {
      NotificationMsg.showError(
        "Errore durante la modifica della proposta con id:" + payload.idRequest
      );
    }
  }
}
