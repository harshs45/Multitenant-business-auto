import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Layout, Paintbrush, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useState ,useEffect } from "react";
import PremiumBackground from "../components/glowEffect/glow"; 
import { useAuthStore } from "../store/authStore";


export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <PremiumBackground/>
        <HeroSection />
        <SocialProof />
        <HowItWorks />
        <BusinessShowcase />
        <ThemeGallery />
        <FeaturesGrid />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}
const themes =[{
    name:"Midnight Pro",
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
    )
  },{
    name:"Emerald fresh",
    svg:(
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
</svg>
    )
  },{
    name:"Sakura ",
    svg:(
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
    )
  },{
    name:"Ocean Breeze",
    svg:(
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
    )
  },{
    namw:"Slate Classic",
    svg:(
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
    )
  },{
    name:"",
    svg:(
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
    )
  },{
    name:"",
    svg:(
      <svg viewBox="0 0 280 360" className="w-full h-full transition-transform duration-300 hover:scale-105" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Pearl Linen Theme</title>
  <desc>BotForge chatbot theme preview – Pearl Linen</desc>

  <defs>
    <radialGradient id="pl-glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c4b5fd" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#c4b5fd" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="pl-glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e9d5ff" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#e9d5ff" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="pl-clip">
      <rect width="280" height="360" rx="16"/>
    </clipPath>
  </defs>

  <rect width="280" height="360" rx="16" fill="#faf8f4"/>
  <rect width="280" height="360" rx="16" fill="none" stroke="#e8e0d6" stroke-width="0.5"/>

  <ellipse cx="240" cy="40" rx="90" ry="90" fill="url(#pl-glow1)" clip-path="url(#pl-clip)"/>
  <ellipse cx="50" cy="320" rx="60" ry="60" fill="url(#pl-glow2)" clip-path="url(#pl-clip)"/>

  <line x1="200" y1="0" x2="280" y2="80" stroke="#d8cfe8" stroke-width="0.4" opacity="0.5"/>
  <line x1="220" y1="0" x2="280" y2="60" stroke="#d8cfe8" stroke-width="0.4" opacity="0.4"/>
  <line x1="240" y1="0" x2="280" y2="40" stroke="#d8cfe8" stroke-width="0.4" opacity="0.3"/>
  <line x1="180" y1="0" x2="280" y2="100" stroke="#d8cfe8" stroke-width="0.4" opacity="0.3"/>

  <circle cx="24" cy="28" r="4" fill="#a78bfa" opacity="0.9"/>
  <circle cx="36" cy="28" r="4" fill="#c4b5fd" opacity="0.9"/>
  <circle cx="48" cy="28" r="4" fill="#ede9fe" opacity="0.9"/>

  <text x="24" y="60" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#6b5c80" opacity="0.4" letter-spacing="1.2">THEME</text>

  <text x="24" y="88" font-family="system-ui, sans-serif" font-size="22" font-weight="600" fill="#2d2440">Pearl Linen</text>

  <text x="24" y="108" font-family="system-ui, sans-serif" font-size="11" fill="#8b7ca6" opacity="0.5">Light. Refined. Effortless.</text>

  <rect x="24" y="140" width="180" height="28" rx="8" fill="#ffffff" stroke="#e2d9ef" stroke-width="0.5"/>
  <text x="34" y="158" font-family="system-ui, sans-serif" font-size="10" fill="#5b4e72">How can I assist you today?</text>

  <rect x="110" y="180" width="150" height="28" rx="8" fill="#7c3aed"/>
  <text x="120" y="198" font-family="system-ui, sans-serif" font-size="10" fill="#ede9fe">Tell me about the API.</text>

  <rect x="24" y="240" width="180" height="30" rx="8" fill="#ffffff" stroke="#ddd5ed" stroke-width="0.5"/>
  <text x="34" y="260" font-family="system-ui, sans-serif" font-size="10" fill="#c4b5fd">Type a message…</text>

  <circle cx="240" cy="255" r="14" fill="#7c3aed"/>
  <path d="M234 261 L240 255 L234 249 L234 252.5 L238 255 L234 257.5 Z" fill="#ffffff"/>

  <rect x="24" y="310" width="110" height="16" rx="8" fill="#ede9fe" stroke="#c4b5fd" stroke-width="0.5"/>
  <text x="30" y="322" font-family="system-ui, sans-serif" font-size="9" fill="#6d28d9">⬡ Pearl Linen</text>
</svg>
    )
  }]
  
