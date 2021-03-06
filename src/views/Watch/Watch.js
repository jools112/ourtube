import './Watch.css'
import { RatingBox } from './Rating/RatingBox'
import { Poll } from './Poll/Poll'
import { VideoPlayer } from './VideoPlayer/VideoPlayer'
import { VideoSearch } from './VideoSearch/VideoSearch'
import Playlist from './Playlist'

export const Watch = () => {
  return (
    <div className="Watch">
      <div className="WatchUpperContent">
        <div className="WatchVideoPlayer watchMainCont">
          <VideoPlayer />
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
      <Playlist />
      <div className="WatchLowerContent">
        <div className="WatchSearchBox">
          <VideoSearch />
        </div>
      </div>
    </div>
  )
}
