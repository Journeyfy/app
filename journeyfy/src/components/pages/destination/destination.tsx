import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'dolfo/comps/layout/Button';
import { MenuItem, SideMenu } from 'dolfo';
import './destination.css';

interface DestinationProps {
  cityName: string;
  coverImage: string;
}

const Destination: React.FC<DestinationProps> = ({ cityName, coverImage }) => {
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);

  const openMenu = (menuName: string) => {
    setCurrentMenu(menuName);
  };

  const closeMenu = () => {
    setCurrentMenu(null);
  };

  return (
    <div className="destination-container">
      <div className="content-container">
        <h1>{cityName}</h1>
        <img className="destination-cover-image" src={coverImage} alt={`Copertina di ${cityName}`} />
        <div className="button-container">
          <button onClick={() => openMenu('Luoghi da vedere')}>Luoghi da vedere</button>
          <button onClick={() => openMenu('Attività')}>Attività</button>
          <button onClick={() => openMenu('Locali')}>Locali</button>
        </div>
      </div>
      
      <SideMenu style={{ background: '#999999' }} direction="right" opened={currentMenu !== null} onToggle={closeMenu}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h2>{currentMenu}</h2>
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
  );
};

export default Destination;
