const initialState = {
  userRating: 0, // user rating is personal
  groupRating: 0, // group rating is not
  user: 'mary'
  //relevantDocs: [{ rating: 0, user: 'john', video: 'yogaVideo' }]
}
const ratingBoxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USERRATING_INPUT':
      return {
        ...state,
        userRating: action.payload
      }
    case 'USERRATING_AVERAGE':
      return {
        ...state,
        userRating: action.payload.userRating,
        groupRating: action.payload.groupRating
      }
    default:
      return state
  }
}
export default ratingBoxReducer
