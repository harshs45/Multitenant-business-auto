(function() {
  let publicKey = null;
  let apiBase = 'https://botforge-api-m6d4.onrender.com/api/v1';
  let currentScript = document.currentScript;

  if (currentScript && currentScript.getAttribute('data-botforge-key')) {
    publicKey = currentScript.getAttribute('data-botforge-key');
    apiBase = currentScript.getAttribute('data-botforge-api') || apiBase;
  }

  if (!publicKey) {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const s = scripts[i];
      const src = s.getAttribute('src') || '';
      const key = s.getAttribute('data-botforge-key');
      if (key && (src.includes('loader.js') || src.includes('botforge'))) {
        publicKey = key;
        apiBase = s.getAttribute('data-botforge-api') || apiBase;
        break;
      }
    }
  }

  if (!publicKey && window.BotForgeConfig) {
    publicKey = window.BotForgeConfig.publicKey;
    apiBase = window.BotForgeConfig.apiBase || apiBase;
  }

  if (!publicKey) {
    console.error('BotForge: Missing data-botforge-key.');
    return;
  }

  const frontendUrl = 'https://multitenant-business-auto.vercel.app';

  const container = document.createElement('div');
  container.id = 'botforge-widget-container';
  container.style.position = 'fixed';
  container.style.bottom = '20px';
  container.style.right = '20px';
  container.style.zIndex = '2147483647';

  const iframe = document.createElement('iframe');
  iframe.src = `${frontendUrl}/chat/${publicKey}`;
  iframe.style.width = '380px';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '16px';
  iframe.style.boxShadow = '0 10px 40px rgba(0,0,0,0.16)';
  iframe.style.display = 'none';
  iframe.style.transition = 'all 0.3s ease';
  iframe.style.backgroundColor = 'transparent';
  iframe.allow = 'microphone';

  const button = document.createElement('button');
  button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  button.style.width = '60px';
  button.style.height = '60px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#2563eb';
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
    button.innerHTML = isOpen
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  };

  container.appendChild(iframe);
  container.appendChild(button);
  document.body.appendChild(container);

  // Fetch config with retry for Render cold starts
  async function loadConfig(retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(`${apiBase}/widget/config?key=${publicKey}`);
        if (res.ok) {
          const data = await res.json();
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
          return;
        }
      } catch (err) {
        console.warn(`BotForge: Config fetch attempt ${i + 1} failed`, err);
      }
      await new Promise(r => setTimeout(r, 2000));
    }
    console.error('BotForge: Failed to load config after retries');
  }

  loadConfig();
})();