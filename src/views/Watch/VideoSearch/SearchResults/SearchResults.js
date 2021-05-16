import React from 'react'
import {
  getBestThumbnail,
  VideoSummary
} from '../../../Explore/VideoSummary/VideoSummary'
import { YT_API_KEY } from '../../../../yt-api'
import { getIDsFromSearchResults, promiseNoData } from '../SearchUtil'
import { addVideosToPlaylist } from '../../Playlist/playlistService'
import { useSelector } from 'react-redux'
import { updateRelatedVideosFromID } from '../RelatedSearch'
// TODO: Make sure search is "current", aka we change search terms before the previous req has returned
// TODO: Figure out what to do about terrible youtube quota
export const SearchResults = (props) => {
  const [searchData, setSearchData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [searchDataPromise, setSearchDataPromise] = React.useState(null)
  React.useEffect(() => {
    let ignore = false
    setSearchDataPromise(null)
    setSearchData(null)
    if (props.query) {
      setSearchDataPromise(
        getSearchData(props.query)
          .then((response) => response.json())
          .then((data) => {
            // if (data.items.length == 0) {
            //   throw new Error("No results.");
            // }
            if (!ignore) {
              setSearchData(data)
            }
          })
          .catch((err) => setError(err))
      )
    }
    return () => {
      ignore = true
    }
<<<<<<< HEAD
  }, [props.query])
  return (
    promiseNoData(
      searchDataPromise,
      searchData,
      error,
      <SearchResultsLoading mini={props.mini} />
    ) || (
      <SearchResultsLoaded
        results={getIDsFromSearchResults(searchData)}
        mini={props.mini}
        onSelect={props.onSelect}
      />
    )
  )
}

// TODO make this a bit more generic and move out of this file?
const promiseNoData = (promise, data, error, placeholder) => {
  return (
    (!promise && <span></span>) ||
    (promise && !data && !error && placeholder) ||
    (error && <span>err: {error.toString()}</span>) ||
    false
  )
}

const SearchResultsLoading = () => {
  return <div>NO DATA YET</div>
=======
    return () => { ignore = true };
  }, [props.query]);
  return promiseNoData(searchDataPromise, searchData, error, <div>Searching...</div>) || <SearchResultsLoaded results={getIDsFromSearchResults(searchData)} mini={props.mini} onSelect={props.onSelect} />
>>>>>>> ed1f146de3aa150c2950e07d10a0bfcaf229e9dc
}

const SearchResultsLoaded = (props) => {
  const [currentGroup, videos] = useSelector((state) => [
    state.groups.currentGroup,
    state.playlist.videos
  ])
  const [loading, setLoading] = React.useState(false)
  if (props.results.length != 0) {
    return (
      <div className="searchResults">
        {props.results.map((videoID) => {
          return (
            <VideoSummary
              videoID={videoID}
              mini={props.mini}
              onClick={async (videoData) => {
                if (loading) {
                  return
                }
                setLoading(true)
                const video = {
                  id: videoID,
                  thumbnail: getBestThumbnail(videoData.snippet.thumbnails).url,
                  name: videoData.snippet.title
                }
                try {
                  await addVideosToPlaylist(currentGroup, [video])
                  if (!videos.length) {
                    await updateRelatedVideosFromID(currentGroup, videoID)
                  }
                } catch {}
                setLoading(false)
              }}
            />
          )
        })}
      </div>
    )
  }
  return <div className="searchResults">No results :(</div>
}

const getSearchData = (query) => {
  const escapedQuery = encodeURIComponent(query)
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=10&q=${escapedQuery}&key=${YT_API_KEY}`
  return fetch(url)
}
