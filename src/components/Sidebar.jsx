import React from 'react';
import './Sidebar.css'
import logo from '../assets/LogoKasetto.png';
import Playlists from './Playlists';

function Sidebar() {
    return (
      <div className="sidebar">
        <img
          className="logo"
          src={logo}
          alt="logo"
        />
        <Playlists/>
      </div>
    );
}

export default Sidebar;