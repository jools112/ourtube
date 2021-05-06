import React from 'react'
import {YT_API_KEY} from '../../../yt-api'
import {getIDsFromSearchResults} from './SearchUtil'

// Returns a promise to a sear
const getRelatedVideos = (videoID, maxResults) => {
    if (!videoID) {
        throw new Error("videoID required.")
    }
    if (isNaN(maxResults) || maxResults <= 0) {
        throw new Error("maxResults must be a number > 0.")
    }
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&relatedToVideoId=${videoID}&key=${YT_API_KEY}`;
    const tempPromise = fetch(url);
    return tempPromise.then(response => response.json())
        .then(data => getIDsFromSearchResults(data));
}