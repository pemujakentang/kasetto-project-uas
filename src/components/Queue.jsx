import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";

function Queue(props) {
  const [{ token }, dispatch] = useStateProvider();
  const [queue, setQueue] = useState([
    {
      name: "Unknown",
      artists: ["Unknown"],
    },
  ]);
  const getQueue = async () => {
    const response = await axios
      .get(`https://api.spotify.com/v1/me/player/queue`, {
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
    //   console.log(response.data.queue);
    if (response.data.queue.length > 0) {
      const myQueue = response.data.queue.map((item) => ({
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
      }));
      console.log("Queue");
      console.log(myQueue);
      setQueue(myQueue);
    }
    //   if (response.data) {

    // setQueue(myQueue);
  };

  useEffect(() => {
    const getInterval = setInterval(() => {
      getQueue();
    }, 2000);
    getQueue();
    return () => clearInterval(getInterval);
  }, [token, dispatch]);
  return (
    <>
      <div className="player_box">
        <div className="player_runningtxt">
          {queue && (
            <marquee
              width="100%"
              direction="left"
              height="100%"
              className="marquee"
            >
              Next Song: " {queue[0].name} " By {queue[0].artists.join(", ")}
            </marquee>
          )}
        </div>
      </div>
      <div className="player_bottom">
        <div className="player_bottomin">
          <div className="player_queue">
            <div className="player_textq">Queue</div>
            <div className="player_queuelist">
              <ul className="queue_songlist">
                {queue.map(({ name, artists })=>{
                    return(<li>" <strong>{name}</strong> " By {artists.join(", ")}</li>)
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Queue;
