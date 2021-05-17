import * as actions from './actions'
import * as selectors from './selectors'
import { Actions, Video } from './actions'


export type State = {
  videos: Video[]
}

const initialState: State = {
  videos: []
}

const playlistReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case actions.SET_VIDEOS: {
      console.log("Set videos to:", action.payload.videos)
      return {
        ...state,
        videos: action.payload.videos,
      }
    }
    default:
      return state
  }
}

export { actions, selectors }
export default playlistReducer