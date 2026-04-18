import { useState } from "react";
import { useWizardStore } from "../../../store/wizardStore";
import { ArrowLeft, Check, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { cn } from "../../../lib/utils";
import { generateBot } from "../../../lib/api";

const THEMES = [
  { id: 'midnight',  name: 'Midnight Pro',    sub: 'Dark & sleek',       chatBg: '#0f0f23', botBg: '#16213e', userBg: '#7F77DD' ,
    svg:(
      <svg viewBox="0 0 280 360" className="w-full h-full transition-transform duration-300 hover:scale-105" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Midnight Pro Theme</title>
  <desc>BotForge chatbot theme preview – Midnight Pro</desc>
  <defs>
    <radialGradient id="mp-glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="mp-glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="mp-clip">
      <rect width="280" height="360" rx="16"/>
    </clipPath>
  </defs>

  <rect width="280" height="360" rx="16" fill="#0d1117"/>
  <rect width="280" height="360" rx="16" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>

  <ellipse cx="240" cy="40" rx="80" ry="80" fill="url(#mp-glow1)" clip-path="url(#mp-clip)"/>
  <ellipse cx="50" cy="320" rx="60" ry="60" fill="url(#mp-glow2)" clip-path="url(#mp-clip)"/>

  <circle cx="24" cy="28" r="4" fill="#7c3aed" opacity="0.7"/>
  <circle cx="36" cy="28" r="4" fill="#a78bfa" opacity="0.7"/>
  <circle cx="48" cy="28" r="4" fill="#c4b5fd" opacity="0.7"/>

  <text x="24" y="60" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#f8fafc" opacity="0.4" letter-spacing="1.2">THEME</text>

  <text x="24" y="88" font-family="system-ui, sans-serif" font-size="22" font-weight="600" fill="#f8fafc">Midnight Pro</text>

  <text x="24" y="108" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" opacity="0.45">Deep focus. Premium dark.</text>

  <rect x="24" y="140" width="180" height="28" rx="8" fill="#161b22" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
  <text x="34" y="158" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1">How can I assist you today?</text>

  <rect x="110" y="180" width="150" height="28" rx="8" fill="#7c3aed"/>
  <text x="120" y="198" font-family="system-ui, sans-serif" font-size="10" fill="#ffffff">Tell me about the API.</text>

  <rect x="24" y="240" width="180" height="30" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <text x="34" y="260" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Type a message…</text>

  <circle cx="240" cy="255" r="14" fill="#7c3aed"/>
  <path d="M234 261 L240 255 L234 249 L234 252.5 L238 255 L234 257.5 Z" fill="#ffffff"/>

  <rect x="24" y="310" width="110" height="16" rx="8" fill="rgba(124,58,237,0.18)" stroke="rgba(167,139,250,0.3)" stroke-width="0.5"/>
  <text x="30" y="322" font-family="system-ui, sans-serif" font-size="9" fill="#a78bfa">⬡ Midnight Pro</text>
</svg>
    )},
  { id: 'emerald',   name: 'Emerald Fresh',   sub: 'Clean & natural',    chatBg: '#f0fdf4', botBg: '#d1fae5', userBg: '#059669',svg:(
      <svg viewBox="0 0 280 360" className="w-full h-full transition-transform duration-300 hover:scale-105" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Emerald Fresh Theme</title>
  <desc>BotForge chatbot theme preview – Emerald Fresh</desc>
  <defs>
    <radialGradient id="ef-glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ef-glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#6ee7b7" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#6ee7b7" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="ef-clip">
      <rect width="280" height="360" rx="16"/>
    </clipPath>
  </defs>

  <rect width="280" height="360" rx="16" fill="#0a1a12"/>
  <rect width="280" height="360" rx="16" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>

  <ellipse cx="240" cy="40" rx="80" ry="80" fill="url(#ef-glow1)" clip-path="url(#ef-clip)"/>
  <ellipse cx="50" cy="320" rx="60" ry="60" fill="url(#ef-glow2)" clip-path="url(#ef-clip)"/>

  <circle cx="24" cy="28" r="4" fill="#10b981" opacity="0.7"/>
  <circle cx="36" cy="28" r="4" fill="#6ee7b7" opacity="0.7"/>
  <circle cx="48" cy="28" r="4" fill="#a7f3d0" opacity="0.7"/>

  <text x="24" y="60" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#ecfdf5" opacity="0.4" letter-spacing="1.2">THEME</text>

  <text x="24" y="88" font-family="system-ui, sans-serif" font-size="22" font-weight="600" fill="#ecfdf5">Emerald Fresh</text>

  <text x="24" y="108" font-family="system-ui, sans-serif" font-size="11" fill="#d1fae5" opacity="0.45">Crisp. Organic. Alive.</text>

  <rect x="24" y="140" width="180" height="28" rx="8" fill="#0f2318" stroke="rgba(16,185,129,0.12)" stroke-width="0.5"/>
  <text x="34" y="158" font-family="system-ui, sans-serif" font-size="10" fill="#6ee7b7">How can I assist you today?</text>

  <rect x="110" y="180" width="150" height="28" rx="8" fill="#065f46" stroke="rgba(16,185,129,0.3)" stroke-width="0.5"/>
  <text x="120" y="198" font-family="system-ui, sans-serif" font-size="10" fill="#a7f3d0">Tell me about the API.</text>

  <rect x="24" y="240" width="180" height="30" rx="8" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.15)" stroke-width="0.5"/>
  <text x="34" y="260" font-family="system-ui, sans-serif" font-size="10" fill="#6ee7b7" opacity="0.5">Type a message…</text>

  <circle cx="240" cy="255" r="14" fill="#10b981"/>
  <path d="M234 261 L240 255 L234 249 L234 252.5 L238 255 L234 257.5 Z" fill="#ffffff"/>

  <rect x="24" y="310" width="120" height="16" rx="8" fill="rgba(16,185,129,0.15)" stroke="rgba(110,231,183,0.3)" stroke-width="0.5"/>
  <text x="30" y="322" font-family="system-ui, sans-serif" font-size="9" fill="#6ee7b7">⬡ Emerald Fresh</text>
</svg>) },
  { id: 'sakura',    name: 'Sakura',          sub: 'Soft & warm',        chatBg: '#fff1f8', botBg: '#fce7f3', userBg: '#db2777',svg:(
      <svg className="w-full h-full transition-transform duration-300 hover:scale-105" viewBox="0 0 280 360" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Sakura Theme</title>
  <desc>BotForge chatbot theme preview – Sakura</desc>
  <defs>
    <radialGradient id="sk-glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f472b6" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#f472b6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sk-glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fbcfe8" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#fbcfe8" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="sk-clip">
      <rect width="280" height="360" rx="16"/>
    </clipPath>
  </defs>

  
  <rect width="280" height="360" rx="16" fill="#1a0d14"/>
  <rect width="280" height="360" rx="16" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>

  <ellipse cx="240" cy="40" rx="80" ry="80" fill="url(#sk-glow1)" clip-path="url(#sk-clip)"/>
  <ellipse cx="50" cy="320" rx="60" ry="60" fill="url(#sk-glow2)" clip-path="url(#sk-clip)"/>

  <circle cx="24" cy="28" r="4" fill="#f472b6" opacity="0.7"/>
  <circle cx="36" cy="28" r="4" fill="#f9a8d4" opacity="0.7"/>
  <circle cx="48" cy="28" r="4" fill="#fbcfe8" opacity="0.7"/>

  <text x="24" y="60" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#fdf2f8" opacity="0.4" letter-spacing="1.2">THEME</text>

  <text x="24" y="88" font-family="system-ui, sans-serif" font-size="22" font-weight="600" fill="#fdf2f8">Sakura</text>

  <text x="24" y="108" font-family="system-ui, sans-serif" font-size="11" fill="#fce7f3" opacity="0.45">Delicate. Refined. Poetic.</text>

  <rect x="24" y="140" width="180" height="28" rx="8" fill="#2a1020" stroke="rgba(244,114,182,0.1)" stroke-width="0.5"/>
  <text x="34" y="158" font-family="system-ui, sans-serif" font-size="10" fill="#f9a8d4">How can I assist you today?</text>

  <rect x="110" y="180" width="150" height="28" rx="8" fill="#9d174d" stroke="rgba(244,114,182,0.3)" stroke-width="0.5"/>
  <text x="120" y="198" font-family="system-ui, sans-serif" font-size="10" fill="#fbcfe8">Tell me about the API.</text>

  <rect x="24" y="240" width="180" height="30" rx="8" fill="rgba(244,114,182,0.06)" stroke="rgba(244,114,182,0.15)" stroke-width="0.5"/>
  <text x="34" y="260" font-family="system-ui, sans-serif" font-size="10" fill="#f9a8d4" opacity="0.5">Type a message…</text>
   <circle cx="240" cy="255" r="14" fill="#db2777"/>
  <path d="M234 261 L240 255 L234 249 L234 252.5 L238 255 L234 257.5 Z" fill="#ffffff"/>

  <rect x="24" y="310" width="90" height="16" rx="8" fill="rgba(244,114,182,0.15)" stroke="rgba(251,207,232,0.3)" stroke-width="0.5"/>
  <text x="30" y="322" font-family="system-ui, sans-serif" font-size="9" fill="#f9a8d4">⬡ Sakura</text>
</svg>
    ) },
  { id: 'ocean',     name: 'Ocean Breeze',    sub: 'Calm & clear',       chatBg: '#eff6ff', botBg: '#dbeafe', userBg: '#2563eb',svg:(
      <svg viewBox="0 0 280 360" className="w-full h-full transition-transform duration-300 hover:scale-105" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Ocean Breeze Theme</title>
  <desc>BotForge chatbot theme preview – Ocean Breeze</desc>
  <defs>
    <radialGradient id="ob-glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ob-glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.13"/>
      <stop offset="100%" stop-color="#93c5fd" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="ob-clip">
      <rect width="280" height="360" rx="16"/>
    </clipPath>
  </defs>

  <rect width="280" height="360" rx="16" fill="#051525"/>
  <rect width="280" height="360" rx="16" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>

  <ellipse cx="240" cy="40" rx="90" ry="90" fill="url(#ob-glow1)" clip-path="url(#ob-clip)"/>
  <ellipse cx="50" cy="320" rx="60" ry="60" fill="url(#ob-glow2)" clip-path="url(#ob-clip)"/>

  <circle cx="24" cy="28" r="4" fill="#38bdf8" opacity="0.7"/>
  <circle cx="36" cy="28" r="4" fill="#7dd3fc" opacity="0.7"/>
  <circle cx="48" cy="28" r="4" fill="#bae6fd" opacity="0.7"/>

  <text x="24" y="60" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#f0f9ff" opacity="0.4" letter-spacing="1.2">THEME</text>

  <text x="24" y="88" font-family="system-ui, sans-serif" font-size="22" font-weight="600" fill="#f0f9ff">Ocean Breeze</text>

  <text x="24" y="108" font-family="system-ui, sans-serif" font-size="11" fill="#e0f2fe" opacity="0.45">Calm. Expansive. Clear.</text>

  <rect x="24" y="140" width="180" height="28" rx="8" fill="#0a2040" stroke="rgba(56,189,248,0.1)" stroke-width="0.5"/>
  <text x="34" y="158" font-family="system-ui, sans-serif" font-size="10" fill="#7dd3fc">How can I assist you today?</text>

  <rect x="110" y="180" width="150" height="28" rx="8" fill="#0c4a6e" stroke="rgba(56,189,248,0.3)" stroke-width="0.5"/>
  <text x="120" y="198" font-family="system-ui, sans-serif" font-size="10" fill="#bae6fd">Tell me about the API.</text>

  <rect x="24" y="240" width="180" height="30" rx="8" fill="rgba(56,189,248,0.06)" stroke="rgba(56,189,248,0.15)" stroke-width="0.5"/>
  <text x="34" y="260" font-family="system-ui, sans-serif" font-size="10" fill="#7dd3fc" opacity="0.5">Type a message…</text>

  <circle cx="240" cy="255" r="14" fill="#0284c7"/>
  <path d="M234 261 L240 255 L234 249 L234 252.5 L238 255 L234 257.5 Z" fill="#ffffff"/>

  <rect x="24" y="310" width="110" height="16" rx="8" fill="rgba(56,189,248,0.13)" stroke="rgba(147,197,253,0.3)" stroke-width="0.5"/>
  <text x="30" y="322" font-family="system-ui, sans-serif" font-size="9" fill="#93c5fd">⬡ Ocean Breeze</text>
</svg>
    ) },
  { id: 'slate',     name: 'Slate Classic',   sub: 'Professional',       chatBg: '#f8fafc', botBg: '#f1f5f9', userBg: '#475569',svg:(
      <svg viewBox="0 0 280 360" className="w-full h-fulltransition-transform duration-300 hover:scale-105" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Slate Classic Theme</title>
  <desc>BotForge chatbot theme preview – Slate Classic</desc>
  <defs>
    <radialGradient id="sc-glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#94a3b8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sc-glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#64748b" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#64748b" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="sc-clip">
      <rect width="280" height="360" rx="16"/>
    </clipPath>
  </defs>

  <rect width="280" height="360" rx="16" fill="#0f1217"/>
  <rect width="280" height="360" rx="16" fill="none" stroke="rgba(148,163,184,0.1)" stroke-width="0.5"/>

  <ellipse cx="240" cy="40" rx="90" ry="90" fill="url(#sc-glow1)" clip-path="url(#sc-clip)"/>
  <ellipse cx="50" cy="320" rx="60" ry="60" fill="url(#sc-glow2)" clip-path="url(#sc-clip)"/>

  <circle cx="24" cy="28" r="4" fill="#475569" opacity="0.8"/>
  <circle cx="36" cy="28" r="4" fill="#94a3b8" opacity="0.8"/>
  <circle cx="48" cy="28" r="4" fill="#cbd5e1" opacity="0.8"/>

  <text x="24" y="60" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#f1f5f9" opacity="0.4" letter-spacing="1.2">THEME</text>

  <text x="24" y="88" font-family="system-ui, sans-serif" font-size="22" font-weight="600" fill="#f1f5f9">Slate Classic</text>

  <text x="24" y="108" font-family="system-ui, sans-serif" font-size="11" fill="#cbd5e1" opacity="0.45">Timeless. Understated. Sharp.</text>

  <rect x="24" y="140" width="180" height="28" rx="8" fill="#1e2532" stroke="rgba(148,163,184,0.08)" stroke-width="0.5"/>
  <text x="34" y="158" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">How can I assist you today?</text>

  <rect x="110" y="180" width="150" height="28" rx="8" fill="#334155" stroke="rgba(148,163,184,0.2)" stroke-width="0.5"/>
  <text x="120" y="198" font-family="system-ui, sans-serif" font-size="10" fill="#e2e8f0">Tell me about the API.</text>

  <rect x="24" y="240" width="180" height="30" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(148,163,184,0.1)" stroke-width="0.5"/>
  <text x="34" y="260" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Type a message…</text>

  <circle cx="240" cy="255" r="14" fill="#475569"/>
  <path d="M234 261 L240 255 L234 249 L234 252.5 L238 255 L234 257.5 Z" fill="#ffffff"/>

  <rect x="24" y="310" width="110" height="16" rx="8" fill="rgba(148,163,184,0.1)" stroke="rgba(148,163,184,0.2)" stroke-width="0.5"/>
  <text x="30" y="322" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8">⬡ Slate Classic</text>
</svg>
    ) },
  { id: 'azure',     name: 'Azure Mist',      sub: 'Friendly & bold',    chatBg: '#ddf5f9', botBg: '#fcffff', userBg: '#0645d9', svg:(
     <svg viewBox="0 0 280 360" className="w-full h-full transition-transform duration-300 hover:scale-105" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Azure Mist Theme</title>
  <desc>BotForge chatbot theme preview – Azure Mist</desc>

  <defs>
    <radialGradient id="am-glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#93c5fd" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="am-glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#bfdbfe" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#bfdbfe" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="am-clip">
      <rect width="280" height="360" rx="16"/>
    </clipPath>
  </defs>

  <rect width="280" height="360" rx="16" fill="#f4f8fd"/>
  <rect width="280" height="360" rx="16" fill="none" stroke="#cfe0f5" stroke-width="0.5"/>

  <ellipse cx="240" cy="40" rx="90" ry="90" fill="url(#am-glow1)" clip-path="url(#am-clip)"/>
  <ellipse cx="50" cy="320" rx="60" ry="60" fill="url(#am-glow2)" clip-path="url(#am-clip)"/>

  <circle cx="24" cy="28" r="4" fill="#3b82f6" opacity="0.8"/>
  <circle cx="36" cy="28" r="4" fill="#93c5fd" opacity="0.8"/>
  <circle cx="48" cy="28" r="4" fill="#dbeafe" opacity="0.9"/>

  <text x="24" y="60" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#1e3a5f" opacity="0.4" letter-spacing="1.2">THEME</text>

  <text x="24" y="88" font-family="system-ui, sans-serif" font-size="22" font-weight="600" fill="#0f2d4a">Azure Mist</text>

  <text x="24" y="108" font-family="system-ui, sans-serif" font-size="11" fill="#3b82f6" opacity="0.5">Open. Airy. Crystal clear.</text>

  <rect x="24" y="140" width="180" height="28" rx="8" fill="#ffffff" stroke="#cfe0f5" stroke-width="0.5"/>
  <text x="34" y="158" font-family="system-ui, sans-serif" font-size="10" fill="#2563eb">How can I assist you today?</text>

  <rect x="110" y="180" width="150" height="28" rx="8" fill="#2563eb"/>
  <text x="120" y="198" font-family="system-ui, sans-serif" font-size="10" fill="#dbeafe">Tell me about the API.</text>

  <rect x="24" y="240" width="180" height="30" rx="8" fill="#ffffff" stroke="#cfe0f5" stroke-width="0.5"/>
  <text x="34" y="260" font-family="system-ui, sans-serif" font-size="10" fill="#93c5fd">Type a message…</text>

  <circle cx="240" cy="255" r="14" fill="#2563eb"/>
  <path d="M234 261 L240 255 L234 249 L234 252.5 L238 255 L234 257.5 Z" fill="#ffffff"/>

  <rect x="24" y="310" width="110" height="16" rx="8" fill="#dbeafe" stroke="#93c5fd" stroke-width="0.5"/>
  <text x="30" y="322" font-family="system-ui, sans-serif" font-size="9" fill="#1d4ed8">⬡ Azure Mist</text>
</svg>
    ) },{ id: 'pearl',     name: 'Pearl Linen Theme',      sub: 'Friendly & bold',    chatBg: '#fbfbfa', botBg: '#eeeeee', userBg: '#6d28d9',}
];

