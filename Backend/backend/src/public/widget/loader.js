(function() {
  let publicKey = null;
  let apiBase = 'https://botforge-api-m6d4.onrender.com/api/v1';
  let currentScript = document.currentScript;

  // 1. Check currentScript if it's us
  if (currentScript && currentScript.getAttribute('data-botforge-key')) {
    publicKey = currentScript.getAttribute('data-botforge-key');
    apiBase = currentScript.getAttribute('data-botforge-api') || apiBase;
  }

  // 2. Selective fallback: Search for the most likely script tag
  if (!publicKey) {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const s = scripts[i];
      const src = s.getAttribute('src') || '';
      const key = s.getAttribute('data-botforge-key');
      
      // Selectively identify by key OR by filename if it has the key attribute
      if (key && (src.includes('loader.js') || src.includes('botforge'))) {
        publicKey = key;
        apiBase = s.getAttribute('data-botforge-api') || apiBase;
        break;
      }
    }
  }

  // 3. Global config fallback (window.BotForgeConfig)
  if (!publicKey && window.BotForgeConfig) {
    publicKey = window.BotForgeConfig.publicKey || window.BotForgeConfig.botId;
    apiBase = window.BotForgeConfig.apiBase || apiBase;
  }

  if (!publicKey) {
    console.error('BotForge: Missing data-botforge-key. Ensure the script tag has data-botforge-key attribute or window.BotForgeConfig is set.');
    return;
  }
  // Note: Assuming frontend is hosted at localhost:5173 for development
  // In production, you would swap this string for the production UI endpoint.
  const frontendUrl = 'http://localhost:5173'; 

  // Inject a container, a toggle button, and an iframe
  const container = document.createElement('div');
  container.id = 'botforge-widget-container';
  container.style.position = 'fixed';
  container.style.bottom = '20px';
  container.style.right = '20px';
  container.style.zIndex = '2147483647'; // Max z-index

  const iframe = document.createElement('iframe');
  
  // Point iframe to the frontend chat UI (change path if needed based on frontend routes)
  iframe.src = `${frontendUrl}/chat/${publicKey}`;
  
  iframe.style.width = '380px';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '16px';
  iframe.style.boxShadow = '0 10px 40px rgba(0,0,0,0.16)';
  iframe.style.display = 'none'; // Hidden initially
  iframe.style.transition = 'all 0.3s ease';
  iframe.style.backgroundColor = 'transparent';
  iframe.allow = 'microphone'; // if you ever need voice input
  
  const button = document.createElement('button');
  button.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>`;
  button.style.width = '60px';
  button.style.height = '60px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#2563eb'; // Default Blue
  button.style.color = '#ffffff';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.boxShadow = '0 4px 12px rgba(37,99,235,0.4)';
  button.style.marginTop = '16px';
  button.style.float = 'right';
  button.style.transition = 'transform 0.2s ease, background-color 0.2s';

  button.onmouseover = () => button.style.transform = 'scale(1.05)';
  button.onmouseout = () => button.style.transform = 'scale(1)';

  let isOpen = false;
  button.onclick = () => {
    isOpen = !isOpen;
    iframe.style.display = isOpen ? 'block' : 'none';
    if (isOpen) {
      button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>`;
    } else {
      button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>`;
    }
  };

  container.appendChild(iframe);
  container.appendChild(button);
  document.body.appendChild(container);

  // Fetch config to customize widget design dynamically
  fetch(`${apiBase}/widget/config/${publicKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.success && data.data) {
        const config = data.data;
        if (config.theme?.customPrimaryColor) {
           button.style.backgroundColor = config.theme.customPrimaryColor;
           button.style.boxShadow = `0 4px 12px ${config.theme.customPrimaryColor}66`;
        }
        if (config.theme?.widgetPosition === 'bottom-left') {
           container.style.right = 'auto';
           container.style.left = '20px';
           button.style.float = 'left';
        }
      }
    })
    .catch(err => console.error('BotForge: Failed to load config', err));
})();
