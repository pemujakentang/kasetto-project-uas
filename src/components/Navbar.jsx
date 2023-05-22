import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useStateProvider } from "../utils/StateProvider";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [{token,  userInfo }] = useStateProvider();
  // console.log(userInfo);
  return (
    <div className="navbar-container">
      {/* <div className="search_bar">
        <FaSearch />
        <input
          id="search"
          type="text"
          placeholder="Search"
          onChange={(event) => {
            setSearchInput(event.target.value);
            // console.log(searchInput);
          }}
        />
      </div> */}
      <div>
        <NavLink to={`/#access_token=${token}`}>
          <button id="gotoBody">Body</button>
        </NavLink>
        <NavLink to={`/search#access_token=${token}`}>
          <button id="goToSearch">Search</button>
        </NavLink>
        <NavLink to={`/player#access_token=${token}`}>
          <button id="goToPlayer">Player</button>
        </NavLink>
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
