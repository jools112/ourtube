
/*
  Julia's test action
*/
export const joinRoomAction = () => (dispatch) => {
  dispatch({
    type: 'JOINROOM_ACTION',
    payload: 'result_of_joinroom_action'
  })
}
