import React, { Fragment, useState } from 'react';
import { BarraRicerca, OptionProps } from '../../atoms/barraricerca/BarraRicerca';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Funzione di ricerca che chiama l'API
  const handleSearch = async (searchTerm: string): Promise<OptionProps[]> => {
    try {
      console.log (searchTerm);
      const response = await fetch(`https://journeyfy-api.onrender.com/api/v1/destinations?term=${searchTerm}`);
      const data = response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Gestisci l'errore restituendo un array vuoto o implementa una logica di gestione degli errori
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const term = event.target.value;
    setSelectedOption(term);
  };

  return (
    <Fragment>
      <h2>Esplora</h2>
      <div>
        <BarraRicerca label='Dove vuoi andare?' onSearch={(selectedOption) => handleSearch(selectedOption)} />
        {/* Altri contenuti dell'applicazione possono essere aggiunti qui */}
      </div>
    </Fragment>
  );
};

export default Home;

