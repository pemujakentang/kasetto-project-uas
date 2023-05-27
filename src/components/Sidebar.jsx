import React, { useState } from 'react';
import './Sidebar.css'
import logo from '../assets/LogoKasetto.png';
import Playlists from './Playlists';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const [{token}, dispatch] = useStateProvider()
  const [sidebarVisible, setSidebar] = useState(false);

  const toDefaultPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId});
  };
  const toggleSidebar = () => {
    setSidebar(!sidebarVisible);
  };

  return (
    <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
      <NavLink to={`/playlist#access_token=${token}`}>
        <img
          className="logo"
          src={logo}
          alt="logo"
          onClick={() => toDefaultPlaylist("37i9dQZEVXbObFQZ3JLcXt")}
          style={{ cursor: "pointer" }}
        />
      </NavLink>

      <button className="toggleButton" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faChevronRight} style={{ color: "yellow" }} />
      </button>
      <Playlists />
    </div>
  );
}

export default Sidebar;
