import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import "./Body.css";
import cassette_side_blu from "../assets/cassette_side_blu.png";
import { NavLink } from "react-router-dom";

function Body() {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();
  useEffect(() => {
    const getPlaylist = async () => {
      const response = await axios
        .get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
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
        // console.log(response);
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        images: response.data.images[0] ? response.data.images[0].url : null,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          image: track.album.images[0] ? track.album.images[0].url : null,
          contexturi: response.data.uri,
          tracknumber: track.track_number,
          external_urls: track.external_urls.spotify,
          trackuri: track.uri
        })),
      };
      // console.log(response);
      // console.log(selectedPlaylist)
      dispatch({
        type: reducerCases.SET_PLAYLIST,
        selectedPlaylist,
      });
    };
    getPlaylist();
  }, [token, dispatch, selectedPlaylistId]);
  const playTrack = async (id, name, image, context_uri, track_number, uri) => {
    const response = await axios
      .put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri,
          offset: {
            uri: uri,
          },
          position_ms: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
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

      if (response) {
        if (response.status === 204) {
          const currentPlaying = {
            id,
            name,
            image,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
          dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        } else {
          dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        }
      } else {
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      }
    
  };
  return (
    <div className="bodyView">
      {selectedPlaylist && (
        <>
          <div className="titledesc">
            <div>
              <h1 className="playlistName">{selectedPlaylist.name}</h1>
              <h2 className="playlistDesc">{selectedPlaylist.description}</h2>
            </div>
          </div>

          <ul className="trackView">
            {selectedPlaylist.tracks.map(
              ({ id, name, image, contexturi, tracknumber, trackuri }) => (
                <li className="viewSong" key={id}>
                  <div
                    className="sidetapetrack"
                    onClick={() =>
                      playTrack(
                        id,
                        name,
                        image,
                        contexturi,
                        tracknumber,
                        trackuri
                      )
                    }
                  >
                    <img
                      className="cassette_side_track"
                      src={cassette_side_blu}
                      alt="ini gambar samping kaset"
                    />
                    <img className="songcover" src={image} alt="" />
                    <div className="tracktitle">{name}</div>
                  </div>
                  <div className="dropdown">
                    <div className="dropdown-content">
                      <NavLink to={`/details/${id}#access_token=${token}`}>
                        <button>View Details</button>
                      </NavLink>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default Body;
