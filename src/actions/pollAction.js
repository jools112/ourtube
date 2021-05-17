import firebase from '../firebase'

export const pollAction = (choice) => (dispatch, getState) => {
  const ref = firebase.firestore().collection('group')
  const user = getState().login.username
  const groupId = getState().groups.currentGroup

  ref
    .where('id', '==', groupId)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        var testUpdate = {}
        testUpdate['poll.result.' + user] = choice

        ref.doc(doc.data().id).update(testUpdate)
      })
    })
}

export const fetchPollData = () => (dispatch, getState) => {
  const ref = firebase.firestore().collection('group')
  const groupId = getState().groups.currentGroup

  let votes = [0, 0, 0]
  let pollData = []
  let fetched = {}

  ref.where('id', '==', groupId).onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
      fetched = doc.data().poll
      //console.log('fetching ', fetched)

      const keys = Object.keys(fetched.result)
      //console.log('keys: ', keys)
      keys.forEach((key) => {
        switch (fetched.result[key]) {
          case 0:
            //console.log(key + ' voted 0')
            return (votes[0] += 1)

          case 1:
            //console.log(key + ' voted 1')

            return (votes[1] += 1)
          case 2:
            // console.log(key + ' voted 2')

            return (votes[2] += 1)
        }
      })
    })
    //if (fetched.alternatives) {
    //console.log('HÄNDER ENS DETTA', fetched)
    fetched.alternatives.forEach((vidName, index) => {
      pollData.push({ alternative: vidName, score: votes[index] })
    })
    //}
    //console.log('data to be returned: ', pollData)
    dispatch({
      type: 'POLL_DATA',
      payload: pollData
    })
  })
}
