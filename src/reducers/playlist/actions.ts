
export type Video = {
  thumbnail: string,
  id: string,
  name: string,
}

export const SET_VIDEOS = 'playlist/SET_VIDEOS'
export type SetVideos = {
  type: typeof SET_VIDEOS,
  payload: {
    videos: Video[]
  }
}

export const setVideos = (videos: Video[]): SetVideos => ({
  type: SET_VIDEOS,
  payload: {
    videos: videos,
  }
})

export type Actions = SetVideos