export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  "https://botforge-api-m6d4.onrender.com/api/v1";

  console.log("VITE_API_BASE_URL =", import.meta.env.VITE_API_BASE_URL);
console.log("API_BASE_URL =", API_BASE_URL);
export const WIDGET_LOADER_URL = 
  import.meta.env.VITE_WIDGET_LOADER_URL || 
  "https://botforge-api-m6d4.onrender.com/widget/loader.js";

// Safety check — warns you immediately in dev if vars are missing
if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn("BotForge: VITE_API_BASE_URL is not set. Falling back to default.");
}