const initialState = {
  //alternatives: [],
  //choice: {},
  result: []
}
const pollReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POLL_DATA':
      return {
        ...state,
        //choice: action.payload,
        result: action.payload
      }
    default:
      return state
  }
}
export default pollReducer
