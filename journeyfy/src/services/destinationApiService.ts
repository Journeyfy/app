import { axiosInstance } from "..";
import { SuggestionType } from "../enums/suggestionType";
import { Destination } from "../models/destination";
import { Suggestion } from "../models/suggestion";

export class DestinationApiService {
  public static async getDestinationsByTerm(term: string) {
    try {
      return (
        await axiosInstance.get<Destination[]>(`destinations?term=${term}`)
      ).data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  }

  public static async getDestinationSuggestions(
    idDestination: number,
    type: SuggestionType
  ) {
    try {
      return (
        await axiosInstance.get<Suggestion[]>(
          `suggestions/${idDestination}/${type}`
        )
      ).data;
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  }
}
