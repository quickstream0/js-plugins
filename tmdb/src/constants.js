import { getRandomItem } from './utils.js';

export const BASE_URL = 'https://api.themoviedb.org/3';

export const IMG_URL = 'https://image.tmdb.org/t/p';

export const imageSizes = {
    poster: 'w342',
    backdrop: 'w780',
    profile: 'w154',
    still: 'w300',
    avatar: 'w154',
};

export const movieGenres = [
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

export const tvGenres = [
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

export const releaseYears = [
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
    2000,
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

export const apiKeys = [
    '7070e2fe1f83238edc3ada49acb2cb25',
    'cdd513a4c476f9ad79cbe4c0eb6c8ed0',
    '7502b8c031c79790fe5c0b4f94fd770d'
];

export const tvGenre = getRandomItem(tvGenres);

export const movieGenre = getRandomItem(movieGenres);

export const tvYear = getRandomItem(releaseYears);

export const movieYear = getRandomItem(releaseYears);

export const apiKey = getRandomItem(apiKeys);

export const options = {
    headers: { "api_key": apiKey }
};

export const appendToResponse =
    "credits,videos,reviews,similar,external_ids,recommendations";