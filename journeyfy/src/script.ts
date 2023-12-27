// Importa Axios
import axios from 'axios';

// Esegui una richiesta GET a un'API di esempio
axios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    // Gestisci la risposta con successo
    console.log('Dati della risposta:', response.data);
  })
  .catch(error => {
    // Gestisci gli errori
    console.error('Errore durante la richiesta:', error);
  });
