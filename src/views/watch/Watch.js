import { RatingBox } from './Rating/RatingBox'
import { Poll } from './Poll/Poll'
import { VideoPlayer } from './VideoPlayer/VideoPlayer'

export const Watch = () => {
  return (
    <div>
      <VideoPlayer />
      <br />
      <RatingBox />
      <Poll />
    </div>
  )
}
