import './VideoSearch.css'

import React from 'react'
import { TextField } from '../../../components/TextField'
import {SearchResults} from './SearchResults/SearchResults'

export const VideoSearch = (props) => {
    const [query, setQuery] = React.useState(null);
    let debounceTimer;
    const debounceSearch = (text) => {
        console.log("Debouncing: " + text);
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(()=>{
            console.log("Searching for: " + text);
            debounceTimer = null;
            setQuery(text)
        }, 750);
    }
    
    return (
        <div>
            <TextField label="Search for video" onInput={(e) => debounceSearch(e.target.value)} />
            <SearchResults query={query} />
        </div>
    )
    // const [videoData, setVideoData] = React.useState(null);
    // const [error, setError]=React.useState(null);
    // const [videoDataPromise, setVideoDataPromise]=React.useState(null);
    // React.useEffect(() => {
    //   setVideoDataPromise(
    //     getVideoData(props.videoID)
    //       .then(response => response.json())
    //       .then(data => {
    //         if (data.items.length == 0) {
    //           throw new Error("No results.");
    //         }
    //         return data;
    //       })
    //       .then(data => setVideoData(data))
    //       .catch(err => setError(err)));
    // }, []);
    // return promiseNoData(videoDataPromise, videoData, error, <VideoSummaryLoading mini={props.mini} />) || <VideoSummaryLoaded videoData={videoData.items[0]} mini={props.mini} onClick={props.onClick}/>
}
