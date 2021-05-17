import React from 'react'
import { VideoSummary } from '../VideoSummary/VideoSummary'
import { useRatedVideos } from './useRatedVideos'

export const RatedVideos: React.FC = () => {
  const videos = useRatedVideos()
  return (
    <>
      <h2>Top rated videos on OurTube</h2>
      {videos.slice(0).map((id, index) => (
        <VideoSummary videoID={id} key={id + ':' + index} />
      ))}
    </>
  )
}
