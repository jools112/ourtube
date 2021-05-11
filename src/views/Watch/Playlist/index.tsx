import React from 'react'
import { VideoSummary } from '../../Explore/VideoSummary/VideoSummary'
import { usePlaylist } from './playlistService'

const Playlist: React.FC = () => {
  const videos = usePlaylist("7EXjFe3blAyQ8NeGFWFt").slice(1)
  return (
    <>
      {
        videos.map(video => {
          return (
            <VideoSummary videoID={video.id} />
          )
        })
      }
    </>
  )
}


export default Playlist