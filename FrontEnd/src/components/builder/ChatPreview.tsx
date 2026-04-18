import { useState, useEffect } from "react";
import { useWizardStore } from "../../store/wizardStore";
import { Bot, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Theme tokens — keyed by the `id` field in Step5Theme's THEMES array
// ─────────────────────────────────────────────────────────────────────────────

interface ThemeTokens {
  windowBg:         string;
  windowBorder:     string;
  headerBg:         string;
  headerBorder:     string;
  headerText:       string;
  headerSubtext:    string;
  avatarBg:         string;
  bodyBg:           string;
  botBubbleBg:      string;
  botBubbleBorder:  string;
  botBubbleText:    string;
  userBubbleBg:     string;
  userBubbleText:   string;
  typingDot:        string;
  inputBarBg:       string;
  inputBarBorder:   string;
  inputFieldBg:     string;
  inputFieldBorder: string;
  inputPlaceholder: string;
  sendBtnBg:        string;
  badgeBg:          string;
  badgeBorder:      string;
  badgeText:        string;
  label:            string;
  // SVG glow layer rendered behind everything
  glowLayer:        React.ReactNode;
}

// ── Per-theme glow layers — copied exactly from Landing SVG defs + ellipses ──

const GlowMidnight = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 550" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="cp-mp-g1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.28"/>
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="cp-mp-g2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="340" cy="60"  rx="180" ry="180" fill="url(#cp-mp-g1)"/>
    <ellipse cx="60"  cy="490" rx="140" ry="140" fill="url(#cp-mp-g2)"/>
  </svg>
);

const GlowEmerald = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 550" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="cp-ef-g1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.24"/>
        <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="cp-ef-g2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.14"/>
        <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="340" cy="60"  rx="180" ry="180" fill="url(#cp-ef-g1)"/>
    <ellipse cx="60"  cy="490" rx="140" ry="140" fill="url(#cp-ef-g2)"/>
  </svg>
);

const GlowSakura = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 550" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="cp-sk-g1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f472b6" stopOpacity="0.26"/>
        <stop offset="100%" stopColor="#f472b6" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="cp-sk-g2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.14"/>
        <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="340" cy="60"  rx="180" ry="180" fill="url(#cp-sk-g1)"/>
    <ellipse cx="60"  cy="490" rx="140" ry="140" fill="url(#cp-sk-g2)"/>
  </svg>
);

const GlowOcean = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 550" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="cp-ob-g1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22"/>
        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="cp-ob-g2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.14"/>
        <stop offset="100%" stopColor="#93c5fd" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="340" cy="60"  rx="200" ry="200" fill="url(#cp-ob-g1)"/>
    <ellipse cx="60"  cy="490" rx="140" ry="140" fill="url(#cp-ob-g2)"/>
  </svg>
);

const GlowSlate = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 550" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="cp-sc-g1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.14"/>
        <stop offset="100%" stopColor="#94a3b8" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="cp-sc-g2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#64748b" stopOpacity="0.10"/>
        <stop offset="100%" stopColor="#64748b" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="340" cy="60"  rx="200" ry="200" fill="url(#cp-sc-g1)"/>
    <ellipse cx="60"  cy="490" rx="140" ry="140" fill="url(#cp-sc-g2)"/>
  </svg>
);

const GlowAzure = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 400 550"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Soft blur filter */}
      <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="40" />
      </filter>

      {/* Main glow */}
      <radialGradient id="cp-am-g1" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
      </radialGradient>

      {/* Secondary glow */}
      <radialGradient id="cp-am-g2" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Top-right glow */}
    <ellipse
      cx="320"
      cy="80"
      rx="240"
      ry="240"
      fill="url(#cp-am-g1)"
      filter="url(#blur)"
    />

    {/* Bottom-left glow */}
    <ellipse
      cx="80"
      cy="480"
      rx="180"
      ry="180"
      fill="url(#cp-am-g2)"
      filter="url(#blur)"
    />
  </svg>
);

