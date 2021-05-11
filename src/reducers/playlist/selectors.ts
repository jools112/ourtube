import { State } from './index'
type AppState = {
  playlist: State
}
export const selectVideos = (state: AppState) => state.playlist.videos
