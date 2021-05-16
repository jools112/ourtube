import React from 'react'
import { VideoSummary } from '../../Explore/VideoSummary/VideoSummary'
import { usePlaylist } from './playlistService'
import './Playlist.css'
import { useSelector } from 'react-redux'

const Playlist: React.FC = () => {
  const currentGroup = useSelector((state: any) => state.groups.currentGroup)
  const videos = usePlaylist(currentGroup).slice(1)
  return (
    <div className="playlist">
      <p>Playlist</p>
      {videos.map((video, index) => {
        return <VideoSummary videoID={video.id} mini="true" key={index} />
      })}
    </div>
  )
}

export default Playlist
