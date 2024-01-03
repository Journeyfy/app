import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface DynamicSelectProps {
  options: string[];
  onSelectChange: (selectedValue: string) => void;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({ options, onSelectChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [dynamicOptions, setDynamicOptions] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Aggiorna le opzioni dinamiche in base alle props
    setDynamicOptions(options);
  }, [options]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectChange(selectedValue);

    // Eseguo il reindirizzamento alla root destination associata all'opzione selezionata
    if (selectedValue === 'Opzione 1') {
        navigate('/activity1');
      } else if (selectedValue === 'Opzione 2') {
        navigate('/activity2');
      } // Posso aggiungere altri casi a seconda delle opzioni
  
      // Posso anche implementare una logica più dinamica basata sulle opzioni e sulle destinazioni
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectChange}>
        {dynamicOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <p>Opzione selezionata: {selectedOption}</p>
    </div>
  );
};

export default DynamicSelect;