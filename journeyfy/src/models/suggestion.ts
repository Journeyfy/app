import { SuggestionType } from "../enums/suggestionType";

export interface Suggestion {
    readonly id: number;
    readonly type: SuggestionType;
    readonly title: string;
    readonly mapLink?: string;
    readonly openAt?: string;
    readonly closeAt?: string;
}