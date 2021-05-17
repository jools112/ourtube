import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid'

export const ratingBoxAction = (selectedVal) => (dispatch, getState) => {
  const user = getState().login.username
  const videos = getState().playlist.videos
  const userRef = firebase.firestore().collection('users')
  const ratingRef = firebase.firestore().collection('ratings')

  if (videos.length) {
    userRef
      .where('name', '==', user)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          throw new Error('unexpected error in ratingBoxAction')
        } else {
          snapshot.forEach((doc) => {
            const entry = doc.data()
            userRef
              .doc(entry.id)
              .update({ ['ratings.' + videos[0].id]: selectedVal }) // hard brackets for dynamic keys
              .then(() =>
                dispatch({
                  type: 'RATING_USER',
                  payload: selectedVal
                })
              )
          })
        }
      })

    ratingRef
      .where('videoId', '==', videos[0].id)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          ratingRef
            .doc(videos[0].id)
            .set({
              avgRating: selectedVal,
              videoId: videos[0].id,
              voteCount: 1
            })
            .then(() =>
              dispatch({
                type: 'RATING_AVERAGE',
                payload: selectedVal
              })
            )
        } else {
          snapshot.forEach((doc) => {
            const entry = doc.data()
            const newVoteCount = entry.voteCount + 1
            const avgRating =
              entry.avgRating -
              entry.avgRating / newVoteCount +
              selectedVal / newVoteCount
            ratingRef
              .doc(videos[0].id)
              .update({
                avgRating: avgRating,
                voteCount: newVoteCount
              })
              .then(() =>
                dispatch({
                  type: 'RATING_AVERAGE',
                  payload: avgRating
                })
              )
          })
        }
      })
  }
}

export const fetchRatingData = () => (dispatch, getState) => {
  const user = getState().login.username
  const videos = getState().playlist.videos
  const userRef = firebase.firestore().collection('users')
  const ratingRef = firebase.firestore().collection('ratings')

  if (videos.length) {
    ratingRef
      .where('videoId', '==', videos[0].id)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            const averageRating = doc.data().avgRating
            dispatch({
              type: 'RATING_AVERAGE',
              payload: averageRating
            })
          })
        } else {
          dispatch({
            type: 'RATING_AVERAGE',
            payload: 0
          })
        }
      })

    userRef
      .where('name', '==', user)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            const userRating = doc.data().ratings[videos[0].id]
            if (userRating) {
              dispatch({
                type: 'RATING_USER',
                payload: userRating
              })
            } else {
              dispatch({
                type: 'RATING_USER',
                payload: 0
              })
            }
          })
        }
      })
  }
}
