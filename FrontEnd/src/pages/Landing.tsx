import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Layout, Paintbrush, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useAuthStore } from "../store/authStore";


export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <HeroSection />
        <SocialProof />
        <HowItWorks />
        <BusinessShowcase />
        <ThemeGallery />
        <FeaturesGrid />
        <Pricing />
        <Testimonials />
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
  <title>Warm Amber Theme</title>
  <desc>BotForge chatbot theme preview – Warm Amber</desc>
  <defs>
    <radialGradient id="wa-glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="wa-glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fcd34d" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#fcd34d" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="wa-clip">
      <rect width="280" height="360" rx="16"/>
    </clipPath>
  </defs>

  <rect width="280" height="360" rx="16" fill="#140e05"/>
  <rect width="280" height="360" rx="16" fill="none" stroke="rgba(251,191,36,0.1)" stroke-width="0.5"/>

  <ellipse cx="240" cy="40" rx="90" ry="90" fill="url(#wa-glow1)" clip-path="url(#wa-clip)"/>
  <ellipse cx="50" cy="320" rx="60" ry="60" fill="url(#wa-glow2)" clip-path="url(#wa-clip)"/>

  <circle cx="24" cy="28" r="4" fill="#d97706" opacity="0.8"/>
  <circle cx="36" cy="28" r="4" fill="#fbbf24" opacity="0.8"/>
  <circle cx="48" cy="28" r="4" fill="#fde68a" opacity="0.8"/>

  <text x="24" y="60" font-family="system-ui, sans-serif" font-size="10" font-weight="500" fill="#fffbeb" opacity="0.4" letter-spacing="1.2">THEME</text>

  <text x="24" y="88" font-family="system-ui, sans-serif" font-size="22" font-weight="600" fill="#fffbeb">Warm Amber</text>

  <text x="24" y="108" font-family="system-ui, sans-serif" font-size="11" fill="#fef3c7" opacity="0.45">Golden. Cozy. Inviting.</text>

  <rect x="24" y="140" width="180" height="28" rx="8" fill="#1c1206" stroke="rgba(251,191,36,0.1)" stroke-width="0.5"/>
  <text x="34" y="158" font-family="system-ui, sans-serif" font-size="10" fill="#fcd34d">How can I assist you today?</text>

  <rect x="110" y="180" width="150" height="28" rx="8" fill="#78350f" stroke="rgba(251,191,36,0.25)" stroke-width="0.5"/>
  <text x="120" y="198" font-family="system-ui, sans-serif" font-size="10" fill="#fde68a">Tell me about the API.</text>

  <rect x="24" y="240" width="180" height="30" rx="8" fill="rgba(251,191,36,0.05)" stroke="rgba(251,191,36,0.12)" stroke-width="0.5"/>
  <text x="34" y="260" font-family="system-ui, sans-serif" font-size="10" fill="#b45309" opacity="0.8">Type a message…</text>

  <circle cx="240" cy="255" r="14" fill="#d97706"/>
  <path d="M234 261 L240 255 L234 249 L234 252.5 L238 255 L234 257.5 Z" fill="#ffffff"/>

  <rect x="24" y="310" width="110" height="16" rx="8" fill="rgba(251,191,36,0.12)" stroke="rgba(253,211,77,0.3)" stroke-width="0.5"/>
  <text x="30" y="322" font-family="system-ui, sans-serif" font-size="9" fill="#fcd34d">⬡ Warm Amber</text>
</svg>
    )
  }]
function HeroSection() {
  const { isAuthenticated } = useAuthStore();
  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
      
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
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Build and manage your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">AI fleet</span> in minutes
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
  const types = ["E-commerce", "SaaS", "Healthcare", "Restaurant", "Real Estate", "Education", "Finance", "Agency"];
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
         <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Tailored for your industry</h2>
            <p className="text-muted-foreground text-lg">BotForge adapts its questions and conversational flows natively.</p>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {types.map((type, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="group relative h-32 bg-background border border-border rounded-xl p-4 flex flex-col justify-end overflow-hidden cursor-pointer"
              >
                 <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors" />
                 <span className="font-medium z-10">{type}</span>
              </motion.div>
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
         {/* Placeholder for themes */}
         {themes.map((theme, i) => (
          //  <div key={i} className="flex-shrink-0 w-[280px] h-[360px] rounded-2xl border border-border bg-muted/50 snap-center flex items-center justify-center p-6 text-center">
            <div key={i} className="flex-shrink-0 w-[280px] h-[360px] rounded-2xl border border-border bg-muted/50 snap-center overflow-hidden ml-6">
              {theme.svg}
            </div>
              // <span className="font-semibold">{theme.name}</span>
          //  {/* </div> */}
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

function Testimonials() {
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Loved by founders</h2>
        <div className="grid md:grid-cols-3 gap-6">
           {[{n: "Sarah Jenkins", r: "CEO, Blendy", q: "BotForge took our customer support from chaos to structured in exactly 4 minutes. Not an exaggeration."},
             {n: "Rahul M.", r: "Founder, Proptech", q: "We avoided hiring an external agency to build our chatbot. The real estate templates were spot on."},
             {n: "Elena K.", r: "Marketing Lead", q: "The branding customization is unmatched. Our chatbot looks like we spent $10k developing it from scratch."}].map((t, i) => (
             <motion.div key={i} whileHover={{ y: -5 }} className="bg-background border border-border p-6 rounded-2xl">
               <p className="text-muted-foreground mb-6">"{t.q}"</p>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-blue-500/20 text-primary flex items-center justify-center font-bold">
                   {t.n.charAt(0)}
                 </div>
                 <div>
                   <h4 className="font-semibold text-sm">{t.n}</h4>
                   <p className="text-xs text-muted-foreground">{t.r}</p>
                 </div>
               </div>
             </motion.div>
           ))}
        </div>
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
    <section className="py-24 bg-blue-500 text-primary-foreground text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6 text-white">Ready to build your fleet?</h2>
        <p className="text-primary-foreground/80 mb-8 text-lg">Join 5,000+ businesses delivering better customer experiences.</p>
        <Link 
          to={isAuthenticated ? "/dashboard" : "/build"} 
          className="inline-flex justify-center items-center gap-2 bg-background text-foreground h-14 px-8 rounded-full font-bold hover:scale-105 transition-transform"
        >
          {isAuthenticated ? "Go to My Bots" : "Start building for free"} <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
