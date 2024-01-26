import React, { Fragment, useState } from 'react';
import { BarraRicerca, OptionProps } from '../../atoms/barraricerca/BarraRicerca';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  // Definisci le opzioni direttamente all'interno del componente Home
  const optionsData = ["Opzione 1", "Opzione 2", "Opzione 3"];
  const navigate = useNavigate(); // Cambiato da useHistory a useNavigate
  const [selectedOption, setSelectedOption] = useState<string>('');

  function handleSearch(searchTerm: string): OptionProps[] {
    return []
    //throw new Error('Function not implemented.');
  }

  return (<Fragment><h2>Esplora</h2>
    <div>
      <BarraRicerca label='Dove vuoi andare?' onSearch={handleSearch} />
      {/* Altri contenuti dell'applicazione possono essere aggiunti qui */}
    </div></Fragment>)

};

export default Home;