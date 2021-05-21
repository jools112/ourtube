import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid'

export const setUsernameActionCreator = (username) => ({
  type: 'LOGIN_SET_USERNAME',
  payload: username
})

export const validateLoggedInAction = () => (dispatch) => {
  if (document.cookie !== '') {
    dispatch({
      type: 'LOGIN_VALIDATE_LOGGED_IN',
      payload: document.cookie.slice(8)
    })
  }
}

export const logoutAction = () => (dispatch) => {
  var res = document.cookie
  var multiple = res.split(';')
  for (var i = 0; i < multiple.length; i++) {
    var key = multiple[i].split('=')
    document.cookie = key[0] + ' =; expires = Thu, 01 Jan 1970 00:00:00 UTC'
  }

  dispatch({ type: 'LOGIN_LOGOUT_ACTION' })
}

export const loginAction = (username) => (dispatch) => {
  const ref = firebase.firestore().collection('users')

  const userData = {
    name: username,
    id: uuidv4(),
    groups: [],
    ratings: []
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
            groups: userData.groups,
            ratings: userData.ratings
          })

          .catch((error) => {
            console.error('Error writing document: ', error)
          })
      }
    })

  dispatch({
    type: 'LOGIN_LOGIN_ACTION',
    payload: username
  })
}
