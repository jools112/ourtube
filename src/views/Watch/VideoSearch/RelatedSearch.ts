import React from 'react'
import { firestore } from '../../../firebase'
import { YT_API_KEY } from '../../../yt-api'
import { getBestThumbnail } from '../../Explore/VideoSummary/VideoSummary'
import { addVideosToPlaylist, Video } from '../Playlist/playlistService'
import { getIDsFromSearchResults } from './SearchUtil'

// Returns a promise to a sear
const getRelatedVideos = async (videoID: string, maxResults: number): Promise<Array<Video>> => {
    if (!videoID) {
        throw new Error("videoID required.")
    }
    if (isNaN(maxResults) || maxResults <= 0) {
        throw new Error("maxResults must be a number > 0.")
    }
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&relatedToVideoId=${videoID}&key=${YT_API_KEY}`;
    const response = await fetch(url)
    const data = await response.json()
    return data.items.filter((item: any) => item.snippet)
        .map((item: any) => ({
            id: item.id.videoId,
            thumbnail: getBestThumbnail(item.snippet.thumbnails).url,
            name: item.snippet.title,
        })).slice(0, 3)
}

export const updateRelatedVideosFromID = async (groupID: string, videoID: string) => {
    const results = await getRelatedVideos(videoID, 30)
    const ref = firestore.collection("group").doc(groupID)
    return firestore.runTransaction(async (transaction) => {
        transaction.update(ref, {
            poll: {
                alternatives: results,
                result: {},
            }
        })
    })
}