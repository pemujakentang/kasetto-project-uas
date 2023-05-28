import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import tape from "../assets/cassette_front.png";
import "./CurrentTrack.css";

function CurrentTrack(props) {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  const getCurrentTrack = async () => {
    const response = await axios
      .get(`https://api.spotify.com/v1/me/player/currently-playing`, {
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
    // console.log(response);
    if (response.data.item != null) {
      const { item } = response.data;
      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        image: item.album.images[0].url,
        artists: item.artists.map((artist) => artist.name),
      };
      dispatch({
        type: reducerCases.SET_PLAYING,
        currentlyPlaying,
      });
      // console.log(currentlyPlaying);
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
    }
  };
  
  useEffect(() => {
    const getInterval = setInterval(() => {
      getCurrentTrack();
    }, 2000);
    getCurrentTrack();
    return () => clearInterval(getInterval);
  }, [token, dispatch]);
  // getCurrentTrack();
  return (
    <div>
      {currentlyPlaying && (
        <>
          <div className="player_top">
            <div className="player_container">
              <div className="player_ui-left">
                <div className="player_cover">
                  <img
                    src={
                      currentlyPlaying.image
                        ? currentlyPlaying.image
                        : "https://community.mp3tag.de/uploads/default/original/2X/a/acf3edeb055e7b77114f9e393d1edeeda37e50c9.png"
                    }
                    alt="Cover Album"
                  />
                </div>
              </div>
              <div className="player_ui-right">
                <div className="player_tapecontain">
                  <div className="player_tapedantulisan">
                    <img className="cassette_front" src={tape} alt="Kaset" />
                    <div className="tape_text">{currentlyPlaying.name}</div>
                    <div className="tape_penyanyi">
                      {currentlyPlaying.artists.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CurrentTrack;
