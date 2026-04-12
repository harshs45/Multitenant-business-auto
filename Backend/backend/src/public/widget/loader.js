// Replace the existing fetch block at the bottom with this:
async function loadConfig(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${apiBase}/widget/config/${publicKey}`);
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
      console.warn(`BotForge: Config fetch attempt ${i + 1} failed`);
    }
    await new Promise(r => setTimeout(r, 2000)); // wait 2s before retry
  }
  console.error('BotForge: Failed to load config after retries');
}

loadConfig();