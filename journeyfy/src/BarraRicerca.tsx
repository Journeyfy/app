import React, { useState } from 'react';
//import './styles/BarraRicerca.css';
import './BarraRicerca.css';
import './index.css';
import { Select,Option } from 'dolfo';


interface BarraRicercaProps {
  onSearch: (searchTerm: string) => void;
}

const BarraRicerca: React.FC<BarraRicercaProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Chiamiamo la funzione di callback passando il termine di ricerca
    onSearch(searchTerm);
  };

  return (
    <div className="centered-container">
      <Select canSearch label="Try typing 'John'">
	<Option value={1} label="John Smith" />
	<Option value={2} label="John Snow" />
	<Option value={3} label="Steve Rogers" />
</Select>
    {/* <form className="barra-ricerca" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Dove vuoi andare?..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit">Dove vuoi andare?</button>
    </form> */}
    </div>
  );
};

export default BarraRicerca;
