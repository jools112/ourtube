import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid'

export const ratingBoxAction = (selectedVal) => (dispatch) => {
  const ref = firebase.firestore().collection('users')
  const newRating = {
    rating: selectedVal,
    user: 'mary',
    video: 'hathaYogaVideo',
    id: ''
  }

  ref
    .where('name', '==', newRating.user)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        throw new Error('unexpected error in ratingBoxAction')
      } else {
        snapshot.forEach((doc) => {
          const entry = doc.data()
          ref
            .doc(entry.id)
            .update({ ['ratings.' + newRating.video]: newRating.rating }) // hard brackets for dynamic keys
        })
      }
    })
}

export const fetchRatingData = () => (dispatch) => {
  const mockData = { user: 'mary', video: 'hathaYogaVideo' }
  const ref = firebase.firestore().collection('users')

  ref.onSnapshot((querySnapshot) => {
    const groupRatings = []
    let userRating = 0

    querySnapshot.forEach((doc) => {
      const entry = doc.data()
      const keys = Object.keys(entry.ratings)

      if (keys.includes(mockData.video)) {
        // if a user has rated this video
        /*
        console.log(
          mockData.video + ' has been rated by ' + entry.name + ' with rating ',
          entry.ratings[mockData.video]
        )
        */
        groupRatings.push(entry.ratings[mockData.video])
        if (entry.name === mockData.user) {
          // if I have rated this video
          userRating = entry.ratings[mockData.video]
        }
      }
    })

    const groupRating =
      groupRatings.reduce((a, b) => a + b) / groupRatings.length

    dispatch({
      type: 'USERRATING_AVERAGE',
      payload: { groupRating, userRating }
      // payload: { groupRating: groupRating, userRating: userRating } equivalent to previous row
    })
  })
}
