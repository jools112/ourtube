const initialState = {
  username: ''
}
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return {
        ...state,
        username: action.payload
      }
    default:
      return state
  }
}
export default loginReducer
