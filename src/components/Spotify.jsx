import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Navbar from "./Navbar";
import "./Spotify.css";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import Search from "./Search";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Player from "./Player";

function Spotify() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .catch((error) => {
          // console.log(error);
          // console.log(error.response.status)
          if (error.response.status === 401) {
            window.location = "/";
          }
        });;
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
        pfp: data.images[0].url,
      };
      // console.log(userInfo);
      const pathname = window.location.pathname;
      console.log("Pathname: "+pathname);
      // window.history.pushState({}, null, "/");
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  return (
    <div className="container">

        <Sidebar />
        <div className="body_navbar">
          <Navbar />
          <div className="body_contents">
            <Routes>
              <Route
                index
                element={<Body />}
              ></Route>
              <Route
                path={`/search`}
                element={<Search />}
              ></Route>
              <Route
                path={`/player`}
                element={<Player />}
              ></Route>
            </Routes>
            {/* <Body />
            <Search /> */}
          </div>
        </div>
      </div>
  );
}

export default Spotify;
