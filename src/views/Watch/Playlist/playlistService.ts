import { firestore } from '../../../firebase'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, actions } from '../../../reducers/playlist'

export type Video = {
    id: string,
    thumbnail: string,
    name: string,
}

export const addVideosToPlaylist = async (groupID: string, video: Video[], first = false) => {
    const ref = firestore.collection("group").doc(groupID);
    return firestore.runTransaction(async (transaction) => {
        const group = await transaction.get(ref)
        if (group && group.exists) {
            const data = group.data()
            if (data) {
                const playlist = data.playlist
                if (playlist.length >= 50) {
                    return
                }
                const updatedPlaylist = first ? [...video, ...playlist] : [...playlist, ...video]
                transaction.update(ref, {
                    playlist: updatedPlaylist
                })
            }
        }
        return;
    })
}

export const usePlaylist = (groupID: string) => {
    const dispatch = useDispatch()
    const playlist = useSelector(selectors.selectVideos)
    useEffect(() => {
        const ref = firestore.collection("group").doc(groupID)
        const unsubscribe = ref.onSnapshot((doc) => {
            const data = doc.data()
            if (!data) {
                dispatch(actions.setVideos([]))
            } else {
                dispatch(actions.setVideos(data.playlist))
            }
        })
        return unsubscribe
    }, [groupID])
    return playlist
}

// const getPlaylist = async (groupID: string): Promise<Video[]> => {
//     const group = await firestore.collection('group').doc(groupID).get()
//     if (group && group.exists) {
//         const data = group.data()
//         if (data) {
//             return data.playlist
//         }
//     }
//     console.log("nop")
//     return []
// }