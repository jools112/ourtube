import React from "react";

export const getIDsFromSearchResults = (results: { items: any[] }) => {
    return results.items.map(video => video.id.videoId);
}

export const promiseNoData = (promise: Promise<any>, data: any, error: any, placeholder: React.FC) => {
    return (!promise && <span></span>
        || (promise && !data && !error) && placeholder
        || error && <span>err: {error.toString()}</span>
        || false);
}