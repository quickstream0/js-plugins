// This module handles fetching and parsing the home page.
import { options, BASE_URL, apiKey, tvGenre, movieGenre, tvYear, movieYear } from './constants.js';
import { trending, discover, popular, topRated } from './endpoints.js';

/**
 * Get home recommendation items. 
 * [Fetches various items then categorize them to dict list].
 * @returns {Array<object>} An array of item objects.
 */
export async function getHomeItems() {
  try {
    // const trendingAll = await getTrending();
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
        "id": popular('tv'),
        "media": popularTvs
      },
      {
        "name": "Popular Movies",
        "id": popular('movie'),
        "media": popularMovies
      },
      {
        "name": "Trending TV",
        "id": trending('tv', 'week'),
        "media": trendingTvs
      },
      {
        "name": "Trending Movies",
        "id": trending('movie', 'week'),
        "media": trendingMovies
      },
      {
        "name": "Top Rated TV",
        "id": topRated('type'),
        "media": topRatedTvs
      },
      {
        "name": "Top Rated Movies",
        "id": topRated('type'),
        "media": topRatedMovies
      }
    ];

  } catch (error) {
    console.error('Error fetching home items:', error.message);
    return [];
  }
}

// async function getTrending() {
//     const endpoint = trending('all', 'week');
//     const url = `${BASE_URL}${endpoint}`;
//     const response = await fetch(url, options);
//     return await response.json();
// }

async function getFeaturedTv() {
  const options = {
    headers: {
      "with_genres": tvGenre,
      "first_air_date_year": tvYear,
      "api_key": apiKey
    }
  };
  const endpoint = `${discover('tv')}`;
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
}

async function getFeaturedMovies() {
  const options = {
    headers: {
      "with_genres": movieGenre,
      "primary_release_year": movieYear,
      "api_key": apiKey
    }
  };
  const endpoint = `${discover('movie')}`;
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
}

async function getAiringTv() {
  const endpoint = "/tv/airing_today";
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
}

async function getNowPlayingMovies() {
  const endpoint = "/movie/now_playing";
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
}

async function getPopularTvs() {
  const endpoint = popular('tv');
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
}

async function getPopularMovies() {
  const endpoint = popular('movie');
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
}

async function getTrendingTvs() {
  const endpoint = trending('tv', 'week');
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
}

async function getTrendingMovies() {
  const endpoint = trending('movie', 'week');
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
}

async function getTopRatedTvs() {
  const endpoint = topRated('tv');
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
}

async function getTopRatedMovies() {
  const endpoint = topRated('movie');
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
}
