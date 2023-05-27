import React, { useEffect } from "react";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import { useStateProvider } from "../utils/StateProvider";
import "./Player.css";
import cassette_front from "../assets/cassette_front.png";
import Queue from "./Queue";
import logo_kasetto from "../assets/logo_kasetto_2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faShuffle,
  faBackward,
  faForward,
  faRepeat,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

function Player(props) {
  const [{ token }] = useStateProvider();
  return (
    <div className="player-container">
      {/* <Volume/> */}
      <div className="player_pos">
        <div className="player_full">
          <div className="player_top_container">
            <div className="player_top_render">
              <CurrentTrack />
            </div>
          </div>
          <Queue />
          <div className="player_logo">
            <img
              className="logo_kasetto"
              src={logo_kasetto}
              alt="Logo Kasetto"
            />
          </div>
          <PlayerControls />
        </div>
      </div>
    </div>
  );
}

export default Player;
