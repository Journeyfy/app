import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'dolfo/comps/layout/Button';
import { MenuItem, SideMenu } from 'dolfo';
import { Destination as DestinationType } from '../../../models/destination';
import { DestinationApiService } from '../../../services/destinationApiService';

const Destination: React.FC = () => {
  const [destinationInfo, setDestinationInfo] = useState<DestinationType | null> (null);
  const { destinationId } = useParams();
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await DestinationApiService.getDestinationInfo(Number(destinationId));
        setDestinationInfo(result);
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
      }
    };

    fetchData();
  }, [destinationId]);

  const openMenu = (menuName: string) => {
    setCurrentMenu(menuName);
  };

  const closeMenu = () => {
    setCurrentMenu(null);
  };

  return (
    <>
      <div className="activity destination-activity">
        <div className="destination-container">
          <div className="content-container">
          <h1>{destinationInfo?.name}</h1>
          <img
            className="destination-cover-image"
            src={destinationInfo?.image}
            alt={`Copertina di ${destinationInfo?.name}`}
          />
            <div className="button-container">
              <button onClick={() => openMenu('Luoghi da vedere')}>Luoghi da vedere</button>
              <button onClick={() => openMenu('Attività')}>Attività</button>
              <button onClick={() => openMenu('Locali')}>Locali</button>
            </div>

            <SideMenu
              style={{ background: '#999999' }}
              direction="right"
              opened={currentMenu !== null}
              onToggle={closeMenu}
            >
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2>{currentMenu}</h2>
                {/* Renderizza il contenuto in base al menu selezionato */}
                {currentMenu === 'Luoghi da vedere' && (
                  <>
                    <MenuItem>
                      <Link to="/">Luogo 1</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/">Luogo 2</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/">Luogo 3</Link>
                    </MenuItem>
                  </>
                )}
                {currentMenu === 'Attività' && (
                  <>
                    <MenuItem>
                      <Link to="/">Attività 1</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/">Attività 2</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/">Attività 3</Link>
                    </MenuItem>
                  </>
                )}
                {currentMenu === 'Locali' && (
                  <>
                    <MenuItem>
                      <Link to="/">Locale 1</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/">Locale 2</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/">Locale 3</Link>
                    </MenuItem>
                  </>
                )}
              </div>
            </SideMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Destination;
