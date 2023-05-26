import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

function Starter(props) {
    const [{ token, deviceId }, dispatch] = useStateProvider();
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
      if (target) {
        dispatch({type: reducerCases.SET_DEVICE_ID, deviceId: target.id})
      }
    };
  return (
    <div>
      <button className="startButton" onClick={()=>getDevices()}>Start Device</button>
    </div>
  );
}

export default Starter;
