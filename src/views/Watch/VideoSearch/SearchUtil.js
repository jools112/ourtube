export const getIDsFromSearchResults = (results) => {
    return results.items.map(video => video.id.videoId);
}