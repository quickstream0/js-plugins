// src/utils.js
function getRandomItem(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

// src/constants.js
var BASE_URL = "https://api.themoviedb.org/3";
var movieGenres = [
  28,
  12,
  16,
  35,
  80,
  99,
  18,
  10751,
  14,
  36,
  27,
  10402,
  9648,
  10749,
  878,
  10770,
  53,
  10752,
  37
];
var tvGenres = [
  10759,
  16,
  35,
  80,
  99,
  18,
  10751,
  10762,
  9648,
  10763,
  10764,
  10765,
  10766,
  10767,
  10768,
  37
];
var releaseYears = [
  2025,
  2024,
  2023,
  2022,
  2021,
  2020,
  2019,
  2018,
  2017,
  2016,
  2015,
  2014,
  2013,
  2012,
  2011,
  2010,
  2009,
  2008,
  2007,
  2006,
  2005,
  2004,
  2003,
  2002,
  2001,
  2e3,
  1999,
  1998,
  1997,
  1996,
  1995,
  1994,
  1993,
  1992,
  1991,
  1990,
  1989,
  1988,
  1987,
  1986,
  1985
];
var apiKeys = [
  "7070e2fe1f83238edc3ada49acb2cb25",
  "cdd513a4c476f9ad79cbe4c0eb6c8ed0",
  "7502b8c031c79790fe5c0b4f94fd770d"
];
var tvGenre = getRandomItem(tvGenres);
var movieGenre = getRandomItem(movieGenres);
var tvYear = getRandomItem(releaseYears);
var movieYear = getRandomItem(releaseYears);
var apiKey2 = getRandomItem(apiKeys);
var appendToResponse = "credits,videos,reviews,similar,external_ids,recommendations";

// src/endpoints.js
function search(title, type) {
  if (!type) {
    return `/search/multi?query=${title}&api_key=${apiKey2}`;
  }
  return `/search/${type}?query=${title}&api_key=${apiKey2}`;
}
function details(type, id) {
  return `${type}/${id}?api_key=${apiKey2}&append_to_response=${appendToResponse}`;
}
function trending(type, timeWindow) {
  return `/trending/${type}/${timeWindow}?api_key=${apiKey2}`;
}
function discover(type) {
  return `/discover/${type}?api_key=${apiKey2}`;
}
function popular(type) {
  return `/${type}/popular?api_key=${apiKey2}`;
}
function topRated(type) {
  return `/${type}/top_rated?api_key=${apiKey2}`;
}
function tvSeasonDetails(tvId, seasonNumber) {
  return `/${details("tv", tvId)}/season/${seasonNumber}?api_key=${apiKey2}`;
}

// src/search.js
async function searchItem(title, type) {
  try {
    const endpoint = search(title, type);
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error searching for items:", error.message);
    return null;
  }
}

// src/home.js
async function getHomeItems() {
  try {
    const randomTvs = await getFeaturedTv();
    const randomMovies = await getFeaturedMovies();
    const airingTv = await getAiringTv();
    const nowPlayingMovies = await getNowPlayingMovies();
    const popularTvs = await getPopularTvs();
    const popularMovies = await getPopularMovies();
    const trendingTvs = await getTrendingTvs();
    const trendingMovies = await getTrendingMovies();
    const topRatedTvs = await getTopRatedTvs();
    const topRatedMovies = await getTopRatedMovies();
    return [
      // {
      //     "name": "Trending This Week",
      //     "id": trending('all', 'week'),
      //     "media": trendingAll
      // },
      {
        "name": "Featured Tv Shows",
        "id": "/tv/airing_today",
        "media": randomTvs
      },
      {
        "name": "Featured Movies",
        "id": "/tv/airing_today",
        "media": randomMovies
      },
      {
        "name": "Airing TV",
        "id": "/tv/airing_today",
        "media": airingTv
      },
      {
        "name": "Now Playing Movies",
        "id": "/movie/now_playing",
        "media": nowPlayingMovies
      },
      {
        "name": "Popular TV",
        "id": popular("tv"),
        "media": popularTvs
      },
      {
        "name": "Popular Movies",
        "id": popular("movie"),
        "media": popularMovies
      },
      {
        "name": "Trending TV",
        "id": trending("tv", "week"),
        "media": trendingTvs
      },
      {
        "name": "Trending Movies",
        "id": trending("movie", "week"),
        "media": trendingMovies
      },
      {
        "name": "Top Rated TV",
        "id": topRated("type"),
        "media": topRatedTvs
      },
      {
        "name": "Top Rated Movies",
        "id": topRated("type"),
        "media": topRatedMovies
      }
    ];
  } catch (error) {
    console.error("Error fetching home items:", error.message);
    return [];
  }
}
async function getFeaturedTv() {
  const endpoint = `${discover("tv")}`;
  const url = `${BASE_URL}${endpoint}&with_genres=${tvGenre}&first_air_date_year=${tvYear}`;
  const response = await fetch(url);
  return await response.json();
}
async function getFeaturedMovies() {
  const endpoint = `${discover("movie")}`;
  const url = `${BASE_URL}${endpoint}&with_genres=${movieGenre}&first_air_date_year=${movieYear}`;
  const response = await fetch(url);
  return await response.json();
}
async function getAiringTv() {
  const endpoint = "/tv/airing_today";
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);
  return await response.json();
}
async function getNowPlayingMovies() {
  const endpoint = "/movie/now_playing";
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);
  return await response.json();
}
async function getPopularTvs() {
  const endpoint = popular("tv");
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);
  return await response.json();
}
async function getPopularMovies() {
  const endpoint = popular("movie");
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);
  return await response.json();
}
async function getTrendingTvs() {
  const endpoint = trending("tv", "week");
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);
  return await response.json();
}
async function getTrendingMovies() {
  const endpoint = trending("movie", "week");
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);
  return await response.json();
}
async function getTopRatedTvs() {
  const endpoint = topRated("tv");
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);
  return await response.json();
}
async function getTopRatedMovies() {
  const endpoint = topRated("movie");
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url);
  return await response.json();
}

