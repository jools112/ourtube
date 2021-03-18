/*
 example from https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8
*/
export const simpleAction = () => (dispatch) => {
  dispatch({
    type: 'SIMPLE_ACTION',
    payload: 'result_of_simple_action'
  })
}
