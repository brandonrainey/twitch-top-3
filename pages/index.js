import react, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import Header from "../components/Header";
import Clips from "../components/Clips";

export default function Home({ staticData, staticData2 }) {
  const [clips, setClips] = useState();
  const [streamer, setStreamer] = useState();
  const [streamerName, setStreamerName] = useState();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    streamerName
      ? axios
          .get(`https://api.twitch.tv/helix/users?login=${streamerName}`, {
            headers: {
              "Client-ID": "xe7yonvirsz4ob4vahgs256d6si79q",
              Authorization: "Bearer 2nrfe70of4wf2wp3veg6j4chhf9mgp",
            },
          })
          .then((res) => {
            setStreamer(res.data);
            console.log(streamer);
            return res.data;
          })
          .then((streamer) =>
            axios.get(
              `https://api.twitch.tv/helix/clips?broadcaster_id=${streamer.data[0].id}&started_at=2021-12-02T15:04:05Z&first=3`,
              {
                headers: {
                  "Client-ID": "xe7yonvirsz4ob4vahgs256d6si79q",
                  Authorization: "Bearer 2nrfe70of4wf2wp3veg6j4chhf9mgp",
                },
              }
            )
          )
          .then((res) => {
            setClips(res.data);
          })
      : null;
  }, [streamerName]);

  console.log(clips)
  return (
    <div>
      <Header
        setStreamerName={setStreamerName}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <div className="clipHeader">
        Top 3 Clips <br />
        From <br />
        {streamer ? streamer.data[0].display_name : null}
      </div>

      <section className="main">
        {streamer ? (
          <a href={`https://twitch.tv/${streamer.data[0].login}`}>
            <Image
              src={streamer.data[0].profile_image_url}
              height={100}
              width={100}
              className="profileImage"
            />
          </a>
        ) : (
          <a href={`https://twitch.tv/${staticData.data[0].login}`}>
            <Image
              src={staticData.data[0].profile_image_url}
              height={100}
              width={100}
              className="profileImage"
            />
          </a>
        )}
      </section>
      <Clips clips={clips} staticData2={staticData2} />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://api.twitch.tv/helix/users?login=mizkif", {
    headers: {
      "Client-ID": "xe7yonvirsz4ob4vahgs256d6si79q",
      Authorization: "Bearer 2nrfe70of4wf2wp3veg6j4chhf9mgp",
    },
  });

  const res2 = await fetch(
    "https://api.twitch.tv/helix/clips?broadcaster_id=94753024&started_at=2021-12-02T15:04:05Z&first=3",
    {
      headers: {
        "Client-ID": "xe7yonvirsz4ob4vahgs256d6si79q",
        Authorization: "Bearer 2nrfe70of4wf2wp3veg6j4chhf9mgp",
      },
    }
  );

  const data = await res.json();
  const data2 = await res2.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { staticData: data, staticData2: data2 },
  };
};
