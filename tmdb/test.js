// Load plugin file
import './dist/main.js';

// Call run() function
const params = { mode: "search", query: "boy", type: "multi" }; // search mode
// const params = { mode: "home" }; // home mode

(async () => {
    try {
        const result = await globalThis.run(params);
        console.log("Plugin result:", result);
    } catch (err) {
        console.error("Error running plugin:", err);
    }
})();