const GlowPearl = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 400 550"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Soft blur for premium glow */}
      <filter id="blur-pl" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="40" />
      </filter>

      {/* Main lavender glow */}
      <radialGradient id="cp-pl-g1" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
      </radialGradient>

      {/* Secondary soft pink glow */}
      <radialGradient id="cp-pl-g2" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0" />
      </radialGradient>

      {/* Subtle shimmer gradient for lines */}
      <linearGradient id="line-fade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#d8cfe8" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Top-right glow */}
    <ellipse
      cx="320"
      cy="80"
      rx="240"
      ry="240"
      fill="url(#cp-pl-g1)"
      filter="url(#blur-pl)"
    />

    {/* Bottom-left glow */}
    <ellipse
      cx="80"
      cy="480"
      rx="180"
      ry="180"
      fill="url(#cp-pl-g2)"
      filter="url(#blur-pl)"
    />

    {/* Diagonal shimmer lines (softer + premium) */}
    <g opacity="0.5">
      <line x1="260" y1="0" x2="400" y2="140" stroke="url(#line-fade)" strokeWidth="0.8" />
      <line x1="300" y1="0" x2="400" y2="100" stroke="url(#line-fade)" strokeWidth="0.6" />
      <line x1="340" y1="0" x2="400" y2="70"  stroke="url(#line-fade)" strokeWidth="0.5" />
      <line x1="220" y1="0" x2="400" y2="180" stroke="url(#line-fade)" strokeWidth="0.5" />
    </g>
  </svg>
);

// ── Token definitions ─────────────────────────────────────────────────────────

