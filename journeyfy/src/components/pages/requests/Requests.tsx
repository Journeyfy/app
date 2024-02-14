import {
  IColumn,
  Icon,
  NotificationMsg,
  Status,
  Tab,
  Table,
  Tabs,
} from "dolfo";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { SuggestionRequestStatus } from "../../../enums/suggestionRequestStatus";
import { SuggestionRequestType } from "../../../enums/suggestionRequestType";
import { SuggestionType } from "../../../enums/suggestionType";
import { SuggestionRequest } from "../../../models/suggestionRequest";
import { UpdateSuggestionRequest } from "../../../services/httpContracts/updateSuggetionRequest";
import { SuggestionApiService } from "../../../services/suggestionApiService";
import { mapSuggestionTypeToString } from "../../../utils/mappings";

export const Requests = () => {
  const [currentTab, setCurrentTab] = useState(SuggestionRequestStatus.Pending);
  const [dataSource, setDataSource] = useState<SuggestionRequest[]>([]);

  useEffect(() => {
    SuggestionApiService.getSuggestionRequests(currentTab).then((res) =>
      setDataSource(res?.data ?? [])
    );
  }, [currentTab]);

  const onRequestUpdate = (request: SuggestionRequest, released: boolean) => {
    // api then rimuovi da datasource
    SuggestionApiService.updateSuggestionRequest({
      ...request,
      idRequest: request.id,
      status: released
        ? SuggestionRequestStatus.Released
        : SuggestionRequestStatus.Rejected,
    } as UpdateSuggestionRequest).then((res) => {
      NotificationMsg.showSuccess(res?.data);
      setDataSource(_.filter(dataSource, (ds) => ds.id !== request.id));
      return;
    });
  };

  const mapStatusToString = (status: SuggestionRequestStatus) => {
    switch (status) {
      case SuggestionRequestStatus.Pending:
        return "In attesa";
      case SuggestionRequestStatus.Released:
        return "Rilasciate";
      case SuggestionRequestStatus.Rejected:
        return "Rifiutate";
    }
  };

  const values = Object.values(SuggestionRequestStatus).filter(
    (v) => !isNaN(Number(v))
  );

  const getColumns = (status: SuggestionRequestStatus) => {
    const defaultColumns: IColumn[] = [
      { field: "suggestionType", label: "Tipologia", width: "200px" },
      { field: "requestType", label: "Operazione", width: "150px" },
      { field: "destinationName", label: "Destinazione" },
      // { field: "idUser", label: "Aperta da" },
      { field: "title", label: "Titolo" },
      { field: "mapLink", label: "Mappa" },
      { field: "openAt", label: "Apertura" },
      { field: "closeAt", label: "Chiusura" },
    ];

    if (status === SuggestionRequestStatus.Pending) {
      return [
        ...defaultColumns,
        { field: "actions", label: "Azioni" },
      ] as IColumn[];
    } else {
      return defaultColumns;
    }
  };

  // renders
  const renderSuggestionType = (suggestionType: SuggestionType) => {
    switch (suggestionType) {
      case SuggestionType.ToSee:
        return (
          <Status type="info" hideIcon>
            <Icon iconKey="binoculars" className="pe-2" />
            {mapSuggestionTypeToString(suggestionType)}
          </Status>
        );
      case SuggestionType.ToDo:
        return (
          <Status type="info" hideIcon>
            <Icon iconKey="list" className="pe-2" />
            {mapSuggestionTypeToString(suggestionType)}
          </Status>
        );
      case SuggestionType.ToEat:
        return (
          <Status type="info" hideIcon>
            <Icon iconKey="utensils" className="pe-2" />
            {mapSuggestionTypeToString(suggestionType)}
          </Status>
        );
    }
  };

  const renderReqType = (reqType: SuggestionRequestType) => {
    switch (reqType) {
      case SuggestionRequestType.Add:
        return (
          <Status type="success" hideIcon>
            <Icon iconKey="plus" className="pe-2" />
            Aggiunta
          </Status>
        );
      case SuggestionRequestType.Update:
        return (
          <Status type="warning" hideIcon>
            <Icon iconKey="pen" className="pe-2" />
            Modifica
          </Status>
        );
      case SuggestionRequestType.Delete:
        return (
          <Status type="error" hideIcon>
            <Icon iconKey="trash" className="pe-2" />
            Rimozione
          </Status>
        );
    }
  };

  const renderActions = (item: SuggestionRequest) => (
    <div className="d-flex align-items-center gap-2">
      <Button onClick={() => onRequestUpdate(item, true)}>Accetta</Button>
      <Button variant="danger" onClick={() => onRequestUpdate(item, false)}>
        Rifiuta
      </Button>
    </div>
  );

  return (
    <div className="activity requests-activity">
      <Tabs onChangeTab={(i, value) => setCurrentTab(value)}>
        {_.map(values, (status, i) => (
          <Tab
            key={i}
            value={status}
            title={mapStatusToString(Number(status))}
            isDefault={Number(status) === SuggestionRequestStatus.Pending}
          >
            <Table
              columns={getColumns(Number(status))}
              data={_.map(dataSource, (item) => {
                const obj = {
                  ...item,
                  requestType: renderReqType(item.requestType),
                  suggestionType: renderSuggestionType(item.suggestionType),
                };
                if (Number(status) === SuggestionRequestStatus.Pending) {
                  return {
                    ...obj,
                    actions: renderActions(item),
                  };
                }
                return obj;
              })}
            />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
