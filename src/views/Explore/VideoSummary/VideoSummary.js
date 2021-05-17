import './VideoSummary.css'
import React from 'react'
import { YT_API_KEY } from '../../../yt-api'
import { promiseNoData } from '../../Watch/VideoSearch/SearchUtil'

// This is not a real (well, visible) component! Just a utility function that redirects to the actual component. See VideoSummaryLoaded below.
export const VideoSummary = (props) => {
  const [videoData, setVideoData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [videoDataPromise, setVideoDataPromise] = React.useState(null);
  React.useEffect(() => {
    setVideoDataPromise(
      getVideoData(props.videoID)
        .then(response => response.json())
        .then(data => {
          if (data.items.length == 0) {
            throw new Error("No results.");
          }
          return data;
        })
        .then(data => setVideoData(data))
        .catch(err => setError(err)));
  }, [props.videoID]);
  return promiseNoData(videoDataPromise, videoData, error, <div>Loading video...</div>) || <VideoSummaryLoaded videoData={videoData.items[0]} mini={props.mini} onClick={props.onClick} />
}

// The actual component is here!
const VideoSummaryLoaded = (props) => {
  const clickHandler = () => props.onClick && props.onClick(props.videoData)
  const videoData = props.videoData
  const videoTitle = videoData.snippet.title; //yes!
  const channelTitle = videoData.snippet.channelTitle;
  const _videoDuration = videoData.contentDetails.duration
    .match(/(\d+)/g)
    .map(x => String(x).padStart(2, 0))
    .join(":");
  const videoDuration = _videoDuration.includes(":") ? _videoDuration : "00:" + _videoDuration
  const viewCount = formatViewers(Number(videoData.statistics.viewCount));
  const _likePct = parseFloat((100 * Number(videoData.statistics.likeCount) / (Number(videoData.statistics.likeCount) + Number(videoData.statistics.dislikeCount))).toFixed(1));
  const likePct = isNaN(_likePct) ? 0 : _likePct
  const thumbnail = getBestThumbnail(videoData.snippet.thumbnails);
  if (props.mini != "true") {
    return (<div className="videoSummaryContainer" onClick={clickHandler}>
      <img src={thumbnail.url} alt="Video Thumbnail" className="videoSummaryThumbnail" />
      <div className="videoSummaryText">
        <span className="videoSummaryTitle">{videoTitle}</span>
        <span>{channelTitle}</span>
        <span>{videoDuration}</span>
        <span>{viewCount} views</span>
        <span>{likePct}% liked on YouTube</span>
      </div>
    </div>);
  }
  else {
    return (<div className="videoSummaryContainerSmall" onClick={clickHandler}>
      <span className="videoSummaryTitle">{videoTitle}</span>
      <img src={thumbnail.url} alt="Video Thumbnail" className="videoSummaryThumbnail" />
    </div>);
  }
}

const getVideoData = (videoID) => {
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&id=${videoID}&key=${YT_API_KEY}`;
  return fetch(url);
}

const formatViewers = (num) => {
  if (num < 1000) {
    return num;
  }
  if (num < 1000000) {
    return parseFloat((num / 1000).toFixed(1)) + "K";
  }
  return parseFloat((num / 1_000_000).toFixed(1)) + "M";
}

export const getBestThumbnail = (thumbnails) => {
  return thumbnails.maxres || thumbnails.standard || thumbnails.high || thumbnails.medium || thumbnails.default;
}