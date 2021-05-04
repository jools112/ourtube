const initialState = {
  username: '',
  loggedIn: false,
  groups: [],
  ratings: []
}
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_LOGIN_ACTION':
      return {
        ...state,
        loggedIn: true
      }
    case 'LOGIN_LOGOUT_ACTION':
      return {
        ...state,
        loggedIn: false
      }
    case 'LOGIN_VALIDATE_LOGGED_IN':
      return {
        ...state,
        loggedIn: true,
        username: action.payload
      }
    case 'LOGIN_SET_USERNAME':
      return {
        ...state,
        username: action.payload
      }
    default:
      return state
  }
}
export default loginReducer
