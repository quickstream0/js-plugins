// This module handles fetching and parsing the item detail page.
import { details, tvSeasonDetails } from './endpoints.js';
import { apiKey, BASE_URL, appendToResponse } from './constants.js';

/**
 * Get an item's details for more information.
 * @param {string} type The type media to get details ('movie', 'tv').
 * @param {string} id The ID of the media to get details.
 * @returns {object} An object containing the item's details.
 */

export async function getItemDetails(type, id) {
  const options = {
    headers: {
      "api_key": apiKey,
      "append_to_response": appendToResponse,
    }
  };
  try {
    const endpoint = details(type, id);
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, options);
    return await response.json();

  } catch (error) {
    console.error('Error fetching item details:', error.message);
    return null;
  }
}

export async function getItemSeasonDetails(id, sn) {
  try {
    const options = {
      headers: { "api_key": apiKey }
    };
    const endpoint = tvSeasonDetails(id, sn);
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error('Error fetching item details:', error.message);
    return null;
  }
}