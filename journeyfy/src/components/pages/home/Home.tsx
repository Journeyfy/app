import React, { Fragment, useState } from 'react';
import BarraRicerca from '../../atoms/barraricerca/BarraRicerca';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  // Definisci le opzioni direttamente all'interno del componente Home
  const optionsData = ["Opzione 1", "Opzione 2", "Opzione 3"];
  const navigate = useNavigate(); // Cambiato da useHistory a useNavigate
  const [selectedOption, setSelectedOption] = useState<string>('');

  function handleSearch(searchTerm: string): void {
    //throw new Error('Function not implemented.');
  }

  const handleSelectChange = (selectedValue: string): void => {
    setSelectedOption(selectedValue);

    // Esegui il reindirizzamento alla root destination associata all'opzione selezionata
    if (selectedValue === 'Opzione 1') {
      navigate('/activity1');
    } else if (selectedValue === 'Opzione 2') {
      navigate('/activity2');
    } // Posso aggiungere altri casi a seconda delle opzioni

    // Posso anche implementare una logica più dinamica basata sulle opzioni e sulle destinazioni
  };

  return (<Fragment><h2>Esplora</h2>
    <div>
      <h1>Applicazione con Barra di Ricerca</h1>
      <BarraRicerca onSearch={handleSearch} />
      {/* Altri contenuti dell'applicazione possono essere aggiunti qui */}
    </div></Fragment>)

};


export default Home;