const THEME_TOKENS: Record<string, ThemeTokens> = {

  midnight: {
    windowBg:         "#0d1117",
    windowBorder:     "rgba(255,255,255,0.08)",
    headerBg:         "#161b22",
    headerBorder:     "rgba(255,255,255,0.07)",
    headerText:       "#f8fafc",
    headerSubtext:    "#94a3b8",
    avatarBg:         "#7c3aed",
    bodyBg:           "transparent",
    botBubbleBg:      "#161b22",
    botBubbleBorder:  "rgba(255,255,255,0.07)",
    botBubbleText:    "#cbd5e1",
    userBubbleBg:     "#7c3aed",
    userBubbleText:   "#ffffff",
    typingDot:        "#a78bfa",
    inputBarBg:       "#161b22",
    inputBarBorder:   "rgba(255,255,255,0.07)",
    inputFieldBg:     "rgba(255,255,255,0.04)",
    inputFieldBorder: "rgba(255,255,255,0.08)",
    inputPlaceholder: "#64748b",
    sendBtnBg:        "#7c3aed",
    badgeBg:          "rgba(124,58,237,0.18)",
    badgeBorder:      "rgba(167,139,250,0.3)",
    badgeText:        "#a78bfa",
    label:            "⬡ Midnight Pro",
    glowLayer:        <GlowMidnight />,
  },

  emerald: {
    windowBg:         "#0a1a12",
    windowBorder:     "rgba(255,255,255,0.08)",
    headerBg:         "#0f2318",
    headerBorder:     "rgba(16,185,129,0.12)",
    headerText:       "#ecfdf5",
    headerSubtext:    "#6ee7b7",
    avatarBg:         "#10b981",
    bodyBg:           "transparent",
    botBubbleBg:      "#0f2318",
    botBubbleBorder:  "rgba(16,185,129,0.12)",
    botBubbleText:    "#6ee7b7",
    userBubbleBg:     "#065f46",
    userBubbleText:   "#a7f3d0",
    typingDot:        "#6ee7b7",
    inputBarBg:       "#0f2318",
    inputBarBorder:   "rgba(16,185,129,0.15)",
    inputFieldBg:     "rgba(16,185,129,0.05)",
    inputFieldBorder: "rgba(16,185,129,0.15)",
    inputPlaceholder: "rgba(110,231,183,0.5)",
    sendBtnBg:        "#10b981",
    badgeBg:          "rgba(16,185,129,0.15)",
    badgeBorder:      "rgba(110,231,183,0.3)",
    badgeText:        "#6ee7b7",
    label:            "⬡ Emerald Fresh",
    glowLayer:        <GlowEmerald />,
  },

  sakura: {
    windowBg:         "#1a0d14",
    windowBorder:     "rgba(255,255,255,0.08)",
    headerBg:         "#2a1020",
    headerBorder:     "rgba(244,114,182,0.1)",
    headerText:       "#fdf2f8",
    headerSubtext:    "#f9a8d4",
    avatarBg:         "#db2777",
    bodyBg:           "transparent",
    botBubbleBg:      "#2a1020",
    botBubbleBorder:  "rgba(244,114,182,0.1)",
    botBubbleText:    "#f9a8d4",
    userBubbleBg:     "#9d174d",
    userBubbleText:   "#fbcfe8",
    typingDot:        "#f9a8d4",
    inputBarBg:       "#2a1020",
    inputBarBorder:   "rgba(244,114,182,0.15)",
    inputFieldBg:     "rgba(244,114,182,0.06)",
    inputFieldBorder: "rgba(244,114,182,0.15)",
    inputPlaceholder: "rgba(249,168,212,0.5)",
    sendBtnBg:        "#db2777",
    badgeBg:          "rgba(244,114,182,0.15)",
    badgeBorder:      "rgba(251,207,232,0.3)",
    badgeText:        "#f9a8d4",
    label:            "⬡ Sakura",
    glowLayer:        <GlowSakura />,
  },

  ocean: {
    windowBg:         "#051525",
    windowBorder:     "rgba(255,255,255,0.08)",
    headerBg:         "#0a2040",
    headerBorder:     "rgba(56,189,248,0.1)",
    headerText:       "#f0f9ff",
    headerSubtext:    "#7dd3fc",
    avatarBg:         "#0284c7",
    bodyBg:           "transparent",
    botBubbleBg:      "#0a2040",
    botBubbleBorder:  "rgba(56,189,248,0.1)",
    botBubbleText:    "#7dd3fc",
    userBubbleBg:     "#0c4a6e",
    userBubbleText:   "#bae6fd",
    typingDot:        "#7dd3fc",
    inputBarBg:       "#0a2040",
    inputBarBorder:   "rgba(56,189,248,0.15)",
    inputFieldBg:     "rgba(56,189,248,0.06)",
    inputFieldBorder: "rgba(56,189,248,0.15)",
    inputPlaceholder: "rgba(125,211,252,0.5)",
    sendBtnBg:        "#0284c7",
    badgeBg:          "rgba(56,189,248,0.13)",
    badgeBorder:      "rgba(147,197,253,0.3)",
    badgeText:        "#93c5fd",
    label:            "⬡ Ocean Breeze",
    glowLayer:        <GlowOcean />,
  },

  slate: {
    windowBg:         "#0f1217",
    windowBorder:     "rgba(148,163,184,0.1)",
    headerBg:         "#1e2532",
    headerBorder:     "rgba(148,163,184,0.08)",
    headerText:       "#f1f5f9",
    headerSubtext:    "#94a3b8",
    avatarBg:         "#475569",
    bodyBg:           "transparent",
    botBubbleBg:      "#1e2532",
    botBubbleBorder:  "rgba(148,163,184,0.08)",
    botBubbleText:    "#94a3b8",
    userBubbleBg:     "#334155",
    userBubbleText:   "#e2e8f0",
    typingDot:        "#94a3b8",
    inputBarBg:       "#1e2532",
    inputBarBorder:   "rgba(148,163,184,0.1)",
    inputFieldBg:     "rgba(255,255,255,0.04)",
    inputFieldBorder: "rgba(148,163,184,0.1)",
    inputPlaceholder: "#64748b",
    sendBtnBg:        "#475569",
    badgeBg:          "rgba(148,163,184,0.1)",
    badgeBorder:      "rgba(148,163,184,0.2)",
    badgeText:        "#94a3b8",
    label:            "⬡ Slate Classic",
    glowLayer:        <GlowSlate />,
  },

  azure: {
    windowBg:         "#f4f8fd",
    windowBorder:     "#cfe0f5",
    headerBg:         "#2563eb",
    headerBorder:     "transparent",
    headerText:       "#ffffff",
    headerSubtext:    "#dbeafe",
    avatarBg:         "#2563eb",
    bodyBg:           "transparent",
    botBubbleBg:      "#ffffff",
    botBubbleBorder:  "#cfe0f5",
    botBubbleText:    "#2563eb",
    userBubbleBg:     "#2563eb",
    userBubbleText:   "#dbeafe",
    typingDot:        "#93c5fd",
    inputBarBg:       "#ffffff",
    inputBarBorder:   "#cfe0f5",
    inputFieldBg:     "#ffffff",
    inputFieldBorder: "#cfe0f5",
    inputPlaceholder: "#93c5fd",
    sendBtnBg:        "#2563eb",
    badgeBg:          "#dbeafe",
    badgeBorder:      "#93c5fd",
    badgeText:        "#1d4ed8",
    label:            "⬡ Azure Mist",
    glowLayer:        <GlowAzure />,
  },

  pearl: {
    windowBg:         "#faf8f4",
    windowBorder:     "#e8e0d6",
    headerBg:         "#7c3aed",
    headerBorder:     "transparent",
    headerText:       "#ffffff",
    headerSubtext:    "#ede9fe",
    avatarBg:         "#7c3aed",
    bodyBg:           "transparent",
    botBubbleBg:      "#ffffff",
    botBubbleBorder:  "#e2d9ef",
    botBubbleText:    "#5b4e72",
    userBubbleBg:     "#6d28d9",
    userBubbleText:   "#ede9fe",
    typingDot:        "#c4b5fd",
    inputBarBg:       "#ffffff",
    inputBarBorder:   "#ddd5ed",
    inputFieldBg:     "#ffffff",
    inputFieldBorder: "#ddd5ed",
    inputPlaceholder: "#c4b5fd",
    sendBtnBg:        "#6d28d9",
    badgeBg:          "#ede9fe",
    badgeBorder:      "#c4b5fd",
    badgeText:        "#6d28d9",
    label:            "⬡ Pearl Linen",
    glowLayer:        <GlowPearl />,
  },
};

