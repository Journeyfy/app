import { SuggestionRequestStatus } from "../enums/suggestionRequestStatus";
import { SuggestionRequestType } from "../enums/suggestionRequestType";
import { SuggestionType } from "../enums/suggestionType";

export interface SuggestionRequest {
    readonly id: string;
    readonly status: SuggestionRequestStatus;
    readonly idUser: string;
    readonly requestType: SuggestionRequestType;
    readonly suggestionType: SuggestionType;
    readonly idSuggestion?: number;
    readonly title: string;
    readonly mapLink?: string;
    readonly openAt?: string;
    readonly closeAt?: string;
  }