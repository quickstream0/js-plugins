// This module handles searchin item.
import { BASE_URL } from './constants.js';

/**
 * Search an item.
 * @param {string} id The ID of the media items.
 * @returns {object} An object containing search result items.
 */

export async function getItems(id) {
  const url = `${BASE_URL}${id}?api_key=${apiKey}`;
  const response = await fetch(url);
  return await response.json();
}
