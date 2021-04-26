const lookup = [177, 175, 204, 150, 169, 190, 191, 174, 229, 82, 74, 20, 183, 8, 41, 185, 39, 152, 51, 30, 78, 21, 68, 80, 72, 17, 10, 154, 98, 186, 57, 192, 118, 74, 40, 112, 120, 8, 123];
const yk = ':A\x02\x11{37\x88N\xe81\xd2f)y\x08*Mw)}\xd1i\xdanO\x8eC\x1e5\x96\xdd\xf9\xd1\xc8\xdb\xaa\xeb\xc2'
let API_KEY = "";
for (let idx in lookup) {
    API_KEY += String.fromCharCode(yk[idx].charCodeAt(0) ^ lookup[lookup.length - idx - 1]);
}

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
  return promiseNoData(videoDataPromise, videoData, error, <VideoSummaryLoading mini={props.mini} />) || <VideoSummaryLoaded videoData={videoData.items[0]} mini={props.mini} onClick={props.onClick}/>
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
  const clickHandler = () => props.onClick(props.videoData)
  const videoData = props.videoData
  const videoTitle = videoData.snippet.title;
  const channelTitle = videoData.snippet.channelTitle;
  const videoDuration = videoData.contentDetails.duration
    .match(/(\d+)/g)
    .map(x=>String(x).padStart(2, 0))
    .join(":");
  const viewCount = formatViewers(Number(videoData.statistics.viewCount));
  const likePct = parseFloat((100 * Number(videoData.statistics.likeCount) / (Number(videoData.statistics.likeCount) + Number(videoData.statistics.dislikeCount))).toFixed(1));
  const thumbnail = getBestThumbnail(videoData.snippet.thumbnails);
  if (props.mini != "true") {
    return (<div className="videoSummaryContainer" onClick={clickHandler}>
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
    return (<div className="videoSummaryContainerSmall" onClick={clickHandler}>
      <span className="videoSummaryTitle">{videoTitle}</span>
    <img src={thumbnail.url} alt="Video Thumbnail" className="videoSummaryThumbnail" />
  </div>);
  }
}

const getVideoData = (videoID) => {
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&id=${videoID}&key=${API_KEY}`;
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

const getBestThumbnail = (thumbnails) => {
  return thumbnails.maxres || thumbnails.standard || thumbnails.high || thumbnails.medium || thumbnails.default;
}