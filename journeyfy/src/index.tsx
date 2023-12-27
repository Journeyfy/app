import React, { useState } from 'react';
//import React from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import AppRoutes from './AppRoutes';
import './BarraRicerca.css';


//const root = ReactDOM.createRoot(
  //document.getElementById('root') as HTMLElement
//);
//root.render(
  //<React.StrictMode>
    //<App />
  //</React.StrictMode>
//);

ReactDOM.render(
  //<React.StrictMode>
    //<AppRoutes />
  //</React.StrictMode>,
  <AppRoutes />,document.getElementById('root')
);
//React 18 è ancora in fase di sviluppo e non è ancora stabile per l'uso in produzione
//perciò ho commentato quello che era "superfluo".

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
