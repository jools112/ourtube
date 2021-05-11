import React from 'react'
import { VideoSummary } from '../VideoSummary/VideoSummary'
import { useRatedVideos } from './useRatedVideos'

export const RatedVideos: React.FC = () => {
  const videos = useRatedVideos()
  return (<>
    <p>Top rated videos on OurTube</p>
    {videos.slice(0).map((id) => <VideoSummary videoID={id} />)}
  </>)
}