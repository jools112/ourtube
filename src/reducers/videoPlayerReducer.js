const initialState = {
  name: 'room not joined yet',
  controlName: 'FIX ME'
  // add a key:value for Leave Room if needed?
}

const videoPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOINROOM_ACTION':
      return {
        ...state,
        name: action.payload // the name part of state gets overwritten
      }
    case 'TAKECONTROL_ACTION':
      return {
        ...state,
        controlName: action.payload // the controlName part of state gets overwritten
      }

    // add a case for Leave Room?
    default:
      return state
  }
}
export default videoPlayerReducer