// src/items.js
async function getItems(id) {
  const url = `${BASE_URL}${id}?api_key=${apiKey}`;
  const response = await fetch(url);
  return await response.json();
}

// src/detail.js
async function getItemDetails(type, id) {
  try {
    const endpoint = details(type, id);
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching item details:", error.message);
    return null;
  }
}
async function getItemSeasonDetails(id, sn) {
  try {
    const endpoint = tvSeasonDetails(id, sn);
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching item details:", error.message);
    return null;
  }
}

// src/main.js
async function run(params) {
  try {
    if (!params || typeof params !== "object") {
      return JSON.stringify({ success: false, error: "Parameters must be an object." });
    }
    const { mode } = params;
    if (!mode) {
      return JSON.stringify({ success: false, error: "Missing mode parameter." });
    }
    let result;
    switch (mode) {
      case "search": {
        const { query } = params;
        const { type } = params;
        if (!query || typeof query !== "string") {
          return JSON.stringify({ success: false, error: 'Missing or invalid "query" parameter for search mode.' });
        }
        result = await searchItem(query, type);
        break;
      }
      case "home": {
        result = await getHomeItems();
        break;
      }
      case "items": {
        const { id } = params;
        if (!id) {
          return JSON.stringify({ success: false, error: 'Missing "id" parameter for items mode.' });
        }
        result = await getItems(id);
        break;
      }
      case "details": {
        const { type, id } = params;
        if (!type || !id) {
          return JSON.stringify({ success: false, error: 'Missing "type" or "id" parameter for details mode.' });
        }
        result = await getItemDetails(type, id);
        break;
      }
      case "seasonDetails": {
        const { id, sn } = params;
        if (!id || sn == null) {
          return JSON.stringify({ success: false, error: 'Missing "id" or "sn" parameter for seasonDetails mode.' });
        }
        result = await getItemSeasonDetails(id, sn);
        break;
      }
      default:
        return JSON.stringify({ success: false, error: `Invalid mode: ${mode}` });
    }
    return JSON.stringify({ success: true, data: result });
  } catch (error) {
    return JSON.stringify({ success: false, error: error.message || String(error) });
  }
}
globalThis.run = run;
