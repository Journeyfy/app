import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { DestinationApiService } from "../../../services/destinationApiService";
import {
  BarraRicerca,
  OptionProps,
} from "../../atoms/barraricerca/BarraRicerca";

const Home = () => {
  const navigate = useNavigate();

  // Funzione di ricerca che chiama l'API
  const handleSearch = async (searchTerm: string): Promise<OptionProps[]> => {
    const data = await DestinationApiService.getDestinationsByTerm(searchTerm);
    return _.map(data, (d) => ({ id: d.idDestination, name: d.name }));
  };

  // Funzione che gestice il click su una option
  // Al click l'utente viene riportato al dettglio della destinazione
  const onDestinationSelect = (value: OptionProps) =>
    navigate(`/destination/${value.id}`);

  return (
    <div className="activity explore-activity">
      <h2>Esplora</h2>
      <div>
        <BarraRicerca
          label="Dove vuoi andare?"
          onSearch={handleSearch}
          onChange={onDestinationSelect}
        />
      </div>
    </div>
  );
};

export default Home;
