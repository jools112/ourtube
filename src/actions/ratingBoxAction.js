import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid'

export const ratingBoxAction = (selectedVal) => (dispatch) => {
  const ref = firebase.firestore().collection('rating')

  const newRating = {
    rating: selectedVal,
    user: 'mary',
    video: 'shockingVideo',
    id: ''
  }

  var query = ref
    .where('user', '==', newRating.user)
    .where('video', '==', newRating.video)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        // creAte
        console.log('creating new entry!!')
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
          console.log('in snapshot, ', entry)
          ref.doc(entry.id).update({ rating: newRating.rating })
        })
      }
    })

  dispatch({
    type: 'USERRATING_INPUT',
    payload: selectedVal
  })
}

export const fetchRatingData = () => (dispatch) => {
  const mockData = { user: 'mary', video: 'shockingVideo' }
  const ref = firebase.firestore().collection('rating')
  ref.onSnapshot((querySnapshot) => {
    const fetched = { arr: [], rating: 0 }
    //const rating = 0
    querySnapshot.forEach((doc) => {
      fetched.arr.push(doc.data())
      if (
        doc.data().user === mockData.user &&
        doc.data().video === mockData.video
      ) {
        const temp = doc.data().rating // tried using const rating but couldnt assign new value :O
        fetched.rating = temp
      }
      console.log('in loop', doc.data())
    })
    const avg =
      fetched.arr.map((item) => item.rating).reduce((a, b) => a + b) /
      fetched.arr.length

    console.log('average rating: ', avg)
    dispatch({
      type: 'USERRATING_AVERAGE',
      payload: { averageRating: avg, userRating: fetched.rating }
    })
  })
}
