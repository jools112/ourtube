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
        let poll = doc.data().poll
        let newVote = {}
        newVote['poll.result.' + user] = choice
        poll.result = { ...poll.result, [user]: choice }
        console.log('pollAction: ', newVote)
        ref
          .doc(doc.data().id)
          .update(newVote)
          .then(() => dispatch(pollDataActionCreator(getResults(poll))))
      })
    })
}

export const fetchPollData = () => (dispatch, getState) => {
  const ref = firebase.firestore().collection('group')
  const groupId = getState().groups.currentGroup

  ref.where('id', '==', groupId).onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
      dispatch(pollDataActionCreator(getResults(doc.data().poll)))
    })
  })
}

export const pollDataActionCreator = (pollData) => ({
  type: 'POLL_DATA',
  payload: pollData
})

const getResults = (fetched) => {
  let votes = [0, 0, 0]
  let pollData = []
  const keys = Object.keys(fetched.result)
  keys.forEach((key) => {
    votes[fetched.result[key]]++
  })
  fetched.alternatives.forEach((vidName, index) => {
    pollData.push({ alternative: vidName, score: votes[index] })
  })
  return pollData
}
