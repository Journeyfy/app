import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon, MenuItem, NotificationMsg, SideMenu, TextInput } from "dolfo";
import { Destination as DestinationType } from "../../../models/destination";
import { DestinationApiService } from "../../../services/destinationApiService";
import { SuggestionType } from "../../../enums/suggestionType";
import { Suggestion } from "../../../models/suggestion";
import { UserContext } from "../../layout/AppLayout";
import { Button, Modal } from "react-bootstrap";
import { SuggestionApiService } from "../../../services/suggestionApiService";
import { SuggestionRequestType } from "../../../enums/suggestionRequestType";
import { isNull } from "lodash";
import { CreateSuggestionRequest } from "../../../services/httpContracts/createSuggestionRequest";

const Destination: React.FC = () => {
  const { user } = useContext(UserContext);

  const [destinationInfo, setDestinationInfo] =
    useState<DestinationType | null>(null);
  const [suggestionCategories, setSuggestionCategories] = useState<
    { type: SuggestionType; suggestions: Suggestion[] }[]
  >([]);
  const { destinationId } = useParams();
  const [currentMenu, setCurrentMenu] = useState<SuggestionType | null>(null);

  // suggestion
  const [addSuggestionModalVisible, setAddSuggestionModalVisible] =
    useState(false);
  const [editMode, setEditMode] = useState<SuggestionRequestType | null>(null);
  const [suggestionId, setSuggestionId] = useState<number | null>();
  const [suggestionTitle, setSuggestionTitle] = useState("");
  const [suggestionMapLink, setSuggestionMapLink] = useState("");
  const [suggestionOpeningTime, setSuggestionOpeningTime] = useState("");
  const [suggestionClosingTime, setSuggestionClosingTime] = useState("");

  // effects
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

  // handlers
  const openMenu = (menuName: SuggestionType) => {
    setCurrentMenu(menuName);
  };

  const closeMenu = () => {
    setCurrentMenu(null);
  };

  const onOpenSuggestionRequestModal = (mode: SuggestionRequestType) => {
    setEditMode(mode);
    setAddSuggestionModalVisible(true);
  };

  const onCloseSuggestionModal = () => {
    setAddSuggestionModalVisible(false);
    clearSuggestionData();
    setEditMode(null);
  };

  const onEditSuggestion = (suggestion: Suggestion) => {
    setSuggestionId(suggestion.id);
    setSuggestionTitle(suggestion.title);
    setSuggestionMapLink(suggestion.mapLink || "");
    setSuggestionOpeningTime(suggestion.openAt || "");
    setSuggestionClosingTime(suggestion.closeAt || "");
    onOpenSuggestionRequestModal(SuggestionRequestType.Update);
  };

  const onDeleteSuggestion = (suggestion: Suggestion) => {
    setSuggestionId(suggestion.id);
    setSuggestionTitle(suggestion.title);
    setSuggestionMapLink(suggestion.mapLink || "");
    setSuggestionOpeningTime(suggestion.openAt || "");
    setSuggestionClosingTime(suggestion.closeAt || "");
    onOpenSuggestionRequestModal(SuggestionRequestType.Delete);
  };

  const clearSuggestionData = () => {
    setSuggestionId(null);
    setSuggestionTitle("");
    setSuggestionMapLink("");
    setSuggestionOpeningTime("");
    setSuggestionClosingTime("");
  };

  const submitNewSuggestionRequest = () => {
    onCloseSuggestionModal();
    let payload = {
      idDestination: Number(destinationId),
      requestType: editMode,
      suggestionType: currentMenu!,
      title: suggestionTitle,
      mapLink: suggestionMapLink,
      openAt: suggestionOpeningTime,
      closeAt: suggestionClosingTime,
    } as CreateSuggestionRequest;

    if (editMode === SuggestionRequestType.Update) {
      payload = { ...payload, idSuggestion: suggestionId! };
    }

    SuggestionApiService.createSuggestionRequest(payload).then((res) =>
      NotificationMsg.showSuccess(res?.data)
    );
  };

  // utils
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
                direction="right"
                opened={currentMenu === category.type}
                onToggle={closeMenu}
                menuColor="black"
              >
                <div style={{ padding: "20px" }}>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h3>{mapSuggestionTypeToString(category.type)}</h3>
                    {user && (
                      <Icon
                        iconKey="plus"
                        onClick={() =>
                          onOpenSuggestionRequestModal(
                            SuggestionRequestType.Add
                          )
                        }
                      />
                    )}
                  </div>
                  {category.suggestions.map((suggestion) => (
                    <div className="d-flex align-items-center justify-content-between">
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
                      <div className="d-flex align-items-center gap-2">
                        <Icon
                          iconKey="pen"
                          onClick={() => onEditSuggestion(suggestion)}
                        />
                        <Icon
                          iconKey="trash"
                          color="red"
                          onClick={() => onDeleteSuggestion(suggestion)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SideMenu>
            ))}
          </div>
        </div>
      </div>

      <Modal show={addSuggestionModalVisible} onHide={onCloseSuggestionModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode === SuggestionRequestType.Add && (
              <>Nuovo: {mapSuggestionTypeToString(currentMenu!)}</>
            )}
            {editMode === SuggestionRequestType.Update && (
              <>Modifica "{suggestionTitle}"</>
            )}
            {editMode === SuggestionRequestType.Delete && (
              <>Elimina "{suggestionTitle}"</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            required
            label="Titolo"
            className="mb-2"
            autocomplete="new-password"
            value={suggestionTitle}
            onChange={setSuggestionTitle}
            disabled={editMode === SuggestionRequestType.Delete}
          />
          <TextInput
            required
            label="Link Google maps"
            className="mb-2"
            autocomplete="new-password"
            icon={{ iconKey: "map", type: "far" }}
            value={suggestionMapLink}
            onChange={setSuggestionMapLink}
            disabled={editMode === SuggestionRequestType.Delete}
          />
          <div className="d-flex">
            <TextInput
              required
              label="Orario di apertura"
              className="mb-2"
              autocomplete="new-password"
              icon={{ iconKey: "clock", type: "far" }}
              value={suggestionOpeningTime}
              onChange={setSuggestionOpeningTime}
              disabled={editMode === SuggestionRequestType.Delete}
            />
            <TextInput
              required
              label="Orario di chiusura"
              className="mb-2"
              autocomplete="new-password"
              icon={{ iconKey: "clock", type: "far" }}
              value={suggestionClosingTime}
              onChange={setSuggestionClosingTime}
              disabled={editMode === SuggestionRequestType.Delete}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseSuggestionModal}>
            Annulla
          </Button>
          {editMode === SuggestionRequestType.Delete ? (
            <Button variant="danger" onClick={submitNewSuggestionRequest}>
              Elimina
            </Button>
          ) : (
            <Button variant="success" onClick={submitNewSuggestionRequest}>
              Conferma
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Destination;
