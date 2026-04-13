/**
 * Generates the HTML/JS embed snippet for a published bot.
 *
 * @param {string} publicKey - The widget public key
 * @param {string} baseUrl   - The backend base URL (e.g. https://api.botforge.io)
 */
const generateEmbedSnippet = (apiKey, baseUrl) => {
  return `<script
  src="${baseUrl}/widget/loader.js"
  data-botforge-key="${apiKey}"
  data-botforge-api="${baseUrl}/api/v1">
</script>`;
};

module.exports = { generateEmbedSnippet };
