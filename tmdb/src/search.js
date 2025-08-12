// This module handles searchin item.
import { search } from './endpoints.js';
import { apiKey, BASE_URL } from './constants.js';

/**
 * Search an item.
 * @param {string} title Title of the item to search.
 * @param {string} type Type of the item to search ('movie', 'tv', 'multi').
 * @returns {object} An object containing search result items.
 */

export async function searchItem(title, type) {
  try {
    const endpoint = search(title, type);
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error searching for items:', error.message);
    return null;
  }
}
