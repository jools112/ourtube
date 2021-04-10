import { Rating } from './Rating/Rating'
import { Poll } from './Poll/Poll'
import { VideoPlayer } from './VideoPlayer/VideoPlayer'

export const Watch = () => {
  return (
    <div>
      Let's watch some videos together!
      <Rating />
      <Poll />
      {/*<VideoPlayer />*/}
    </div>
  )
}
