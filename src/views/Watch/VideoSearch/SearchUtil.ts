export const getIDsFromSearchResults = (results: { items: any[] }) => {
    return results.items.map(video => video.id.videoId);
}