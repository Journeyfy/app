import { useEffect, useState } from "react";
import { SuggestionRequestStatus } from "../../../enums/suggestionRequestStatus";
import { Tab, Tabs } from "dolfo";
import { SuggestionApiService } from "../../../services/suggestionApiService";
import { SuggestionRequest } from "../../../models/suggestionRequest";
import _ from "lodash";

export const Requests = () => {
  const [currentTab, setCurrentTab] = useState(SuggestionRequestStatus.Pending);
  const [dataSource, setDataSource] = useState<SuggestionRequest[]>(null!);

  useEffect(() => {
    SuggestionApiService.getSuggestionRequests(currentTab).then((res) =>
      setDataSource(res)
    );
  }, [currentTab]);

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

  return (
    <div className="activity requests-activity">
      <Tabs onChangeTab={(i) => setCurrentTab(i + 1)}>
        {_.map(values, (status) => (
          <Tab
            key={status}
            title={mapStatusToString(Number(status))}
            isDefault={Number(status) === SuggestionRequestStatus.Pending}
          ></Tab>
        ))}
      </Tabs>
    </div>
  );
};
