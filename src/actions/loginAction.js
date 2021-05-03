import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid'

export const setUsernameActionCreator = (username) => ({
  type: 'LOGIN_SET_USERNAME',
  payload: username
})

export const loginAction = (username) => (dispatch) => {
  const ref = firebase.firestore().collection('users')

  const userData = {
    name: username,
    id: uuidv4(),
    groups: []
  }

  ref
    .where('name', '==', userData.name)
    .get()
    .then((snapshot) => {
      let found = false
      snapshot.forEach((doc) => {
        //onsole.log('found a duplicate!!!', doc.data())
        //debugger
        let expires = ''
        let days = 365
        var date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()

        document.cookie =
          'session' + '=' + (userData.name || '') + expires + '; path=/'
        found = true
      })

      if (!found) {
        ref
          .doc(userData.id)
          .set({
            id: userData.id,
            name: userData.name,
            groups: []
          })
          .then(() => {
            console.log(
              'Document successfully written for new user ' + userData.name
            )
          })
          .catch((error) => {
            console.error('Error writing document: ', error)
          })
      }
    })

  dispatch({
    type: 'LOGIN_ACTION',
    payload: username
  })
}
