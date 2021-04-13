/*
  Julia's test action
*/
export const joinRoomAction = (username) => (dispatch) => {
  dispatch({
    type: 'JOINROOM_ACTION',
    payload: username
  })
}
