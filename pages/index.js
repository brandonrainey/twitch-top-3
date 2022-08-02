import react, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import Header from '../components/Header'
import Clips from '../components/Clips'


export default function Home({ staticData, staticData2 }) {
  const [clips, setClips] = useState()
  const [streamer, setStreamer] = useState()
  const [streamerName, setStreamerName] = useState()
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [streamerInfo, setStreamerInfo] = useState()
  const [streamerData, setStreamerData] = useState()

  const today = new Date()
  const lastWeek = new Date(today.setDate(today.getDate() - 7))
  const formattedDate = lastWeek.toISOString()

  useEffect(() => {
    streamerName
      ? axios
          .get(`https://api.twitch.tv/helix/users?login=${streamerName}`, {
            headers: {
              'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_KEY}`,
            },
          })
          .then((res) => {
            setStreamer(res.data)
            return res.data
          })
          .catch((error) => {
            console.log(error)
          })

          .then((streamer) =>
            axios.get(
              `https://api.twitch.tv/helix/clips?broadcaster_id=${streamer.data[0].id}&started_at=${formattedDate}&first=3`,
              {
                headers: {
                  'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_KEY}`,
                },
              }
            )
          )
          .then((res) => {
            setClips(res.data)
          })
          .catch((error) => {
            console.log(error)
          })
          .then(() =>
            axios.get(
              `https://api.twitch.tv/helix/search/channels?query=${streamerName}`,
              {
                headers: {
                  'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_KEY}`,
                },
              }
            )
          )
          .then((res) => {
            const newData = res.data

            const filteredData = newData.data.filter(
              (item) => item.broadcaster_login === streamerName
            )
            setStreamerInfo(filteredData)
          })
          .catch((error) => {
            console.log(error)
          })
      : null
  }, [streamerName])

  
  
  return (
    <div>
      
        <Header
          setStreamerName={setStreamerName}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      

      <div className="clipHeader">
        Top 3 Recent Clips <br />
        From <br />
        <div className="headerName">
          {streamer ? streamer.data[0].display_name : 'shroud'} <br />
        </div>
      </div>

      <section className="main">
        {streamer ? (
          <a
            href={`https://twitch.tv/${streamer.data[0].login}`}
            className={`imageLink ${
              streamerInfo
                ? streamerInfo[0].is_live == true
                  ? 'glow'
                  : 'Offline'
                : null
            }`}
          >
            
              <Image
                src={streamer.data[0].profile_image_url}
                layout="fill"
                className={`profileImage `}
                placeholder='blur'
                blurDataURL={streamer.data[0].profile_image_url}
              />
            
          </a>
        ) : (
          <a
            href={`https://twitch.tv/${staticData.data[0].login}`}
            className="imageLink"
          >
            
              <Image
                src={staticData.data[0].profile_image_url}
                layout="fill"
                className="profileImage"
              />
            
          </a>
        )}
        <div
          className={`${
            streamerInfo
              ? streamerInfo[0].is_live == true
                ? 'liveText'
                : 'offlineText'
              : null
          }`}
        >
          {streamerInfo
            ? streamerInfo[0].is_live == true
              ? 'Live'
              : 'Offline'
            : null}
        </div>
      </section>
      <div className='transitionBar'></div>
      
        <Clips clips={clips} staticData2={staticData2} />
      
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('https://api.twitch.tv/helix/users?login=shroud', {
    headers: {
      'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_KEY}`,
    },
  })

  const res2 = await fetch(
    `https://api.twitch.tv/helix/clips?broadcaster_id=37402112&started_at=2022-07-22T15:04:05Z&first=3`,
    {
      headers: {
        'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_KEY}`,
      },
    }
  )

  const data = await res.json()
  const data2 = await res2.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { staticData: data, staticData2: data2 },
  }
}
