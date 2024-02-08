import { SuggestionRequestStatus } from "../../enums/suggestionRequestStatus";

export interface UpdateSuggestionRequest {
    readonly status?: SuggestionRequestStatus;
    readonly title?: string;
    readonly mapLink?: string;
    readonly openAt?: string;
    readonly closeAt?: string;
    readonly idRequest: string;
}