export const joinRoomActionCreator = (name) => ({
  type: 'JOINROOM_ACTION',
  payload: name
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