function HeroSection() {
  const text = "Build your business chatbot in minutes";
  const [displayed, setDisplayed] = useState("");
 useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const { isAuthenticated } = useAuthStore();
  return (
    <section className="relative overflow-hidden pb-20  lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 relative z-10 hidden md:block">
         {/* Decorative elements */}
         <div className="absolute top-20 right-[15%] w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-blob" />
         <div className="absolute top-40 right-[5%] w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="max-w-2xl"
>
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-primary text-sm font-medium mb-6">
    <Sparkles size={16} />
    <span>BotForge 2.0 is now live</span>
  </div>

  <h1 className="text-5xl font-bold">
    {displayed}
    <span className="animate-pulse">|</span>
  </h1>

  <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
    Build and manage your 
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
      AI fleet
    </span> 
    in minutes
  </h1>

  <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
    No code. No complexity. Generate fully configured, branded AI assistants and manage them all from a single hub.
  </p>

  <div className="flex flex-col sm:flex-row gap-4">
    <Link 
      to={isAuthenticated ? "/dashboard" : "/build"} 
      className="inline-flex justify-center items-center gap-2 bg-primary text-primary-foreground h-12 px-8 rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105"
    >
      {isAuthenticated ? "Go to Dashboard" : "Start for free"} <ArrowRight size={18} />
    </Link>

    <a href="#how-it-works" className="inline-flex justify-center items-center gap-2 h-12 px-8 rounded-full font-medium border border-border hover:bg-muted transition-colors">
      See how it works
    </a>
  </div>
</motion.div>

        {/* Animated mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          <div className="w-full max-w-sm bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col relative z-20 h-[500px]">
            <div className="h-16 bg-muted/50 border-b border-border flex items-center px-4 gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-primary-foreground">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">BotForge AI</h3>
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
                </span>
              </div>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto bg-muted/10">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-primary-foreground"><Bot size={14}/></div>
                <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-none text-sm w-4/5">Hi! I'm ready to help your customers 24/7. What business are we building for?</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="flex gap-2 justify-end">
                <div className="bg-blue-500 text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-none text-sm w-[70%]">We run an online coffee roast subscription.</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4 }} className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-primary-foreground"><Bot size={14}/></div>
                <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-none text-sm w-4/5">Perfect. I've configured your e-commerce flows, added cart recovery, and set a warm, energetic tone!</div>
              </motion.div>
            </div>
            <div className="p-3 border-t border-border bg-background">
              <div className="h-10 rounded-full border border-border bg-muted/30 px-4 flex items-center text-sm text-muted-foreground">Type your message...</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  const logos = ["Shopify", "Clinikk", "Notion", "Razorpay", "Zomato", "upGrad"];
  
  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-8">Trusted by 5,000+ businesses across 12 industries</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale">
          {logos.map(logo => (
            <div key={logo} className="text-xl font-bold font-serif tracking-tight flex items-center">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: <Layout className="text-primary"/>, title: "Describe your business", desc: "Select your industry and provide a few details." },
    { icon: <Paintbrush className="text-blue-500"/>, title: "Customize your bot", desc: "Choose your brand colors, tone, and features." },
    { icon: <Zap className="text-amber-500"/>, title: "Deploy in one click", desc: "Copy the embed snippet and paste it on your site." },
  ];
  return (
    <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-6">  
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">From zero to deployed in 3 steps</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Skip the complex flow builders. Our AI constructs the perfect conversational logic based strictly on your exact business type.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border -z-10" />
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex flex-col items-center text-center bg-background border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center border border-border mb-6">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">Step {i + 1}: {step.title}</h3>
            <p className="text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BusinessShowcase() {
  //const types = ["E-commerce", "SaaS", "Healthcare", "Restaurant", "Real Estate", "Education", "Finance", "Agency"];
  const types = [{
    name:"E-commerce",
    svg:(
      <svg width="340" height="160" viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>E-commerce</title>
  <desc>Illustration representing e-commerce with shopping cart, product cards and order flow</desc>

  <rect x="30" y="52" width="52" height="58" rx="6" fill="none" stroke="#4a5568" stroke-width="1"/>
  <path d="M42 52 C42 38 70 38 70 52" fill="none" stroke="#4a5568" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="47" cy="72" r="3" fill="#6366f1"/>
  <circle cx="65" cy="72" r="3" fill="#6366f1"/>
  <line x1="47" y1="84" x2="65" y2="84" stroke="#4a5568" stroke-width="1" stroke-linecap="round"/>
  <line x1="47" y1="91" x2="58" y2="91" stroke="#4a5568" stroke-width="1" stroke-linecap="round"/>

  <rect x="108" y="30" width="64" height="80" rx="6" fill="#1e2535" stroke="#2d3748" stroke-width="0.75"/>
  <rect x="116" y="38" width="48" height="36" rx="4" fill="#2d3a52"/>
  <path d="M132 50 L136 44 L140 50 L148 44 L152 50 L148 54 L148 66 L132 66 L132 54 Z" fill="none" stroke="#6366f1" stroke-width="1.2" stroke-linejoin="round"/>
  <line x1="116" y1="84" x2="164" y2="84" stroke="#374151" stroke-width="0.5"/>
  <rect x="116" y="90" width="28" height="5" rx="2" fill="#374151"/>
  <rect x="148" y="90" width="16" height="5" rx="2" fill="#6366f1" opacity="0.7"/>

  <rect x="184" y="30" width="64" height="80" rx="6" fill="#1e2535" stroke="#2d3748" stroke-width="0.75"/>
  <rect x="192" y="38" width="48" height="36" rx="4" fill="#2d3a52"/>
  <path d="M200 62 Q206 54 216 56 L228 54 L232 60 L228 64 L200 64 Z" fill="none" stroke="#10b981" stroke-width="1.2" stroke-linejoin="round"/>
  <line x1="192" y1="84" x2="240" y2="84" stroke="#374151" stroke-width="0.5"/>
  <rect x="192" y="90" width="28" height="5" rx="2" fill="#374151"/>
  <rect x="224" y="90" width="16" height="5" rx="2" fill="#10b981" opacity="0.7"/>

  <circle cx="296" cy="44" r="18" fill="#1e2535" stroke="#2d3748" stroke-width="0.75"/>
  <path d="M285 40 L287 37 L307 37 L305 48 L289 48 Z" fill="none" stroke="#6366f1" stroke-width="1.2" stroke-linejoin="round"/>
  <circle cx="292" cy="52" r="2" fill="#6366f1"/>
  <circle cx="302" cy="52" r="2" fill="#6366f1"/>
  <circle cx="306" cy="35" r="5" fill="#6366f1"/>
  <text x="306" y="38" font-family="system-ui" font-size="7" font-weight="700" fill="#fff" text-anchor="middle">3</text>

  <text x="116" y="128" font-family="system-ui" font-size="9" fill="#f59e0b">★★★★</text>
  <text x="152" y="128" font-family="system-ui" font-size="9" fill="#374151">★</text>
  <text x="192" y="128" font-family="system-ui" font-size="9" fill="#f59e0b">★★★★★</text>

  <path d="M260 100 Q280 100 295 116" fill="none" stroke="#4a5568" stroke-width="1" stroke-dasharray="3,3" stroke-linecap="round"/>
  <path d="M291 119 L295 116 L292 112" fill="none" stroke="#4a5568" stroke-width="1" stroke-linecap="round"/>

  <rect x="272" y="118" width="34" height="28" rx="4" fill="#1e2535" stroke="#2d3748" stroke-width="0.75"/>
  <line x1="289" y1="118" x2="289" y2="146" stroke="#2d3748" stroke-width="0.75"/>
  <path d="M272 126 L289 130 L306 126" fill="none" stroke="#2d3748" stroke-width="0.75"/>
  <circle cx="289" cy="136" r="4" fill="#6366f1" opacity="0.6"/>
</svg>
    )
  },{
    name:"SaaS",
    svg:(
      <svg 
  viewBox="0 0 340 160" 
  className="w-full h-full object-cover" 
  preserveAspectRatio="xMidYMid slice"
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <title>SaaS</title>
  <desc>Illustration representing SaaS with dashboard, metrics and cloud infrastructure</desc>

  <rect x="20" y="20" width="200" height="128" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>
  <rect x="20" y="20" width="200" height="22" rx="7" fill="#222d42"/>
  <rect x="20" y="34" width="200" height="8" fill="#222d42"/>
  <circle cx="34" cy="31" r="3.5" fill="#374151"/>
  <circle cx="46" cy="31" r="3.5" fill="#374151"/>
  <circle cx="58" cy="31" r="3.5" fill="#374151"/>
  <rect x="70" y="26" width="100" height="10" rx="5" fill="#1a2235" stroke="#374151" stroke-width="0.5"/>

  <rect x="30" y="50" width="50" height="28" rx="4" fill="#1e2d45" stroke="#2d3a52" stroke-width="0.5"/>
  <text x="36" y="61" font-family="system-ui" font-size="7" fill="#6b7280">Users</text>
  <text x="36" y="72" font-family="system-ui" font-size="9" font-weight="600" fill="#a78bfa">12.4k</text>

  <rect x="90" y="50" width="50" height="28" rx="4" fill="#1e2d45" stroke="#2d3a52" stroke-width="0.5"/>
  <text x="96" y="61" font-family="system-ui" font-size="7" fill="#6b7280">MRR</text>
  <text x="96" y="72" font-family="system-ui" font-size="9" font-weight="600" fill="#34d399">$8.2k</text>

  <rect x="150" y="50" width="58" height="28" rx="4" fill="#1e2d45" stroke="#2d3a52" stroke-width="0.5"/>
  <text x="156" y="61" font-family="system-ui" font-size="7" fill="#6b7280">Churn</text>
  <text x="156" y="72" font-family="system-ui" font-size="9" font-weight="600" fill="#f87171">2.1%</text>

  <rect x="30" y="86" width="178" height="50" rx="4" fill="#1e2d45" stroke="#2d3a52" stroke-width="0.5"/>
  <polyline points="40,126 58,118 76,122 94,108 112,112 130,100 148,104 166,92 184,96 198,86" fill="none" stroke="#a78bfa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline points="40,126 58,118 76,122 94,108 112,112 130,100 148,104 166,92 184,96 198,86 198,136 40,136 Z" fill="#a78bfa" fill-opacity="0.07"/>

  <ellipse cx="276" cy="48" rx="28" ry="16" fill="#1e2d45" stroke="#4a5568" stroke-width="0.75"/>
  <ellipse cx="258" cy="52" rx="14" ry="10" fill="#1e2d45" stroke="#4a5568" stroke-width="0.75"/>
  <ellipse cx="294" cy="52" rx="14" ry="10" fill="#1e2d45" stroke="#4a5568" stroke-width="0.75"/>
  <rect x="258" y="52" width="36" height="10" fill="#1e2d45"/>
  <text x="276" y="53" font-family="system-ui" font-size="8" fill="#a78bfa" text-anchor="middle" font-weight="600">API</text>

  <line x1="276" y1="62" x2="256" y2="82" stroke="#4a5568" stroke-width="0.75" stroke-dasharray="3,2"/>
  <line x1="276" y1="62" x2="276" y2="82" stroke="#4a5568" stroke-width="0.75" stroke-dasharray="3,2"/>
  <line x1="276" y1="62" x2="296" y2="82" stroke="#4a5568" stroke-width="0.75" stroke-dasharray="3,2"/>

  <rect x="242" y="82" width="30" height="18" rx="4" fill="#1e2d45" stroke="#a78bfa" stroke-width="0.75"/>
  <text x="257" y="94" font-family="system-ui" font-size="7" fill="#a78bfa" text-anchor="middle">Auth</text>

  <rect x="261" y="82" width="30" height="18" rx="4" fill="#1e2d45" stroke="#34d399" stroke-width="0.75"/>
  <text x="276" y="94" font-family="system-ui" font-size="7" fill="#34d399" text-anchor="middle">DB</text>

  <rect x="280" y="82" width="34" height="18" rx="4" fill="#1e2d45" stroke="#60a5fa" stroke-width="0.75"/>
  <text x="297" y="94" font-family="system-ui" font-size="7" fill="#60a5fa" text-anchor="middle">CDN</text>

  <circle cx="250" cy="114" r="4" fill="#34d399" opacity="0.9"/>
  <rect x="258" y="111" width="40" height="6" rx="3" fill="#2d3748"/>
  <circle cx="250" cy="126" r="4" fill="#34d399" opacity="0.9"/>
  <rect x="258" y="123" width="30" height="6" rx="3" fill="#2d3748"/>
  <circle cx="250" cy="138" r="4" fill="#fbbf24" opacity="0.9"/>
  <rect x="258" y="135" width="50" height="6" rx="3" fill="#2d3748"/>
</svg>
    )
  },{
    name:"Healthcare",
    svg:(
      <svg 
  viewBox="0 0 340 160" 
  className="w-full h-full object-cover"
  preserveAspectRatio="xMidYMid slice"
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <title>Healthcare</title>
  <desc>Illustration representing healthcare with patient chat, vitals and medical records</desc>

  <rect x="18" y="18" width="150" height="130" rx="8" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>

  <rect x="18" y="18" width="150" height="32" rx="8" fill="#1e2d45"/>
  <rect x="18" y="38" width="150" height="12" fill="#1e2d45"/>
  <circle cx="38" cy="34" r="10" fill="#2d3a52" stroke="#374151" stroke-width="0.5"/>
  <line x1="34" y1="34" x2="42" y2="34" stroke="#34d399" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="38" y1="30" x2="38" y2="38" stroke="#34d399" stroke-width="1.5" stroke-linecap="round"/>
  <text x="54" y="31" font-family="system-ui" font-size="9" font-weight="600" fill="#e2e8f0">MedAssist</text>
  <circle cx="154" cy="28" r="5" fill="#34d399" opacity="0.9"/>
  <text x="54" y="42" font-family="system-ui" font-size="7" fill="#6b7280">Online · HIPAA compliant</text>

  <rect x="26" y="58" width="110" height="28" rx="6" fill="#1e2d45" stroke="#2d3748" stroke-width="0.5"/>
  <text x="32" y="69" font-family="system-ui" font-size="8" fill="#94a3b8">Hello! What symptoms</text>
  <text x="32" y="80" font-family="system-ui" font-size="8" fill="#94a3b8">are you experiencing?</text>

  <rect x="52" y="94" width="106" height="20" rx="6" fill="#0f6656"/>
  <text x="58" y="108" font-family="system-ui" font-size="8" fill="#a7f3d0">Headache, mild fever</text>

  <rect x="26" y="122" width="44" height="18" rx="9" fill="#1e2d45" stroke="#2d3748" stroke-width="0.5"/>
  <circle cx="37" cy="131" r="2.5" fill="#6b7280"/>
  <circle cx="46" cy="131" r="2.5" fill="#6b7280" opacity="0.7"/>
  <circle cx="55" cy="131" r="2.5" fill="#6b7280" opacity="0.4"/>

  <rect x="184" y="18" width="138" height="62" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>
  <text x="196" y="33" font-family="system-ui" font-size="8" fill="#6b7280" letter-spacing="0.5">PATIENT VITALS</text>

  <polyline points="196,52 202,52 205,44 208,58 212,44 216,52 222,52 226,52" fill="none" stroke="#f87171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="230" y="55" font-family="system-ui" font-size="8" fill="#f87171">72 bpm</text>

  <rect x="196" y="62" width="28" height="8" rx="4" fill="#2d3a52"/>
  <rect x="196" y="62" width="20" height="8" rx="4" fill="#fbbf24" opacity="0.8"/>
  <text x="230" y="69" font-family="system-ui" font-size="8" fill="#fbbf24">38.2°C</text>

  <rect x="270" y="62" width="28" height="8" rx="4" fill="#2d3a52"/>
  <rect x="270" y="62" width="26" height="8" rx="4" fill="#60a5fa" opacity="0.8"/>
  <text x="302" y="69" font-family="system-ui" font-size="7" fill="#60a5fa">98%</text>

  <rect x="184" y="90" width="138" height="58" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>
  <text x="196" y="105" font-family="system-ui" font-size="8" fill="#6b7280" letter-spacing="0.5">NEXT APPOINTMENT</text>
  <rect x="196" y="112" width="20" height="18" rx="2" fill="none" stroke="#34d399" stroke-width="1"/>
  <line x1="200" y1="112" x2="200" y2="108" stroke="#34d399" stroke-width="1" stroke-linecap="round"/>
  <line x1="212" y1="112" x2="212" y2="108" stroke="#34d399" stroke-width="1" stroke-linecap="round"/>
  <line x1="196" y1="118" x2="216" y2="118" stroke="#34d399" stroke-width="0.5"/>
  <text x="222" y="122" font-family="system-ui" font-size="8" fill="#e2e8f0">Dr. Mehra</text>
  <text x="222" y="133" font-family="system-ui" font-size="7" fill="#6b7280">Tomorrow · 10:30 AM</text>

  <rect x="276" y="136" width="44" height="10" rx="5" fill="none" stroke="#a78bfa" stroke-width="0.75"/>
  <line x1="298" y1="136" x2="298" y2="146" stroke="#a78bfa" stroke-width="0.75"/>
  <text x="285" y="144" font-family="system-ui" font-size="7" fill="#a78bfa">Rx · 2/day</text>
</svg>
    )
  },{
    name:"Restaurant",
    svg:(
      <svg 
  viewBox="0 0 340 160"
  className="w-full h-full object-cover"
  preserveAspectRatio="xMidYMid slice"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <title>Restaurant</title>
  <desc>Restaurant chatbot UI</desc>

  <rect x="16" y="16" width="98" height="132" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>
  <rect x="16" y="16" width="98" height="24" rx="7" fill="#2d1f0e"/>
  <rect x="16" y="32" width="98" height="8" fill="#2d1f0e"/>
  <text x="65" y="31" font-size="10" fill="#f59e0b" text-anchor="middle" font-weight="700">MENU</text>

  <line x1="26" y1="52" x2="104" y2="52" stroke="#2d3748" stroke-width="0.5"/>
  <text x="26" y="48" font-size="7" fill="#9ca3af">STARTERS</text>

  <text x="26" y="63" font-size="8" fill="#e2e8f0">Bruschetta</text>
  <text x="95" y="63" font-size="8" fill="#f59e0b" text-anchor="end">$8</text>
  <text x="26" y="75" font-size="8" fill="#e2e8f0">Calamari</text>
  <text x="95" y="75" font-size="8" fill="#f59e0b" text-anchor="end">$12</text>

  <line x1="26" y1="84" x2="104" y2="84" stroke="#2d3748" stroke-width="0.5"/>
  <text x="26" y="80" font-size="7" fill="#9ca3af">MAINS</text>

  <text x="26" y="95" font-size="8" fill="#e2e8f0">Pasta</text>
  <text x="95" y="95" font-size="8" fill="#f59e0b" text-anchor="end">$16</text>
  <text x="26" y="107" font-size="8" fill="#e2e8f0">Risotto</text>
  <text x="95" y="107" font-size="8" fill="#f59e0b" text-anchor="end">$18</text>
  <text x="26" y="119" font-size="8" fill="#e2e8f0">Salmon</text>
  <text x="95" y="119" font-size="8" fill="#f59e0b" text-anchor="end">$22</text>

  <rect x="22" y="130" width="84" height="12" rx="6" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" stroke-width="0.5"/>
  <text x="64" y="139" font-size="8" fill="#f59e0b" text-anchor="middle">Order</text>

  <rect x="128" y="16" width="130" height="132" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>
  <rect x="128" y="16" width="130" height="26" rx="7" fill="#2d1f0e"/>
  <rect x="128" y="34" width="130" height="8" fill="#2d1f0e"/>

  <line x1="144" y1="22" x2="144" y2="34" stroke="#f59e0b" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="148" y1="22" x2="148" y2="34" stroke="#f59e0b" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M144 28 Q146 26 148 28" fill="none" stroke="#f59e0b" stroke-width="1"/>
  <text x="158" y="30" font-size="9" font-weight="600" fill="#fde68a">Bot</text>

  <rect x="136" y="50" width="114" height="26" rx="5" fill="#1e2d45"/>
  <text x="143" y="61" font-size="8" fill="#94a3b8">Book or order?</text>

  <rect x="148" y="84" width="94" height="18" rx="5" fill="#92400e"/>
  <text x="155" y="96" font-size="8" fill="#fde68a">Table for 2</text>

  <rect x="136" y="110" width="114" height="28" rx="5" fill="#1e2d45"/>
  <text x="143" y="121" font-size="8" fill="#94a3b8">7 PM confirmed</text>

  <rect x="272" y="16" width="56" height="132" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>

  <rect x="283" y="38" width="34" height="4" rx="2" fill="#f59e0b" opacity="0.7"/>
  <line x1="289" y1="42" x2="285" y2="58" stroke="#4a5568" stroke-width="1.2"/>
  <line x1="311" y1="42" x2="315" y2="58" stroke="#4a5568" stroke-width="1.2"/>

  <rect x="280" y="88" width="40" height="12" rx="6" fill="#f59e0b"/>
  <text x="300" y="97" font-size="7" fill="#1a0a00" text-anchor="middle">7 PM</text>
</svg>
    )
  },{
    name:"Real Estate",
    svg:(
      <svg 
  viewBox="0 0 340 160"
  className="w-full h-full object-cover"
  preserveAspectRatio="xMidYMid slice"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <title>Real Estate</title>
  <desc>Real estate listings and calculator</desc>

  <rect x="16" y="16" width="96" height="132" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>
  <rect x="24" y="24" width="80" height="50" rx="4" fill="#1e2d45"/>

  <polygon points="64,36 88,52 88,74 40,74 40,52" fill="none" stroke="#60a5fa" stroke-width="1"/>
  <polygon points="64,36 40,52 88,52" fill="none" stroke="#60a5fa" stroke-width="1"/>
  <rect x="57" y="60" width="14" height="14" fill="none" stroke="#60a5fa" stroke-width="1"/>

  <text x="24" y="90" font-size="9" font-weight="600" fill="#e2e8f0">$485K</text>
  <text x="24" y="102" font-size="7" fill="#94a3b8">3BHK · 1450 sqft</text>

  <path d="M24 120 Q24 114 29 114 Q34 114 34 120 Q34 126 29 130 Q24 126 24 120 Z" fill="none" stroke="#60a5fa"/>
  <circle cx="29" cy="120" r="2" fill="#60a5fa"/>

  <rect x="124" y="16" width="96" height="132" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>
  <rect x="132" y="24" width="80" height="50" rx="4" fill="#1e2d45"/>

  <rect x="148" y="38" width="48" height="36" fill="none" stroke="#a78bfa"/>
  <rect x="153" y="44" width="8" height="8" fill="none" stroke="#a78bfa"/>
  <rect x="166" y="44" width="8" height="8" fill="none" stroke="#a78bfa"/>
  <rect x="179" y="44" width="8" height="8" fill="none" stroke="#a78bfa"/>

  <text x="132" y="90" font-size="9" font-weight="600" fill="#e2e8f0">$1.24M</text>
  <text x="132" y="102" font-size="7" fill="#94a3b8">2BHK · Sea View</text>

  <rect x="232" y="16" width="96" height="132" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>

  <text x="245" y="32" font-size="8" fill="#94a3b8">EMI</text>

  <rect x="245" y="50" width="72" height="4" rx="2" fill="#2d3748"/>
  <rect x="245" y="50" width="50" height="4" rx="2" fill="#60a5fa"/>
  <circle cx="295" cy="52" r="4" fill="#60a5fa"/>

  <rect x="245" y="82" width="72" height="4" rx="2" fill="#2d3748"/>
  <rect x="245" y="82" width="38" height="4" rx="2" fill="#a78bfa"/>
  <circle cx="283" cy="84" r="4" fill="#a78bfa"/>

  <text x="245" y="125" font-size="12" font-weight="700" fill="#e2e8f0">₹37K</text>
</svg>
    )
  },{
    name:"Education",
    svg:(
      <svg 
  viewBox="0 0 340 160"
  className="w-full h-full object-cover"
  preserveAspectRatio="xMidYMid slice"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <title>Education</title>
  <desc>Education courses and AI tutor</desc>

  <rect x="16" y="16" width="88" height="132" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>
  <rect x="24" y="24" width="72" height="44" rx="4" fill="#1e2d45"/>
  <text x="40" y="52" font-size="20" fill="#38bdf8">&lt;/&gt;</text>
  <text x="24" y="80" font-size="8" fill="#e2e8f0">Web Dev</text>

  <rect x="24" y="98" width="72" height="5" rx="2.5" fill="#2d3748"/>
  <rect x="24" y="98" width="50" height="5" rx="2.5" fill="#38bdf8"/>

  <circle cx="28" cy="124" r="3" fill="#38bdf8"/>
  <circle cx="40" cy="124" r="3" fill="#38bdf8"/>
  <circle cx="52" cy="124" r="3" fill="#38bdf8"/>

  <rect x="116" y="16" width="88" height="132" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>
  <rect x="124" y="24" width="72" height="44" rx="4" fill="#1e2d45"/>
  <text x="140" y="54" font-size="22" fill="#a78bfa">Σ</text>
  <text x="124" y="80" font-size="8" fill="#e2e8f0">Data Sci</text>

  <rect x="124" y="98" width="72" height="5" rx="2.5" fill="#2d3748"/>
  <rect x="124" y="98" width="28" height="5" rx="2.5" fill="#a78bfa"/>

  <rect x="216" y="16" width="112" height="132" rx="7" fill="#1a2235" stroke="#2d3748" stroke-width="0.75"/>

  <polygon points="272,24 258,30 272,36 286,30" fill="none" stroke="#38bdf8"/>
  <text x="272" y="36" font-size="7" fill="#bae6fd" text-anchor="middle">AI</text>

  <rect x="224" y="50" width="96" height="28" rx="5" fill="#1e2d45"/>
  <text x="230" y="65" font-size="7" fill="#94a3b8">Practice quiz?</text>

  <rect x="224" y="88" width="96" height="30" rx="5" fill="#0f2233" stroke="#38bdf8"/>
  <text x="230" y="102" font-size="7" fill="#38bdf8">arr.map()?</text>

  <rect x="224" y="120" width="40" height="10" rx="5" fill="#451a03"/>
  <text x="244" y="127" font-size="6" fill="#fbbf24" text-anchor="middle">+XP</text>
</svg>
    )
  },{
    name:"Finance",
    svg:(
      <svg 
  viewBox="0 0 340 160"
  className="w-full h-full object-cover"
  preserveAspectRatio="xMidYMid slice"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <title>Finance</title>
  <desc>Finance dashboard and AI advisor</desc>

  <rect x="16" y="16" width="148" height="132" rx="7" fill="#1a2235" stroke="#2d3748"/>
  
  <text x="26" y="36" font-size="14" font-weight="700" fill="#e2e8f0">$24K</text>
  <text x="26" y="50" font-size="8" fill="#34d399">+3.4%</text>

  <rect x="26" y="58" width="128" height="40" rx="4" fill="#111827"/>
  <polyline 
    points="30,92 50,86 70,80 90,70 110,74 130,64 148,68" 
    fill="none" 
    stroke="#34d399" 
    stroke-width="1.5"
  />

  <circle cx="52" cy="120" r="14" stroke="#2d3748" stroke-width="6" fill="none"/>
  <circle cx="52" cy="120" r="14" stroke="#38bdf8" stroke-width="6" stroke-dasharray="40 60" transform="rotate(-90 52 120)"/>
  <circle cx="52" cy="120" r="14" stroke="#a78bfa" stroke-width="6" stroke-dasharray="25 75" transform="rotate(-90 52 120)"/>

  <rect x="176" y="16" width="148" height="132" rx="7" fill="#1a2235" stroke="#2d3748"/>

  <rect x="184" y="36" width="132" height="28" rx="5" fill="#1e2d45"/>
  <text x="190" y="52" font-size="7" fill="#94a3b8">Rebalance portfolio?</text>

  <rect x="196" y="70" width="112" height="16" rx="5" fill="#1e3a5f"/>
  <text x="202" y="81" font-size="7" fill="#bae6fd">Show impact</text>

  <rect x="184" y="94" width="132" height="32" rx="5" fill="#111827"/>

  <rect x="190" y="104" width="90" height="6" rx="3" fill="#f87171"/>
  <rect x="190" y="114" width="58" height="6" rx="3" fill="#34d399"/>

  <rect x="184" y="130" width="60" height="10" rx="5" fill="#064e3b"/>
  <text x="214" y="137" font-size="6" fill="#34d399" text-anchor="middle">Apply</text>
</svg>
    )
  },{
    name:"Agency",
    svg:(
      <svg 
  viewBox="0 0 340 160"
  className="w-full h-full object-cover"
  preserveAspectRatio="xMidYMid slice"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <title>Agency</title>
  <desc>Lead capture and project pipeline</desc>

  <rect x="16" y="16" width="118" height="132" rx="7" fill="#1a2235" stroke="#2d3748"/>

  <rect x="16" y="16" width="118" height="26" rx="7" fill="#1a1040"/>
  <path d="M76 22 L70 31 L76 31 L70 40 L80 29 L74 29 Z" fill="#a78bfa"/>
  <text x="84" y="31" font-size="9" fill="#c4b5fd">LeadBot</text>

  <rect x="24" y="50" width="102" height="22" rx="5" fill="#1e2d45"/>
  
  <rect x="24" y="78" width="46" height="12" rx="6" fill="#2d1a50"/>
  <rect x="74" y="78" width="46" height="12" rx="6" fill="#2d3748"/>
  <rect x="24" y="96" width="46" height="12" rx="6" fill="#2d3748"/>
  <rect x="74" y="96" width="46" height="12" rx="6" fill="#2d3748"/>

  <rect x="24" y="118" width="102" height="16" rx="5" fill="#111827"/>
  <rect x="30" y="125" width="60" height="3" rx="2" fill="#a78bfa"/>
  <circle cx="90" cy="126.5" r="4" fill="#a78bfa"/>

  <rect x="146" y="16" width="178" height="132" rx="7" fill="#1a2235" stroke="#2d3748"/>

  <rect x="156" y="38" width="46" height="10" rx="5" fill="#1e2d45"/>
  <rect x="208" y="38" width="46" height="10" rx="5" fill="#1e2d45"/>
  <rect x="260" y="38" width="50" height="10" rx="5" fill="#1e2d45"/>

  <rect x="156" y="54" width="46" height="22" rx="4" fill="#1e2d45"/>
  <rect x="156" y="82" width="46" height="20" rx="4" fill="#1e2d45"/>

  <rect x="208" y="54" width="46" height="22" rx="4" fill="#1e2d45"/>
  <rect x="208" y="82" width="46" height="20" rx="4" fill="#1e2d45"/>

  <rect x="260" y="54" width="50" height="22" rx="4" fill="#1e2d45" stroke="#34d399"/>
  <rect x="260" y="82" width="50" height="20" rx="4" fill="#064e3b"/>

  <line x1="156" y1="118" x2="306" y2="118" stroke="#2d3748"/>
  <rect x="160" y="125" width="20" height="6" rx="3" fill="#a78bfa"/>
  <rect x="210" y="125" width="26" height="6" rx="3" fill="#f59e0b"/>
  <rect x="260" y="125" width="30" height="6" rx="3" fill="#34d399"/>
</svg>
    )
  }]
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
         <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Tailored for your industry</h2>
            <p className="text-muted-foreground text-lg">BotForge adapts its questions and conversational flows natively.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {types.map((type, i) => (
                <div key={i} className="relative">
                  
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group h-32 bg-background border border-border rounded-xl p-4 flex items-center justify-center overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors" />
              
              <div className="z-10">
                {type.svg}
              </div>
            </motion.div>
            <div className="mt-2 text-center text-l">
              {type.name}
            </div>

          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

function ThemeGallery() {
  return (
    <section id="themes" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your brand. Your chatbot.</h2>
        <p className="text-muted-foreground text-lg">Choose from 6 stunning curated themes, or inject your exact custom brand colors.</p>
      </div>
      <div className="flex overflow-x-auto pb-8 gap-6 snap-x">
         {themes.map((theme, i) => (
            <div key={i} className="flex-shrink-0 w-[280px] h-[360px] rounded-2xl border border-border bg-muted/50 snap-center overflow-hidden ml-6">
              {theme.svg}
            </div>
         ))}
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const features = [
    { title: "Adaptive form", desc: "Questions that change based on your industry" },
    { title: "Tone selector", desc: "Set the personality: Professional to Witty" },
    { title: "Theme studio", desc: "6 curated themes + brand color override" },
    { title: "Smart features", desc: "Toggle capabilities specific to your business" },
    { title: "Multi-language", desc: "Serve customers in their native language" },
    { title: "One-click embed", desc: "Drop a JS snippet. Done." },
  ];
  return (
    <section id="features" className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Packed with everything you need</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-background border border-border rounded-xl p-6">
               <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-primary mb-4">
                  <ShieldCheck size={20} />
               </div>
               <h3 className="font-semibold mb-2">{f.title}</h3>
               <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-muted-foreground text-lg">Start for free. Scale when you grow.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {[{ name: "Free", price: "0", limit: "100" }, { name: "Starter", price: "999", limit: "1,000" }, { name: "Growth", price: "2,999", limit: "10,000", pop: true }, { name: "Enterprise", price: "Custom", limit: "Unlimited" }].map((tier, i) => (
          <div key={i} className={cn("p-6 rounded-2xl border flex flex-col", tier.pop ? "border-primary shadow-lg bg-blue-500/5" : "border-border bg-background")}>
            {tier.pop && <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Most Popular</div>}
            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
            <div className="mb-4"><span className="text-3xl font-bold">₹{tier.price}</span><span className="text-muted-foreground">/mo</span></div>
            <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
              <li>{tier.limit} conversations</li>
              <li>{tier.name === "Free" ? "1 bot" : "Multiple bots"}</li>
            </ul>
            <button className={cn("w-full py-2 rounded-full font-medium transition-colors", tier.pop ? "bg-blue-500 text-primary-foreground hover:bg-blue-500-hover" : "bg-muted text-foreground hover:bg-border")}>
              Choose {tier.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}



function FAQ() {
  const faqs = [
    { q: "How long does it take?", a: "Literally minutes. You fill out our 5-step wizard and you're done." },
    { q: "Do I need to know how to code?", a: "Not at all. We provide a simple JS snippet to copy-paste into your website." },
    { q: "Can I use my own brand colors?", a: "Yes, our Theme Studio allows full hex code customization." },
  ];
  return (
    <section className="py-24 max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-background border border-border rounded-xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-medium cursor-pointer">
              {faq.q}
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" width="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CTABanner() {
  const { isAuthenticated } = useAuthStore();
  return (
    <section
      className="py-28 text-center relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #3d5a9e 0%, #253a7a 40%, #1a2a5e 100%)",
      }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft edge vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />

      {/* Subtle background circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.07]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-white/[0.04]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[960px] h-[960px] rounded-full border border-white/[0.025]" />

      {/* Corner glow blobs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/[0.06] blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/[0.06] blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">

        {/* Badges row */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full">
            ⚡ No credit card required
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full">
            🔒 GDPR compliant
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full">
            🚀 Live in 5 minutes
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full">
            ★ 4.9 / 5 rating
          </span>
        </div>

        <h2 className="text-5xl font-bold mb-5 text-white tracking-tight">
          Ready to build your 
        </h2>
        <h2 className="text-5xl font-bold mb-5 text-blue-300 tracking-tight">chatbot?</h2>
        <p className="text-white/60 mb-10 text-lg">
          Join 5,000+ businesses delivering better customer experiences.
        </p>

        <Link
           to={isAuthenticated ? "/dashboard" : "/build"} 
          className="inline-flex justify-center items-center gap-2 bg-white text-[#1a2a5e] h-14 px-8 rounded-full font-bold hover:scale-105 hover:bg-white/90 transition-all shadow-xl"
        >
          {isAuthenticated ? "Go to My Bots" : "Start building for free"} <ArrowRight size={18} />
        </Link>

      </div>
    </section>
  );
}