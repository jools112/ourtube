/*
  Reducer example from https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8
*/

const simpleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        result: action.payload
      }
    default:
      return state
  }
}
export default simpleReducer
