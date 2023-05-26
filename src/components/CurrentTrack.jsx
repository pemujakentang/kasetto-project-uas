import React, { useEffect } from "react";
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
    console.log(response);
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
    }, 1000);
    getCurrentTrack();
    return () => clearInterval(getInterval)
  }, [token, dispatch]);
  // getCurrentTrack();
  return (
    <div>
      {currentlyPlaying && (
        <div className="track">
          <div className="trackimage">
            <img src={currentlyPlaying.image} alt="current Song" srcset="" />
          </div>
          <div className="trackinfo">
            <img className="tapeView" src={tape} alt="" />
            <h4>{currentlyPlaying.name}</h4>
            <p>{currentlyPlaying.artists.join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentTrack;
