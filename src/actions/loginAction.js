/*
  Julia's test action
*/
export const loginAction = () => (dispatch) => {
  dispatch({
    type: 'LOGIN_ACTION',
    payload: 'result_of_login_action'
  })
}
