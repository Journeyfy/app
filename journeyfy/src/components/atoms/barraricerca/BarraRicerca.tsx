import React, { useState } from 'react';
import { Select, Option } from 'dolfo';
import { useNavigate } from 'react-router-dom';

interface BarraRicercaProps {
  onSearch: (searchTerm: string) => void;
}

const BarraRicerca: React.FC<BarraRicercaProps> = ({ onSearch }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const navigate = useNavigate();

  const destinazioni: Record<string, string> = {
    'John Smith': '/destination',
    'John Snow': '/destination',
    'Steve Rogers': '/destination',
    'Altro': '/destination', // Aggiungo altre destinazioni qui
  };

  const handleSearchChange = (selectedValue: string) => {
    setSelectedOption(selectedValue);

    // Eseguo il reindirizzamento alla destinazione associata all'opzione selezionata
    const destination = destinazioni[selectedValue];
    if (destination) {
      navigate(destination);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Chiamo la funzione di callback passando il termine di ricerca
    onSearch(selectedOption);
  };

  return (
    <div className="centered-container">
      <Select
        canSearch
        label="Prova a digitare 'John'"
        onChange={(selectedValue: string) => handleSearchChange(selectedValue)}
      >
        <Option value="John Smith" label="John Smith" />
        <Option value="John Snow" label="John Snow" />
        <Option value="Steve Rogers" label="Steve Rogers" />
        <Option value="Altro" label="Altro" />
      </Select>
    </div>
  );
};

export default BarraRicerca;
