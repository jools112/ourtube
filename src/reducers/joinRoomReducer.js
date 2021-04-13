const joinRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case 'JOINROOM_ACTION':
      return {
        result: action.payload
      }
    default:
      return state
  }
}
export default joinRoomReducer
