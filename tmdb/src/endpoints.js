export function search(type) {
    return `/search/${type}`;
}

export function details(type, id) {
    return `${type}/${id}`;
}

export function trending(type, timeWindow) {
    return `/trending/${type}/${timeWindow}`;
}

export function discover(type) {
    return `/discover/${type}`;
}

export function popular(type) {
    return `/${type}/popular`;
}

export function topRated(type) {
    return `/${type}/top_rated`;
}

export function tvSeasonDetails(tvId, seasonNumber) {
    return `/${details('tv', tvId)}/season/${seasonNumber}`;
}
