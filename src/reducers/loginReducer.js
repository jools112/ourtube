const initialState = {
  username: '',
  groups: []
}
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return {
        ...state
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
