/*
  Julia's test reducer
*/
const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return {
        result: action.payload
      }
    default:
      return state
  }
}
export default loginReducer
