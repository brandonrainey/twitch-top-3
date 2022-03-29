import react, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import Header from '../components/Header'
import Clips from '../components/Clips'
import ErrorBoundary from '../components/ErrorBoundary'

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
              Authorization: 'Bearer y7ky0ocbrcj2elmahlox7q23yky3jx',
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
                  Authorization: 'Bearer y7ky0ocbrcj2elmahlox7q23yky3jx',
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
                  Authorization: 'Bearer y7ky0ocbrcj2elmahlox7q23yky3jx',
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

  console.log(clips)
  return (
    <div>
      <ErrorBoundary>
        <Header
          setStreamerName={setStreamerName}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </ErrorBoundary>

      <div className="clipHeader">
        Top 3 Recent Clips <br />
        From <br />
        <div className="headerName">
          {streamer ? streamer.data[0].display_name : null} <br />
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
            <ErrorBoundary>
              <Image
                src={streamer.data[0].profile_image_url}
                layout="fill"
                className={`profileImage `}
              />
            </ErrorBoundary>
          </a>
        ) : (
          <a
            href={`https://twitch.tv/${staticData.data[0].login}`}
            className="imageLink"
          >
            <ErrorBoundary>
              <Image
                src={staticData.data[0].profile_image_url}
                layout="fill"
                className="profileImage"
              />
            </ErrorBoundary>
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
      <ErrorBoundary>
        <Clips clips={clips} staticData2={staticData2} />
      </ErrorBoundary>
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('https://api.twitch.tv/helix/users?login=mizkif', {
    headers: {
      'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
      Authorization: 'Bearer y7ky0ocbrcj2elmahlox7q23yky3jx',
    },
  })

  const res2 = await fetch(
    `https://api.twitch.tv/helix/clips?broadcaster_id=94753024&started_at=2021-12-02T15:04:05Z&first=3`,
    {
      headers: {
        'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
        Authorization: 'Bearer y7ky0ocbrcj2elmahlox7q23yky3jx',
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
