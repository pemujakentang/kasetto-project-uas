import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateProvider } from "../utils/StateProvider";
import "./viewDetails.css";

function ViewDetails(props) {
  const [{ token }] = useStateProvider();
  const [songDeets, setDetails] = useState(null);
  const { id } = useParams();

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  useEffect(() => {
    const getSong = async () => {
      // console.log(id)
      const response = await axios
        .get(`https://api.spotify.com/v1/tracks/${id}`, {
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
      console.log(response.data);
      const songDetails = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.album.images[0].url,
        duration: millisToMinutesAndSeconds(response.data.duration_ms),
        artists: response.data.artists.map((artist) => ({
          name: artist.name,
          href: artist.href,
          id: artist.id,
        })),
        // artists: response.data.artists.map((artist) => artist.name),
        uri: response.data.uri,
        album_type: response.data.album.album_type,
        album_image: response.data.album.images[0].url,
        album_name: response.data.album.name,
        release_date: response.data.album.release_date,
        album_id: response.data.album.id
      };
      console.log(songDetails);
      setDetails(songDetails);
    };
    getSong();
  }, [token, setDetails]);

  return (
    <div>
      {songDeets && (
        <div className="containergede">
          <div className="details-container">
            <img src={songDeets.image} alt={songDeets.name} />
            <div className="details-info">
              <h1>{songDeets.name}</h1>
              <h3>Duration: {songDeets.duration}</h3>
              <div className="artists">
                <h2><strong>Artists</strong></h2>
                {songDeets.artists.map((artist) => (
                  <h3 className="artist">{artist.name}</h3>
                ))}
              </div>
              <div className="album_info">
                <h2>Album Info</h2>
                <h3>Name: {songDeets.album_name}</h3>
                <h3>Type: {songDeets.album_type}</h3>
                <h3>Release Date: {songDeets.release_date}</h3>
              </div>
              {/* <div className="actions">
                <button className="buttonAlbum">
                    Play Album
                </button>
                <button className="buttonPlay">
                    Play Track
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewDetails;
