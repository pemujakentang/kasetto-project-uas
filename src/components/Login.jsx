import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [client_id, setClientId] = useState("");
  const handleChange = (event) => {
    setClientId(event.target.value);
  };
  const handleClick = () => {
    if (client_id.length == 32) {
      const clientId = client_id;
      console.log(clientId);
      const redirectUrl = window.location.origin;
      const apiUrl = "https://accounts.spotify.com/authorize";
      const scope = [
        "user-read-private",
        "user-read-email",
        "user-modify-playback-state",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-top-read",
        "user-library-read",
        "user-read-playback-position",
        "playlist-read-private",
        "playlist-read-collaborative",
        "streaming",
      ];
      window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
        " "
      )}&response_type=token&show_dialog=true`;
    } else {
      alert("Invalid clientID");
    }
  };
  return (
    <div className="login_container">
      <div className="info_container">
        <div>
          Masuk ke{" "}
          <a target="_blank" href="https://developer.spotify.com/dashboard">
            https://developer.spotify.com/dashboard
          </a>{" "}
        </div>
        <div>
          Klik Create App
        </div>
        <div>Isi App Name bebas, App Description bebas, Website bebas</div>
        <div>Isi Redirect URI dengan url website ini</div>
        <div>Save, kemudian masuk ke Settings (Pojok Kanan Atas)</div>
        <div>Copy Client ID dan masukkan ke kolom Client ID di sini</div>
      </div>
      <input
        className="clientid_input"
        id="id_input"
        type="text"
        placeholder="Input Client ID"
        onChange={handleChange}
      />
      <button className="button" onClick={handleClick}>
        Login to Spotify
      </button>
    </div>
  );
}

export default Login;
