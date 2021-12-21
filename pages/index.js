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
  const [inputValue, setInputValue] = useState("");

  async function getStreamer() {
    setLoading(true)
    await axios.get(`https://api.twitch.tv/helix/users?login=${streamerName}`, {
      headers: {
        'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
        'Authorization': 'Bearer 2nrfe70of4wf2wp3veg6j4chhf9mgp'
      }
    })
    .then((res) => {
      // console.log(res.data)
      setStreamer(res.data)
      
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  async function getClips() {
    setLoading(true)
    await axios.get(`https://api.twitch.tv/helix/clips?broadcaster_id=${streamer.id}&started_at=2021-12-02T15:04:05Z&first=3`, {
      headers: {
        'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
        'Authorization': 'Bearer 2nrfe70of4wf2wp3veg6j4chhf9mgp'
      }
    })
    .then((res) => {
      // console.log(res.data)
      setClips(res.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  

  useEffect(() => {
    streamerName ? axios.get(`https://api.twitch.tv/helix/users?login=${streamerName}`, {
        headers: {
          'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
          'Authorization': 'Bearer 2nrfe70of4wf2wp3veg6j4chhf9mgp'
        }
      })
      .then(res => {
        setStreamer(res.data)
      })
      .then(streamer => axios.get(`https://api.twitch.tv/helix/clips?broadcaster_id=${streamer.id}&started_at=2021-12-02T15:04:05Z&first=3`, {
        headers: {
          'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
          'Authorization': 'Bearer 2nrfe70of4wf2wp3veg6j4chhf9mgp'
        }
      }))
      .then(res => {
        setClips(res.data)
      }) : null
    
    
  }, [streamerName])
  

  
  return (
    <div>
      <Header
        setStreamerName={setStreamerName}
        inputValue={inputValue}
        setInputValue={setInputValue}
       />
      <section className='main'>

      {loading ? 'loading' : <Image src={staticData.data[0].profile_image_url} height={100} width={100} />}

      
      </section>
      <div className='clipHeader'>
        Top 3 Clips <br />
        From
      </div>
      <Clips
        clips={clips}
        staticData2={staticData2} 
      />
    </div>
  )
}

export const getStaticProps = async () => {
  
  const res =  await fetch('https://api.twitch.tv/helix/users?login=mizkif', {
    headers: {
      'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
      'Authorization': 'Bearer 2nrfe70of4wf2wp3veg6j4chhf9mgp'
    }
  })

  const res2 =  await fetch('https://api.twitch.tv/helix/clips?broadcaster_id=94753024&started_at=2021-12-02T15:04:05Z&first=3', {
    headers: {
      'Client-ID': 'xe7yonvirsz4ob4vahgs256d6si79q',
      'Authorization': 'Bearer 2nrfe70of4wf2wp3veg6j4chhf9mgp'
    }
  })
  
          const data = await res.json()
          const data2 = await res2.json()
          
          if (!data) {
           return {
             notFound: true,
           }
         }

           return {
               props: { staticData: data,
                        staticData2: data2 }
           }
}
