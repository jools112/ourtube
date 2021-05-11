export const joinRoomActionCreator = () => ({
  type: 'JOINROOM_ACTION'
})

export const leaveRoomActionCreator = () => ({
  type: 'LEAVEROOM_ACTION'
})
// TODO complete action creators for other actions in VideoPlayer
export const takeControlActionCreator = (controlName) => ({
  type: 'TAKECONTROL_ACTION',
  payload: controlName
})

export const userCountActionCreator = (userCount) => ({
  type: 'USERCOUNT_ACTION',
  payload: userCount
})

export const VideoIdActionCreator = (videoId) => ({
  type: 'VIDEOID_ACTION',
  payload: videoId
})

export const UserNameActionCreator = (username) => ({
  type: 'USERNAME_ACTION',
  payload: username
})

export const UserNameJoinedActionCreator = (userNameJoined) => ({
  type: 'USERNAMEJOINED_ACTION',
  payload: userNameJoined
})
