import React from 'react'
import {VideoSummary} from '../../../Explore/VideoSummary/VideoSummary'
import {YT_API_KEY} from '../../../../yt-api'

// TODO: Make sure search is "current", aka we change search terms before the previous req has returned
// TODO: Figure out what to do about terrible youtube quota
export const SearchResults = (props) => {
  const [searchData, setSearchData] = React.useState(null);
  const [error, setError]=React.useState(null);
  const [searchDataPromise, setSearchDataPromise]=React.useState(null);
  React.useEffect(() => {
    let ignore = false;
    setSearchDataPromise(null);
    setSearchData(null);
    if (props.query) {
      setSearchDataPromise(
        getSearchData(props.query)
          .then(response => response.json())
          .then(data => {
            if (data.items.length == 0) {
              throw new Error("No results.");
            }
            if (!ignore) {
              setSearchData(data);
            }
          })
          .catch(err => setError(err))
      );
    }
    return ()=>{ignore=true};
  }, [props.query]);
  return promiseNoData(searchDataPromise, searchData, error, <SearchResultsLoading mini={props.mini} />) || <SearchResultsLoaded results={searchData.items} mini={props.mini} onSelect={props.onSelect} />
}


// TODO make this a bit more generic and move out of this file?
const promiseNoData = (promise, data, error, placeholder) => {
  return (!promise && <span></span>
    ||   (promise && !data && !error) && placeholder
    || error && <span>err: {error.toString()}</span>
    || false);
}

const SearchResultsLoading = () => {
  return <div>NO DATA YET</div>;
}

const SearchResultsLoaded = (props) => {
    if (props.results.length != 0) {
        return (
            <div className="searchResults">
                {props.results.map(
                    (video) => {
                        return <VideoSummary videoID={video.id.videoId} mini={props.mini} onClick={props.onSelect} />;
                    }
                )}
            </div>
        )
    } 
    return <div className="searchResults">No results :(</div>
}

const getSearchData = (query) => {
  const escapedQuery = encodeURIComponent(query)
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=10&q=${escapedQuery}&key=${YT_API_KEY}`;
  return fetch(url);
}