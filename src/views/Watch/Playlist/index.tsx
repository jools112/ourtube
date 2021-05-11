import React from 'react'
import { VideoSummary } from '../../Explore/VideoSummary/VideoSummary'
import { usePlaylist } from './playlistService'
import './Playlist.css'

const Playlist: React.FC = () => {
  const videos = usePlaylist("7EXjFe3blAyQ8NeGFWFt").slice(1)
  return (
    <div className="playlist">
      <p>Playlist</p>
      {
        videos.map(video => {
          return (
            <VideoSummary videoID={video.id} mini="true" />
          )
        })
      }
    </div>
  )
}


export default Playlist