const FALLBACK = THEME_TOKENS.midnight;

function resolveTokens(themeId: string | undefined, accentColor: string | undefined): ThemeTokens {
  const base = { ...(THEME_TOKENS[themeId ?? ""] ?? FALLBACK) };
  // Respect the user's accent colour override from Step5 fine-tuning panel
  if (accentColor && accentColor !== base.userBubbleBg) {
    base.userBubbleBg = accentColor;
    base.sendBtnBg    = accentColor;
    base.avatarBg     = accentColor;
  }
  return base;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

type Message = { sender: "bot" | "user"; text: string };

export function ChatPreview() {
  const store = useWizardStore();
  const tk    = resolveTokens(store.themeId, store.accentColor);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping]  = useState(true);

  const fontFamily =
    store.fontStyle === "Rounded (Nunito)"      ? '"Nunito", sans-serif'        :
    store.fontStyle === "Elegant (Playfair)"    ? '"Playfair Display", serif'   :
    store.fontStyle === "Mono (JetBrains Mono)" ? '"JetBrains Mono", monospace' :
    "inherit";

  const borderRadius = store.borderRadius ?? 16;
  const botName      = store.botName || `${store.businessName || "Business"}Bot`;
  const Icon         = store.avatarStyle === "Robot" ? Bot : User;

  useEffect(() => {
    setIsTyping(true);
    setMessages([]);

    const welcome  = store.welcomeMessage || "Hi there! How can I help you today?";
    const userLine = store.businessType === "E-commerce" ? "Where is my order?" : "I have a question.";
    const botLine  = `I can help with that! Since you picked a ${store.toneOfVoice?.toLowerCase() ?? "friendly"} tone, I'll respond accordingly.`;

    const t1 = setTimeout(() => {
      setIsTyping(false);
      setMessages([{ sender: "bot", text: welcome }]);
      const t2 = setTimeout(() => {
        setMessages(p => [...p, { sender: "user", text: userLine }]);
        setIsTyping(true);
        const t3 = setTimeout(() => {
          setIsTyping(false);
          setMessages(p => [...p, { sender: "bot", text: botLine }]);
        }, 1200);
        return () => clearTimeout(t3);
      }, 1500);
      return () => clearTimeout(t2);
    }, 800);

    return () => clearTimeout(t1);
  }, [store.welcomeMessage, store.themeId, store.accentColor, store.botName, store.businessType, store.toneOfVoice]);

  return (
    <div
      className="w-full flex flex-col overflow-hidden relative"
      style={{
        height:     550,
        fontFamily,
        borderRadius,
        background: tk.windowBg,
        border:     `1px solid ${tk.windowBorder}`,
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* ── Glow layer — sits behind everything, matches the SVG ellipses ─── */}
      {tk.glowLayer}

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 flex-shrink-0 z-10 relative"
        style={{
          height:       64,
          background:   tk.headerBg,
          borderBottom: `1px solid ${tk.headerBorder}`,
          transition:   "background 0.35s ease",
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: tk.avatarBg, transition: "background 0.35s ease" }}
        >
          <Icon size={18} color={tk.headerText} strokeWidth={1.8} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold" style={{ color: tk.headerText, transition: "color 0.35s ease" }}>
            {botName}
          </span>
          <span className="text-[11px] flex items-center gap-1 mt-0.5" style={{ color: tk.headerSubtext, transition: "color 0.35s ease" }}>
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
            Online
          </span>
        </div>
      </div>

      {/* ── Chat body ──────────────────────────────────────────────────────── */}
      <div
        className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto z-10 relative"
        style={{ background: tk.bodyBg, transition: "background 0.35s ease" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"}`}
            >
              {msg.sender === "bot" && (
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: tk.avatarBg, transition: "background 0.35s ease" }}
                >
                  <Icon size={13} color="#ffffff" strokeWidth={1.8} />
                </div>
              )}
              <div
                className="px-4 py-2.5 text-[13px] leading-relaxed"
                style={
                  msg.sender === "bot"
                    ? { background: tk.botBubbleBg, border: `1px solid ${tk.botBubbleBorder}`, color: tk.botBubbleText, borderRadius: "14px 14px 14px 2px", transition: "background 0.35s ease, color 0.35s ease" }
                    : { background: tk.userBubbleBg, color: tk.userBubbleText, borderRadius: "14px 14px 2px 14px", transition: "background 0.35s ease" }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="flex gap-2 self-start max-w-[85%]"
            >
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: tk.avatarBg }}>
                <Icon size={13} color="#ffffff" strokeWidth={1.8} />
              </div>
              <div
                className="px-4 py-3 flex items-center gap-1"
                style={{ background: tk.botBubbleBg, border: `1px solid ${tk.botBubbleBorder}`, borderRadius: "14px 14px 14px 2px" }}
              >
                {[0, 0.18, 0.36].map((delay, idx) => (
                  <motion.span
                    key={idx}
                    className="w-1.5 h-1.5 rounded-full block"
                    style={{ background: tk.typingDot }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.55, delay, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Input bar ──────────────────────────────────────────────────────── */}
      {/* <div
        className="flex items-center gap-2.5 px-3 py-2.5 flex-shrink-0 z-10 relative"
        style={{ background: tk.inputBarBg, borderTop: `1px solid ${tk.inputBarBorder}`, transition: "background 0.35s ease" }}
      >
        <div
          className="flex-1 h-10 flex items-center px-4 text-[12px] pointer-events-none select-none"
          style={{ background: tk.inputFieldBg, border: `1px solid ${tk.inputFieldBorder}`, color: tk.inputPlaceholder, borderRadius: 50, transition: "background 0.35s ease" }}
        >
          Type your message…
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: tk.sendBtnBg, transition: "background 0.35s ease" }}
        >
          <Send size={14} color="#ffffff" className="ml-0.5" />
        </div>
      </div>

      {/* ── Theme badge ────────────────────────────────────────────────────── */}
      {/* <div className="absolute right-3 pointer-events-none select-none z-20" style={{ bottom: 62 }}>
        <span
          className="text-[9px] px-2.5 py-1 rounded-full"
          style={{ background: tk.badgeBg, border: `0.5px solid ${tk.badgeBorder}`, color: tk.badgeText, letterSpacing: "0.4px", transition: "background 0.35s ease, color 0.35s ease" }}
        >
          {tk.label}
        </span>
      </div> */} 
      <div
  className="flex items-center gap-2 px-2 sm:px-3 py-2 flex-shrink-0 z-10 relative"
  style={{
    background: tk.inputBarBg,
    borderTop: `1px solid ${tk.inputBarBorder}`,
    transition: "background 0.35s ease",
  }}
>
  {/* Input */}
  <div
    className="flex-1 h-9 sm:h-10 flex items-center px-3 sm:px-4 text-[11px] sm:text-[12px] pointer-events-none select-none min-w-0"
    style={{
      background: tk.inputFieldBg,
      border: `1px solid ${tk.inputFieldBorder}`,
      color: tk.inputPlaceholder,
      borderRadius: 999,
      transition: "background 0.35s ease",
    }}
  >
    <span className="truncate">Type your message…</span>
  </div>

  {/* Send Button */}
  <div
    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0"
    style={{
      background: tk.sendBtnBg,
      transition: "background 0.35s ease",
    }}
  >
    <Send size={12} className="sm:w-[14px] sm:h-[14px] ml-[1px]" color="#ffffff" />
  </div>
</div>

{/* ── Theme badge ───────────────────────────────── */}
<div
  className="absolute right-2 sm:right-3 pointer-events-none select-none z-20"
  style={{ bottom: "60px" }}
>
  <span
    className="text-[8px] sm:text-[9px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full whitespace-nowrap"
    style={{
      background: tk.badgeBg,
      border: `0.5px solid ${tk.badgeBorder}`,
      color: tk.badgeText,
      letterSpacing: "0.4px",
      transition: "background 0.35s ease, color 0.35s ease",
    }}
  >
    {tk.label}
  </span>
</div>
    </div>
  );
}