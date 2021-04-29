import './Watch.css'
import { RatingBox } from './Rating/RatingBox'
import { Poll } from './Poll/Poll'
import { VideoPlayer } from './VideoPlayer/VideoPlayer'
import { VideoSearch } from './VideoSearch/VideoSearch'

export const Watch = () => {
  return (
    <div class="watchMainCont">
      <div>
        <VideoPlayer />
        <br />
        <RatingBox />
        <Poll />
      </div>
      <VideoSearch />
    </div>
  )
}
