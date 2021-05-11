import firebase from '../firebase'

export const pollAction = (selectedVal) => (dispatch) => {
  const ref = firebase.firestore().collection('group')

  const mockData = {
    choice: selectedVal,
    user: 'mary',
    videoId: 'cheeseVideo',
    groupName: 'cookAlong'
  }

  ref
    .where('name', '==', mockData.groupName)
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

export const fetchPollData = () => (dispatch) => {
  const ref = firebase.firestore().collection('group')
  const mockData = {
    user: 'mary',
    videoId: 'cheeseTastingVideo',
    groupName: 'cookAlong'
  }
  let votes = [0, 0, 0]
  let pollData = []
  let fetched = {}

  ref.where('name', '==', mockData.groupName).onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
      fetched = doc.data().poll
      //console.log('fetching ', fetched)

      const keys = Object.keys(fetched.result)
      //console.log('keys: ', keys)
      keys.forEach((key) => {
        switch (fetched.result[key]) {
          case 0:
            // console.log(key + ' voted 0')
            return (votes[0] += 1)

          case 1:
            // console.log(key + ' voted 1')

            return (votes[1] += 1)
          case 2:
            // console.log(key + ' voted 2')

            return (votes[2] += 1)
        }
      })
    })
    if (fetched.alternatives) {
      fetched.alternatives.forEach((vidName, index) => {
        pollData.push({ alternative: vidName, score: votes[index] })
      })
    }
    //console.log('data to be returned: ', pollData)
    dispatch({
      type: 'POLL_DATA',
      payload: pollData
    })
  })
}
