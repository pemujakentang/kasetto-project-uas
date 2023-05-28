import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faShuffle,
  faBackward,
  faForward,
  faRepeat,
  faPowerOff,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

import "./PlayerControls.css";

function PlayerControls(props) {
  const [
    { token, playerState, playerStatus, currentlyPlaying, shuffleState },
    dispatch,
  ] = useStateProvider();
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
      const playerstatus = {
        is_playing: response.data.is_playing,
        progress_ms: response.data.progress_ms,
        repeat_state: response.data.repeat_state,
        shuffle_state: response.data.shuffle_state,
      };
      // console.log("playerstate");
      // console.log(response.data.is_playing);
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: response.data.is_playing,
      });
      // console.log(playerstatus);
      dispatch({
        type: reducerCases.SET_PLAYER_STATUS,
        playerStatus: playerstatus,
      });
      dispatch({
        type: reducerCases.SET_SHUFFLE_STATE,
        shuffleState: playerstatus.shuffle_state,
      });
      // console.log(playerStatus);
    };
    getPlayerState();
  }, [token, dispatch]);

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

  const changeShuffle = async () => {
    const state = shuffleState;
    await axios
      .put(
        `https://api.spotify.com/v1/me/player/shuffle?state=${!state}`,
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
    // console.log(playerStatus)
    // console.log(state);
    playerStatus.shuffle_state = !playerStatus.shuffle_state;
    dispatch({
      type: reducerCases.SET_PLAYER_STATUS,
      playerStatus: playerStatus,
    });
    dispatch({
      type: reducerCases.SET_SHUFFLE_STATE,
      shuffleState: !shuffleState,
    });
  };

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
      // console.log(response);
    };
    getDevices();
  }, [token]);

  const PlayHere = async () => {
    const devInfo = await axios
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
    const { devices } = devInfo.data;
    const target = devices.find(
      (device) => device.name === "Spotify Web Player"
    );
    if (target) {
      await axios.put(
        `https://api.spotify.com/v1/me/player`,
        {
          device_ids: [target.id],
          play: true,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
    }
  };
  return (
    <div className="player_controls_container">
      <div className="player_buttons">
        <div id="playerControls">
          <div className="powerButton">
            <button id="buttonGreen" onClick={() => PlayHere()}>
              <FontAwesomeIcon icon={faPowerOff} />
            </button>
          </div>
          <div className="state">
            {playerState ? (
              <button id="buttonRed" onClick={() => changeState()}>
                <FontAwesomeIcon icon={faPause} />
              </button>
            ) : (
              <button id="buttonRed" onClick={() => changeState()}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
            )}
          </div>
          <div className="shuffle">
            {shuffleState ? (
              <button id="buttonBlack" onClick={() => changeShuffle()}>
                <FontAwesomeIcon
                  style={{ color: "lightgreen" }}
                  icon={faShuffle}
                />
              </button>
            ) : (
              <button id="buttonBlack" onClick={() => changeShuffle()}>
                <FontAwesomeIcon icon={faShuffle} />
              </button>
            )}
          </div>
          <div className="prevnext">
            <button id="buttonBlack" onClick={() => changeTrack("previous")}>
              <FontAwesomeIcon icon={faBackward} />
            </button>
            <button id="buttonBlack" onClick={() => changeTrack("next")}>
              <FontAwesomeIcon icon={faForward} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerControls;
