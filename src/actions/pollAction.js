import firebase from '../firebase'

export const pollAction = (selectedVal) => (dispatch, getState) => {
  const ref = firebase.firestore().collection('group')
  const user = getState().login.username
  const videoId = getState().playlist.videos[0].name
  const groupId = getState().groups.currentGroup

  const mockData = {
    choice: selectedVal,
    user,
    videoId,
    groupId
  }

  ref
    .where('id', '==', mockData.groupId)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        /*console.log(
          mockData.user + ' voted : ',
          doc.data().poll.result[mockData.user]
        )*/
        var testUpdate = {}
        testUpdate['poll.result.' + mockData.user] = mockData.choice

        ref.doc(doc.data().id).update(testUpdate)
      })
    })
}

export const fetchPollData = () => (dispatch, getState) => {
  const ref = firebase.firestore().collection('group')
  const user = getState().login.username
  const videoId = getState().playlist.videos[0].name
  const groupId = getState().groups.currentGroup

  const mockData = {
    user,
    videoId,
    groupId
  }

  let votes = [0, 0, 0]
  let pollData = []
  let fetched = {}

  ref.where('id', '==', mockData.groupId).onSnapshot((snapshot) => {
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
