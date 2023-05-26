import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import './Playlists.css'
import cassette_side from "../assets/cassette_side.png";
import { NavLink } from "react-router-dom";

function Playlists() {
  const [{ token, playlists}, dispatch] = useStateProvider();
  
  const getPlaylistData = async () => {
    const response = await axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
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
    const { items } = response.data;
    const playlists = items.map(({ name, id }) => {
      return { name, id };
    });
    dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    // console.log(response)
    // console.log(items)
    // console.log(playlists)
  };
  
  useEffect(() => {
    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId)=>{
    //tambah code buat loop through isi playlist, add all to queue
    dispatch({type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId})
  }
  return (
    <div>
      <ul className="playlists">
        
        {playlists.map(({ name, id }) => {
          return (
            <NavLink to={`/#access_token=${token}`}>
              <li className="playlist" key={id} onClick={() => changeCurrentPlaylist(id)}>
              <div className="sidetape">
                <img
                  className="cassette_side"
                  src={cassette_side}
                  alt="ini gambar samping kaset"
                />
                <div className="textside">{name}</div>
              </div>
            </li>
            </NavLink>
            
          );
        })}
      </ul>
    </div>
  );
}

export default Playlists;
