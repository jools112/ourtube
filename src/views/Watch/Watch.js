import './Watch.css'
import { RatingBox } from './Rating/RatingBox'
import { Poll } from './Poll/Poll'
import { VideoPlayer } from './VideoPlayer/VideoPlayer'
import { VideoSearch } from './VideoSearch/VideoSearch'

export const Watch = () => {
  return (
    <div class="Watch">
      <div class="WatchUpperContent">
        <div class="WatchVideoPlayer">
          <VideoPlayer />
        </div>
        <div class="WatchRatingAndPoll">
          <div class="WatchRatingBox">
            <RatingBox />
          </div>
          <div class="WatchPollBox">
            <Poll />
          </div>
        </div>
      </div>
      <div class="WatchLowerContent">
        <div class="WatchSearchBox">
          <VideoSearch />
        </div>
      </div>
    </div>
  )
}
