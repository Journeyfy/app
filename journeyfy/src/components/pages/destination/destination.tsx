import React from "react";
import { Link } from "react-router-dom";

interface DestinationProps {
  cityName: string;
  coverImage: string;
}

const Destination: React.FC<DestinationProps> = ({ cityName, coverImage }) => {
  return (
    <div className="activity destination-activity">
      <div className="destination-container">
        <button className="return-button">
          <Link to="/">Indietro</Link>
        </button>
        <h1>{cityName}</h1>
        <img
          className="destination-cover-image"
          src={coverImage}
          alt={`Copertina di ${cityName}`}
        />
        <div className="button-container">
          <button>Luoghi da vedere</button>
          <button>Attività</button>
          <button>Locali</button>
        </div>
      </div>
    </div>
  );
};

export default Destination;

/*export function Destination(){
    return <div>Ciao da Destination</div>
}*/
