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
    'Roma' : '/destination/1',
    'Amsterdam': '/destination/2',
    'Altro': '/destination',
  };

  const handleSearchChange = (selectedValue: string) => {
    setSelectedOption(selectedValue);

    const destination = destinazioni[selectedValue];
    if (destination) {
      navigate(destination);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(selectedOption);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit}>
        <Select
          canSearch
          //label="Barra Ricerca"
          onChange={(selectedValue: string) => handleSearchChange(selectedValue)}
        >
           <Option value="" label="Dove vuoi andare?" disabled />
          <Option value="John Smith" label="John Smith" />
          <Option value="John Snow" label="John Snow" />
          <Option value="Steve Rogers" label="Steve Rogers" />
          <Option value="Roma" label="Roma" />
          <Option value="Amsterdam" label="Amsterdam"/>
          <Option value="Altro" label="Altro" />
        </Select>
      </form>
    </div>
  );
};

export default BarraRicerca;

