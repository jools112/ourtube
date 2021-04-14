export const joinRoomActionCreator = (username) => ({
  type: 'JOINROOM_ACTION',
  payload: username
})

// TODO complete action creators for other actions in VideoPlayer
export const takeControlActionCreator = () => ({
  type: 'TAKECONTROL_ACTION',
  payload: 'FIX ME'
})

export const leaveRoomActionCreator = () => ({
  type: 'LEAVEROOM_ACTION',
  payload: 'FIX ME'
})
