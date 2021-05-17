const initialState = {
  result: []
}
const pollReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POLL_DATA':
      return {
        ...state,
        result: action.payload
      }
    default:
      return state
  }
}
export default pollReducer
