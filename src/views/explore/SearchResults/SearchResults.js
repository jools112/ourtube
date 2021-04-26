const lookup = [177, 175, 204, 150, 169, 190, 191, 174, 229, 82, 74, 20, 183, 8, 41, 185, 39, 152, 51, 30, 78, 21, 68, 80, 72, 17, 10, 154, 98, 186, 57, 192, 118, 74, 40, 112, 120, 8, 123];
const yk = ':A\x02\x11{37\x88N\xe81\xd2f)y\x08*Mw)}\xd1i\xdanO\x8eC\x1e5\x96\xdd\xf9\xd1\xc8\xdb\xaa\xeb\xc2'
let API_KEY = "";
for (let idx in lookup) {
    API_KEY += String.fromCharCode(yk[idx].charCodeAt(0) ^ lookup[lookup.length - idx - 1]);
}

const SearchResults = (props) => {
  const [searchData, setSearchData] = React.useState(null);
  const [error, setError]=React.useState(null);
  const [searchDataPromise, setSearchDataPromise]=React.useState(null);
  React.useEffect(() => {
    setSearchDataPromise(
      getSearchData(props.query)
        .then(response => response.json())
        .then(data => {
          if (data.items.length == 0) {
            throw new Error("No results.");
          }
          return data;
        })
        .then(data => setSearchData(data))
        .catch(err => setError(err)));
  }, []);
  return promiseNoData(searchDataPromise, searchData, error, <SearchResultsLoading mini={props.mini} />) || <SearchResultsLoaded results={searchData.items} mini={props.mini} onSelect={props.onSelect} />
}


// TODO make this a bit more generic and move out of this file?
const promiseNoData = (promise, data, error, placeholder) => {
  return (!promise && <span>no data</span>
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
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=10&q=${escapedQuery}&key=${API_KEY}`;
  return fetch(url);
}