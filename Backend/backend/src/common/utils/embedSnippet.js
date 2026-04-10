/**
 * Generates the HTML/JS embed snippet for a published bot.
 *
 * @param {string} publicKey - The widget public key
 * @param {string} baseUrl   - The backend base URL (e.g. https://api.botforge.io)
 */
const generateEmbedSnippet = (publicKey, baseUrl) => {
  return `<!-- BotForge Chat Widget -->
<script>
  (function() {
    var bf = document.createElement('script');
    bf.type = 'text/javascript';
    bf.async = true;
    bf.src = '${baseUrl}/widget/loader.js';
    bf.setAttribute('data-botforge-key', '${publicKey}');
    bf.setAttribute('data-botforge-api', '${baseUrl}/api/v1');
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(bf, s);
  })();
</script>`;
};

module.exports = { generateEmbedSnippet };
