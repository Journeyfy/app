import React, { Fragment, useState } from 'react';
import './index.css';
import BarraRicerca from './BarraRicerca';


const Home: React.FC = () => {
  function handleSearch(searchTerm: string): void {
    throw new Error('Function not implemented.');
  }

  return (<Fragment><h2>Esplora</h2>
    <div>
      <h1>Applicazione con Barra di Ricerca</h1>
      <BarraRicerca onSearch={handleSearch} />
      {/* Altri contenuti dell'applicazione possono essere aggiunti qui */}
    </div></Fragment>)

};


export default Home;