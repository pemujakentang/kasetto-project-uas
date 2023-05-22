import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

function PlayerControls(props) {
  const [{ token, playerState }, dispatch] = useStateProvider();
  const changeTrack = async (type) => {
    await axios
      .post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        // console.log(error);
        // console.log(error.response.status)
        if (error.response.status == 401) {
          window.location = "/";
        }
      });

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
    //   console.log(response);
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
    const getPlayerState = async () => {
      const response = await axios
        .get(`https://api.spotify.com/v1/me/player`, {
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
        console.log("playerstate")
        console.log(response.data.is_playing);
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState:response.data.is_playing
        });
    };
    getPlayerState();
  }, [token, playerState, dispatch]);

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    const response = await axios
      .put(
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // console.log(error);
        // console.log(error.response.status)
        if (error.response.status == 401) {
          window.location = "/";
        }
      });
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };

  return (
    <div>
      PlayerControls
      <div className="state">
        {playerState ? (
          <button onClick={() => changeState()}>Pause</button>
        ) : (
          <button onClick={() => changeState()}>Play</button>
        )}
      </div>
      <div className="previous">
        <button onClick={() => changeTrack("previous")}>Prev</button>
      </div>
      <div className="next">
        <button onClick={() => changeTrack("next")}>Next</button>
      </div>
      <div className="shuffle">
        <button>Shuffle</button>
      </div>
    </div>
  );
}

export default PlayerControls;
