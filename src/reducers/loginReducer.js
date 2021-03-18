/*
  Julia's test reducer
*/
const simpleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return {
        result: action.payload
      }
    default:
      return state
  }
}
export default simpleReducer
