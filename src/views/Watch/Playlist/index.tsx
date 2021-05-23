import React from 'react'
import { VideoSummary } from '../../Explore/VideoSummary/VideoSummary'
import { usePlaylist } from './playlistService'
import './Playlist.css'
import { useSelector } from 'react-redux'
import { SoftBox } from '../../../components/SoftBox'

const Playlist: React.FC = () => {
  const currentGroup = useSelector((state: any) => state.groups.currentGroup)
  const videos = usePlaylist(currentGroup).slice(1)
  return (
    <div className="playlistWrapper">
      <SoftBox
        title="Playlist"
        content={
          <div className="playlist">
            {usePlaylist(currentGroup).length > 1 ? (
              <div>
                <div className="playlistInner">
                  {videos.map((video, index) => {
                    return (
                      <VideoSummary
                        videoID={video.id}
                        mini="true"
                        key={index + ':' + video.id}
                      />
                    )
                  })}
                </div>
              </div>
            ) : (
              "Add more videos by using the below search bar. Type in a search term and click on the result you'd like to add."
            )}
          </div>
        }
      />
    </div>
  )
}

export default Playlist
