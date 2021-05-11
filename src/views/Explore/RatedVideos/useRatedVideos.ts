import { firestore } from '../../../firebase'
import { useState, useEffect } from 'react'

export const useRatedVideos = () => {
  const [ratedVideos, setRatedVideos] = useState<string[]>([])
  useEffect(() => {
    const ref = firestore.collection("ratings")
    const unsubscribe = ref.onSnapshot((collection) => {
      let allVideos: any[] = []
      collection.forEach((doc) => {
        allVideos.push({ id: doc.id, avgRating: doc.data().avgRating })
      })
      allVideos.sort((a: any, b: any) => {
        if (a.avgRating > b.avgRating) {
          return -1
        } else if (a.avgRating < b.avgRating) {
          return 1
        }
        return 0;
      })

      setRatedVideos(allVideos.map(vid => vid.id))
    })
    return unsubscribe
  }, [])
  return ratedVideos
}