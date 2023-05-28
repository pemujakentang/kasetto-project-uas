import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useStateProvider } from "../utils/StateProvider";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [{token,  userInfo }] = useStateProvider();
  // console.log(userInfo);
  return (
    <div className="navbar-container">
      <div className="navSection">
        <NavLink to={`/#access_token=${token}`}>
          <button className="navButton" id="gotoPlayer">
            Player
          </button>
        </NavLink>
        <NavLink to={`/search#access_token=${token}`}>
          <button className="navButton" id="gotoSearch">
            Search
          </button>
        </NavLink>
        <NavLink to={`/playlist#access_token=${token}`}>
          <button className="navButton" id="gotoBody">
            View Playlist
          </button>
        </NavLink>
        {/* <NavLink to={`/about#access_token=${token}`}>
          <button className="navButton" id="gotoAbt">
            About
          </button>
        </NavLink> */}
      </div>

      <div className="profileLink">
        <img className="profilepic" src={userInfo?.pfp} alt="" />
        <div className="username-container">
          <h3 className="username">{userInfo?.name}</h3>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
