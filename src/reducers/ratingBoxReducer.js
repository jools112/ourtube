const initialState = {
  userRating: 0, // user rating is personal
  averageRating: 0, // group rating is not
  user: 'mary'
  //relevantDocs: [{ rating: 0, user: 'john', video: 'yogaVideo' }]
}
const ratingBoxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RATING_USER':
      return {
        ...state,
        userRating: action.payload
      }
    case 'RATING_AVERAGE':
      return {
        ...state,
        averageRating: action.payload
      }
    default:
      return state
  }
}
export default ratingBoxReducer
