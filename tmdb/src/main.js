// This is the single entry point that Flutter will call.
import { searchItem } from './search.js';
import { getHomeItems } from './home.js';
import { getItems } from './items.js';
import { getItemDetails, getItemSeasonDetails } from './detail.js';

/**
 * The main function exposed to Flutter. It acts as a router.
 * @param {object} params An object containing the API parameters.
 * @param {string} params.mode The fetch mode ('home' or 'details' or 'search').
 * @param {string} params.type The type media to get ('movie', 'tv', 'all').
 * @param {string} params.id The ID of the media to get.
 * @returns {Promise<string>} A JSON string containing the result.
 */
async function run(params) {
  try {
    if (!params || typeof params !== 'object') {
      return JSON.stringify({ success: false, error: 'Parameters must be an object.' });
    }

    const { mode } = params;
    if (!mode) {
      return JSON.stringify({ success: false, error: 'Missing mode parameter.' });
    }

    let result;

    switch (mode) {
      case 'search': {
        const { query } = params;
        if (!query || typeof query !== 'string') {
          return JSON.stringify({ success: false, error: 'Missing or invalid "query" parameter for search mode.' });
        }
        result = await searchItem(query);
        break;
      }

      case 'home': {
        result = await getHomeItems();
        break;
      }

      case 'items': {
        const { id } = params;
        if (!id) {
          return JSON.stringify({ success: false, error: 'Missing "id" parameter for items mode.' });
        }
        result = await getItems(id);
        break;
      }

      case 'details': {
        const { type, id } = params;
        if (!type || !id) {
          return JSON.stringify({ success: false, error: 'Missing "type" or "id" parameter for details mode.' });
        }
        result = await getItemDetails(type, id);
        break;
      }

      case 'seasonDetails': {
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

// Expose the single entry point to the global scope.
globalThis.run = run;
