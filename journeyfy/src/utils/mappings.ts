import { SuggestionType } from "../enums/suggestionType";

export const mapSuggestionTypeToString = (status: SuggestionType) => {
    switch (status) {
      case SuggestionType.ToSee:
        return "Cosa vedere";
      case SuggestionType.ToDo:
        return "Cosa fare";
      case SuggestionType.ToEat:
        return "Dove mangiare";
    }
  };