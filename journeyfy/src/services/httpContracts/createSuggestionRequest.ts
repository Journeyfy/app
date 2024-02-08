import { SuggestionRequestType } from "../../enums/suggestionRequestType";
import { SuggestionType } from "../../enums/suggestionType";

export interface CreateSuggestionRequest {
    readonly idDestination: number;
    readonly requestType: SuggestionRequestType;
    readonly suggestionType: SuggestionType;
    readonly title: string;
    readonly idSuggestion?: number;
    readonly mapLink?: string;
    readonly openAt?: string;
    readonly closeAt?: string;
}