export function Step5Theme() {
  const store = useWizardStore();
  const { 
    themeId, 
    accentColor, 
    widgetPosition, 
    borderRadius, 
    fontStyle, 
    setField, 
    prevStep,
    setStep,
    setBotId,
    setGenerationError,
    generationError,
  } = store;

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateBot = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const res = await generateBot({
        businessName: store.businessName,
        websiteUrl: store.websiteUrl,
        businessType: store.businessType,
        businessDescription: store.businessDescription,
        supportEmail: store.supportEmail,
        businessHours: store.businessHours,
        adaptiveFields: store.adaptiveFields,
        faqTopics: store.faqTopics,
        botName: store.botName,
        avatarStyle: store.avatarStyle,
        welcomeMessage: store.welcomeMessage,
        toneOfVoice: store.toneOfVoice,
        responseLanguage: store.responseLanguage,
        fallbackEmail: store.fallbackEmail,
        features: store.features,
        themeId: store.themeId,
        accentColor: store.accentColor,
        widgetPosition: store.widgetPosition,
        borderRadius: store.borderRadius,
        fontStyle: store.fontStyle,
      });

     setBotId(res.data.botId, res.data.publicWidgetKey);
      setStep(6); // Move to completion screen
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate bot. Please try again.';
      setGenerationError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Theme & Customization</h2>
        <p className="text-muted-foreground">Select a starting theme and fine-tune to match your brand perfectly.</p>
      </div>

      <div className="space-y-8 flex-1 overflow-y-auto pb-4 custom-scrollbar pr-2">
        {/* Theme Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {THEMES.map((theme) => {
              const isSelected = themeId === theme.id;
              return (
                <div 
                  key={theme.id}
                  onClick={() => {
                    setField('themeId', theme.id);
                    setField('accentColor', theme.userBg); // auto-update accent
                  }}
                  className={cn(
                    "relative border rounded-xl p-3 cursor-pointer transition-all hover:scale-[1.02] flex flex-col gap-3 overflow-hidden",
                    isSelected ? "border-primary shadow-sm" : "border-border hover:border-primary/50"
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-950 text-primary-foreground rounded-full flex items-center justify-center z-10 shadow-sm">
                      <Check size={12} />
                    </div>
                  )}
                  {/* Mini Preview */}
                  <div 
                    className="h-28 rounded-lg flex flex-col gap-2 p-2"
                    style={{ backgroundColor: theme.chatBg }}
                  >
                    <div className="w-[70%] h-6 rounded-r-xl rounded-bl-xl opacity-80" style={{ backgroundColor: theme.botBg }}></div>
                    <div className="w-[60%] h-6 rounded-l-xl rounded-br-xl self-end" style={{ backgroundColor: isSelected ? accentColor : theme.userBg }}></div>
                    <div className="w-[50%] h-6 rounded-r-xl rounded-bl-xl opacity-80" style={{ backgroundColor: theme.botBg }}></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{theme.name}</h4>
                    <span className="text-xs text-muted-foreground">{theme.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Customization Controls */}
        <section className="bg-muted/30 border border-border rounded-xl p-6 space-y-6">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground/80">Fine-tuning</h3>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground flex items-center justify-between">
                <span>Override accent color</span>
                <span className="text-xs text-muted-foreground font-mono">{accentColor}</span>
              </label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  title="Accent Color"
                  value={accentColor}
                  onChange={(e) => setField('accentColor', e.target.value)}
                  className="w-11 h-11 rounded-lg border border-border cursor-pointer shrink-0"
                />
                <div className="flex-1 border border-border rounded-lg bg-background flex grid-cols-5 overflow-hidden">
                   {/* Preset dots */}
                   {['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'].map(color => (
                     <div 
                       key={color} 
                       className="flex-1 cursor-pointer hover:opacity-80 transition-opacity" 
                       style={{backgroundColor: color}}
                       onClick={() => setField('accentColor', color)}
                     />
                   ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Widget Position</label>
              <select 
                title="Widget Position"
                value={widgetPosition}
                onChange={(e) => setField('widgetPosition', e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary transition-all"
              >
                <option value="bottom-right">Bottom right</option>
                <option value="bottom-left">Bottom left</option>
                <option value="center">Center</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 flex justify-between">
                <span>Border Radius</span>
                <span className="text-xs text-muted-foreground">{borderRadius}px</span>
              </label>
              <input 
                title="Border Radius"
                type="range" 
                min="0" 
                max="24"
                value={borderRadius}
                onChange={(e) => setField('borderRadius', parseInt(e.target.value))}
                className="w-full h-11 accent-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Font Style</label>
              <select 
                title="Font Style"
                value={fontStyle}
                onChange={(e) => setField('fontStyle', e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary transition-all"
              >
                <option>System default</option>
                <option>Rounded (Nunito)</option>
                <option>Elegant (Playfair)</option>
                <option>Mono (JetBrains Mono)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Error message */}
        {generationError && (
          <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-2">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Generation failed</p>
              <p className="mt-1">{generationError}</p>
            </div>
          </div>
        )}

        {/* Deploy CTA internal section */}
        <div className="pt-6 pb-2 text-center">
           <h3 className="text-xl font-bold mb-1">Your chatbot is configured</h3>
           <p className="text-sm text-muted-foreground mb-6">Click below to generate and publish your bot.</p>
           <button 
             onClick={handleGenerateBot}
             disabled={isGenerating}
             className="w-full max-w-sm mx-auto h-14 bg-blue-950 text-primary-foreground rounded-full font-bold text-lg hover:bg-blue-950-hover hover:scale-105 transition-all outline-none focus:ring-4 focus:ring-primary/30 flex items-center justify-center gap-2 disabled:opacity-80 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(139,92,246,0.39)]"
           >
             {isGenerating ? (
               <><Loader2 size={20} className="animate-spin" /> Building your bot...</>
             ) : (
               <>Generate my chatbot <ArrowRight size={20} /></>
             )}
           </button>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-border flex justify-start">
        <button 
          onClick={prevStep}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 text-muted-foreground h-11 px-4 hover:text-foreground font-medium transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>
    </div>
  );
}
