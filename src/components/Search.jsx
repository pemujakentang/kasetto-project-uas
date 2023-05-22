import React, { useEffect, useState } from "react";
import "./Search.css";
import { FaSearch } from "react-icons/fa";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import {NavLink} from "react-router-dom"
import cassette_side from "../assets/cassette_side.png";
import cassette_side_blu from "../assets/cassette_side_blu.png";
import cassette_side_red from "../assets/cassette_side_red.png";

function Search() {
  const [{ token, searchResults }, dispatch] = useStateProvider();
  const [searchInput, setSearchInput] = useState("");
  const [searchRes, setRes] = useState(null);
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    // dispatch({ type: reducerCases.SET_SEARCH_RESULTS, searchRes });
  });

  async function search() {
    console.log(searchInput);
    var response = await axios
      .get(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track%2Cartist%2Cplaylist%2Calbum&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    if (response) {
      console.log(response);
      var results = response.data;
      console.log(results);
      var tracks = results.tracks.items;
      var playlists = results.playlists.items;
      // var albums = results.albums.items;
      console.log(tracks);
      console.log(playlists);
      // console.log(albums);
      setRes(results);
      dispatch({ type: reducerCases.SET_SEARCH_RESULTS, searchRes });
      console.log(searchResults);
    }
  }

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  const playTrack = async (id, name, image, context_uri, track_number) => {
    const response = await axios
      .put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri,
          offset: {
            position: track_number - 1,
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
  };
  return (
    <div
      className="search_container"
      // onFocus={() => setIsFocused(true)}
      // onBlur={() => setIsFocused(false)}
    >
      <div className="search_bar">
        <FaSearch />
        <input
          className="search_input"
          id="search"
          type="text"
          placeholder="Search"
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              search();
            }
          }}
        />
      </div>
      <div id="#search_results">
        <ul className={`search_results ${isFocused ? "visible" : ""}`}>
          {searchRes &&
            searchRes.tracks.items.map((track) => {
              return (
                <li
                  key={track.id}
                  onClick={() =>
                    playTrack(
                      track.id,
                      track.name,
                      track.album.images[0] ? track.album.images[0].url : null,
                      track.album.uri,
                      track.track_number
                    )
                  }
                >
                  <div className="sidetape">
                      <img
                        className="cassette_side"
                        src={cassette_side_blu}
                        alt="ini gambar samping kaset"
                      />
                      <div className="textside">{track.name}</div>
                  </div>
                </li>
              );
            })}
          {searchRes &&
            searchRes.playlists.items.map((playlist) => {
              return (
                <NavLink to={`/#access_token=${token}`}>
                  <li
                    className="playlist"
                    key={playlist.id}
                    onClick={() => changeCurrentPlaylist(playlist.id)}
                  >
                    <div className="sidetape">
                      <img
                        className="cassette_side"
                        src={cassette_side}
                        alt="ini gambar samping kaset"
                      />
                      <div className="textside">{playlist.name}</div>
                    </div>
                  </li>
                </NavLink>
              );
            })}
          {/* {searchRes &&
            searchRes.albums.items.map((album) => {
              return (
                <li key={album.id}>
                  <div className="sidetape">
                    <a href={album.external_urls.spotify} target="_blank">
                      <img
                        className="cassette_side"
                        src={cassette_side_red}
                        alt="ini gambar samping kaset"
                      />
                      <div className="textside">{album.name}</div>
                    </a>
                  </div>
                </li>
              );
            })} */}
        </ul>
      </div>
    </div>
  );
}

export default Search;
