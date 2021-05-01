import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid'

export const loginAction = (username) => (dispatch) => {
  const ref = firebase.firestore().collection('users')

  const mockData = {
    name: username,
    id: uuidv4()
  }
  let found = false
  ref
    .where('name', '==', mockData.name)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        //var testUpdate = {}
        //testUpdate['poll.result.' + mockData.user] = mockData.choice
        console.log(doc.data())
        debugger
        let expires = ''
        let days = 365
        var date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()

        document.cookie =
          'session' + '=' + (mockData.name || '') + expires + '; path=/'
        found = true
        //ref.doc(doc.data().id).update(testUpdate)
      })
    })
  if (!found) {
    ref
      .doc(mockData.id)
      .set({
        id: mockData.id,
        name: mockData.name
      })
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }
  dispatch({
    type: 'LOGIN_ACTION',
    payload: username
  })
}
