import React, { useState } from 'react';
import './Sidebar.css'
import logo from '../assets/LogoKasetto.png';
import Playlists from './Playlists';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [sidebarVisible, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebarVisible);
  };

  return (
    <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
      <img className="logo" src={logo} alt="logo" />
      <button className="toggleButton" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faChevronRight} style={{ color: 'yellow' }} />
      </button>
      <Playlists />
    </div>
  );
}

export default Sidebar;
