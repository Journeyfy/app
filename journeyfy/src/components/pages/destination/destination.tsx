import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MenuItem, SideMenu } from "dolfo";
import { Destination as DestinationType } from "../../../models/destination";
import { DestinationApiService } from "../../../services/destinationApiService";
import { SuggestionType } from "../../../enums/suggestionType";
import { Suggestion } from "../../../models/suggestion";

const Destination: React.FC = () => {
  const [destinationInfo, setDestinationInfo] =
    useState<DestinationType | null>(null);
  const [suggestionCategories, setSuggestionCategories] = useState<
    { type: SuggestionType; suggestions: Suggestion[] }[]
  >([]);
  const { destinationId } = useParams();
  const [currentMenu, setCurrentMenu] = useState<SuggestionType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [info, toSeeSuggestions, toDoSuggestions, toEatSuggestions] =
          await Promise.all([
            DestinationApiService.getDestinationInfo(Number(destinationId)),
            DestinationApiService.getDestinationSuggestions(
              Number(destinationId),
              SuggestionType.ToSee
            ),
            DestinationApiService.getDestinationSuggestions(
              Number(destinationId),
              SuggestionType.ToDo
            ),
            DestinationApiService.getDestinationSuggestions(
              Number(destinationId),
              SuggestionType.ToEat
            ),
          ]);

        setDestinationInfo(info);
        setSuggestionCategories([
          { type: SuggestionType.ToSee, suggestions: toSeeSuggestions },
          { type: SuggestionType.ToDo, suggestions: toDoSuggestions },
          { type: SuggestionType.ToEat, suggestions: toEatSuggestions },
        ]);
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
      }
    };

    fetchData();
  }, [destinationId]);

  const openMenu = (menuName: SuggestionType) => {
    setCurrentMenu(menuName);
  };

  const closeMenu = () => {
    setCurrentMenu(null);
  };

  const mapSuggestionTypeToString = (status: SuggestionType) => {
    switch (status) {
      case SuggestionType.ToSee:
        return "Cosa vedere";
      case SuggestionType.ToDo:
        return "Cosa fare";
      case SuggestionType.ToEat:
        return "Dove mangiare";
    }
  };

  const suggestionTypeValues = Object.values(SuggestionType).filter(
    (v) => !isNaN(Number(v))
  );

  return (
    <>
      <div className="activity destination-activity">
        <div className="destination-container">
          <div className="content-container">
            <h1>{destinationInfo?.name}</h1>
            <img
              className="destination-cover-image"
              src={destinationInfo?.image}
              alt={`Copertina di ${destinationInfo?.name}`}
            />
            <div className="button-container">
              {suggestionCategories.map((category) => (
                <button
                  key={category.type}
                  onClick={() => openMenu(category.type)}
                >
                  {mapSuggestionTypeToString(category.type)}
                </button>
              ))}
            </div>

            {suggestionCategories.map((category) => (
              <SideMenu
                key={category.type}
                style={{ background: "#999999" }}
                direction="right"
                opened={currentMenu === category.type}
                onToggle={closeMenu}
              >
                <div style={{ padding: "20px" }}>
                  <h2>{mapSuggestionTypeToString(category.type)}</h2>
                  {category.suggestions.map((suggestion) => (
                    <div className="d-flex align-items-center">
                      <div>
                        <a href={suggestion.mapLink} target="__blank">
                          {suggestion.title}
                        </a>
                        {suggestion.openAt && (
                          <span className="mx-2">{suggestion.openAt}</span>
                        )}
                        {suggestion.closeAt && (
                          <>
                            -<span className="mx-2">{suggestion.closeAt}</span>
                          </>
                        )}
                      </div>
                      {/* <div>TODO: bottoni</div> */}
                    </div>
                  ))}
                </div>
              </SideMenu>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Destination;
