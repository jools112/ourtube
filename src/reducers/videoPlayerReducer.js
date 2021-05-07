const initialState = {
  joined: false,
  controlName: '--#',
  userCount: 1
  // add a key:value for Leave Room if needed?
}

const videoPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOINROOM_ACTION':
      return {
        ...state,
        joined: true
      }
    case 'LEAVEROOM_ACTION':
      return {
        ...state,
        joined: false
      }
    case 'TAKECONTROL_ACTION':
      return {
        ...state,
        controlName: action.payload // the controlName part of state gets overwritten
      }
    case 'USERCOUNT_ACTION':
      return {
        ...state,
        userCount: action.payload
      }
    case 'VIDEOID_ACTION':
      return {
        ...state,
        videoId: action.payload
      }
    case 'USERNAME_ACTION':
      return {
        ...state,
        username: action.payload
      }
    default:
      return state
  }
}
export default videoPlayerReducer
