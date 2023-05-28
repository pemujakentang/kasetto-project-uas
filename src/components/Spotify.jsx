import React, { useEffect, useState } from "react";
import "./Spotify.css";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Player from "./Player";
import ViewDetails from "./viewDetails";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Navbar from "./Navbar";
import Search from "./Search";
import AboutUs from "./AboutUs";

function Main() {
  const [{ token, deviceId }, dispatch] = useStateProvider();

  useEffect(() => {
    const getDevices = async () => {
      const response = await axios
        .get(`https://api.spotify.com/v1/me/player/devices`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .catch((error) => {
          // console.log(error);
          // console.log(error.response.status)
          if (error.response.status == 401) {
            window.location = "/";
          }
        });
      console.log(response);
      const { devices } = response.data;
      const target = devices.find(
        (device) => device.name === "Spotify Web Player"
      );
      console.log(target);
      // dispatch({type: reducerCases.SET_DEVICE_ID, deviceId: target.id})
    };
    getDevices();
    console.log(deviceId);
  }, [token, deviceId]);

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
        });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
        pfp: data.images[0].url,
      };
      // console.log(userInfo);
      const pathname = window.location.pathname;
      console.log("Pathname: " + pathname);
      // window.history.pushState({}, null, "/");
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);

  const getDevices = async () => {
    const response = await axios
      .get(`https://api.spotify.com/v1/me/player/devices`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        // console.log(error);
        // console.log(error.response.status)
        if (error.response.status == 401) {
          window.location = "/";
        }
      });
    console.log(response);
    const { devices } = response.data;
    const target = devices.find(
      (device) => device.name === "Spotify Web Player"
    );
    console.log(target);
    // dispatch({type: reducerCases.SET_DEVICE_ID, deviceId: target.id})
  };
  return (
    <div className="container">
      <Sidebar />
      <div className="spotify_body">
        <div className="body_navbar">
          <Navbar />
        </div>
        <div className="body_contents">
          <Routes>
            <Route index element={<Player />}></Route>
            <Route path={`/search`} element={<Search />}></Route>
            <Route path={`/playlist`} element={<Body />}></Route>
            <Route path={`/details/:id`} element={<ViewDetails />}></Route>
            <Route path={`/about`} element={<AboutUs />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Main;
