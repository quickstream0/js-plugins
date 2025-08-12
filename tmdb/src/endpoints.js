import { apiKey, appendToResponse } from './constants.js';

export function search(title, type) {
    if (!type) {
        return `/search/multi?query=${title}&api_key=${apiKey}`;
    }
    return `/search/${type}?query=${title}&api_key=${apiKey}`;
}

export function details(type, id) {
    return `${type}/${id}?api_key=${apiKey}&append_to_response=${appendToResponse}`;
}

export function trending(type, timeWindow) {
    return `/trending/${type}/${timeWindow}?api_key=${apiKey}`;
}

export function discover(type) {
    return `/discover/${type}?api_key=${apiKey}`;
}

export function popular(type) {
    return `/${type}/popular?api_key=${apiKey}`;
}

export function topRated(type) {
    return `/${type}/top_rated?api_key=${apiKey}`;
}

export function tvSeasonDetails(tvId, seasonNumber) {
    return `/${details('tv', tvId)}/season/${seasonNumber}?api_key=${apiKey}`;
}
