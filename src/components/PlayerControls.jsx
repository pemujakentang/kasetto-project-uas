import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

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
        {shuffleState ? (
          <button onClick={() => changeShuffle()}>UnShuffle</button>
        ) : (
          <button onClick={() => changeShuffle()}>Shuffle</button>
        )}
      </div>
    </div>
  );
}

export default PlayerControls;
