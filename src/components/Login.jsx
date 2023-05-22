import React from "react";
import styled from "styled-components";

function Login() {
  const handleClick = () => {
    const clientId = "843015e76322448ca72fd3ed917669c1";
    const redirectUrl = "http://localhost:3000";
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
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <Container>
      <img src="" alt="" />
      <button onClick={handleClick}>Login to Spotify</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  button {
    background-color: green;
    color: white;
    padding: 10px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    cursor: pointer;
    padding: 1rem 3rem;
  }
`;

export default Login;
