import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid'

export const ratingBoxAction = (selectedVal) => (dispatch) => {
  // not really an action :DDDD thunk
  const ref = firebase.firestore().collection('rating')

  const newRating = {
    rating: selectedVal,
    user: 'mary',
    video: 'shockingVideo',
    id: ''
  }

  ref
    .where('user', '==', newRating.user)
    .where('video', '==', newRating.video)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        const id_str = uuidv4()
        newRating.id = id_str
        ref
          .doc(id_str)
          .set(newRating)
          .catch((e) => {
            console.error(e)
          })
      } else {
        snapshot.forEach((doc) => {
          const entry = doc.data()
          ref.doc(entry.id).update({ rating: newRating.rating })
        })
      }
    })
}

export const fetchRatingData = () => (dispatch) => {
  const mockData = { user: 'mary', video: 'shockingVideo' }
  const ref = firebase.firestore().collection('rating')

  ref.onSnapshot((querySnapshot) => {
    const arr = []
    let userRating = 0

    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
      if (
        doc.data().user === mockData.user &&
        doc.data().video === mockData.video
      ) {
        userRating = doc.data().rating
      }
    })
    // TODO: when group data is more defined, make sure the average is counted for the specific group and NOT in general
    const groupRating =
      arr.map((item) => item.rating).reduce((a, b) => a + b) / arr.length
    dispatch({
      type: 'USERRATING_AVERAGE',
      payload: { groupRating, userRating }
      // payload: { groupRating: groupRating, userRating: userRating } equivalent to previous row
    })
  })
}
