import './Watch.css'
import { RatingBox } from './Rating/RatingBox'
import { Poll } from './Poll/Poll'
import { VideoPlayer } from './VideoPlayer/VideoPlayer'
import { VideoSearch } from './VideoSearch/VideoSearch'

export const Watch = () => {
  return (
    <div className="Watch">
      <div className="WatchUpperContent">
        <div className="WatchVideoPlayer watchMainCont">
          <VideoPlayer videoId="2HwgXcPaFm8" />
        </div>
        <div className="WatchRatingAndPoll">
          <div className="WatchRatingBox">
            <RatingBox />
          </div>
          <div className="WatchPollBox">
            <Poll />
          </div>
        </div>
      </div>
      <div className="WatchLowerContent">
        <div className="WatchSearchBox">
          <VideoSearch />
        </div>
      </div>
    </div>
  )
}
