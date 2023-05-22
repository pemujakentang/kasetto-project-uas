import axios from "axios";
import React from "react";
import { useStateProvider } from "../utils/StateProvider";

function Volume(props) {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
    await axios
      .put(
        `https://api.spotify.com/v1/me/player/volume`,
        {},
        {
          params: {
            volume_percent: parseInt(e.target.value),
          },
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        // console.log(error);
        // console.log(error.response.status)
        if (error.response.status === 401) {
          window.location = "/";
        }
      });
  };
  return (
    <div>
      <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
    </div>
  );
}

export default Volume;
