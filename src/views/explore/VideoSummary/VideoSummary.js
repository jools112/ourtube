const API_KEY = "" //temporary key for debugging. TODO: Remove key and proxy through backend instead.

const VideoSummary = (props) => {
  const [videoData, setVideoData] = React.useState(null);
  const [error, setError]=React.useState(null);
  const [videoDataPromise, setVideoDataPromise]=React.useState(null);
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
  }, []);
  //console.log(videoData);
  return promiseNoData(videoDataPromise, videoData, error, <VideoSummaryLoading mini={props.mini} />) || <VideoSummaryLoaded videoData={videoData.items[0]} mini={props.mini} />
}


// TODO make this a bit more generic and move out of this file?
const promiseNoData = (promise, data, error, placeholder) => {
  return (!promise && <span>no data</span>
    ||   (promise && !data && !error) && placeholder
    || error && <span>err: {error.toString()}</span>
    || false);
}

const VideoSummaryLoading = () => {
  return <div>NO DATA YET</div>;
}

const VideoSummaryLoaded = (props) => {
  const videoData = props.videoData
  const videoTitle = videoData.snippet.title;
  const channelTitle = videoData.snippet.channelTitle;
  const videoDuration = videoData.contentDetails.duration
    .match(/(\d+)/g)
    .map(x=>String(x).padStart(2, 0))
    .join(":");
  const viewCount = formatViewers(Number(videoData.statistics.viewCount));
  const likePct = parseFloat((100 * Number(videoData.statistics.likeCount) / (Number(videoData.statistics.likeCount) + Number(videoData.statistics.dislikeCount))).toFixed(1));
  const thumbnail = videoData.snippet.thumbnails.maxres;
  if (props.mini != "true") {
    return (<div className="videoSummaryContainer">
      <img src={thumbnail.url} alt="Video Thumbnail" className="videoSummaryThumbnail" />
      <div className="videoSummaryText">
        <span className="videoSummaryTitle">{videoTitle}</span>
        <span>{channelTitle}</span>
        <span>{videoDuration}</span>
        <span>{viewCount} views</span>
        <span>{likePct}% liked</span>
      </div>
    </div>);
  }
  else {
    return (<div className="videoSummaryContainerSmall">
      <span className="videoSummaryTitle">{videoTitle}</span>
    <img src={thumbnail.url} alt="Video Thumbnail" className="videoSummaryThumbnail" />
  </div>);
  }
}

const getVideoData = (videoID) => { //TODO: change to backend proxy
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&id=${videoID}&key=${API_KEY}`;
  console.log("getting " + url);
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