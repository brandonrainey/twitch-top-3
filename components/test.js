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
