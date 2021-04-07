const joinRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case 'JOINROOM_ACTION':
      return {
        name: 'user' + parseInt(99999 * Math.random())
      }
    default:
      return state
  }
}
export default joinRoomReducer
