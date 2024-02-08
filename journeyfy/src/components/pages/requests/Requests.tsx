import { useEffect, useState } from "react";
import { SuggestionRequestStatus } from "../../../enums/suggestionRequestStatus";
import { IColumn, NotificationMsg, Tab, Table, Tabs } from "dolfo";
import { SuggestionApiService } from "../../../services/suggestionApiService";
import { SuggestionRequest } from "../../../models/suggestionRequest";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { UpdateSuggestionRequest } from "../../../services/httpContracts/updateSuggetionRequest";

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
      setDataSource(_.filter(dataSource, (ds) => ds.id != request.id));
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
      { field: "suggestionType", label: "Tipologia" },
      { field: "requestType", label: "Operazione" },
      { field: "idDestination", label: "Destinazione" },
      { field: "idUser", label: "Aperta da" },
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
                if (Number(status) === SuggestionRequestStatus.Pending) {
                  const actions = (
                    <div className="d-flex align-items-center gap-2">
                      <Button onClick={() => onRequestUpdate(item, true)}>
                        Accetta
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => onRequestUpdate(item, false)}
                      >
                        Rifiuta
                      </Button>
                    </div>
                  );
                  return { ...item, actions: actions };
                }
                return item;
              })}
            />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
