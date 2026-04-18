// import { useState, useEffect } from "react";
// import { useWizardStore } from "../../store/wizardStore";
// import { Bot, Send, User } from "lucide-react";
// import { cn } from "../../lib/utils";
// import { motion, AnimatePresence } from "framer-motion";

// export function ChatPreview() {
//   const store = useWizardStore();
//   const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string }[]>([]);
//   const [isTyping, setIsTyping] = useState(true);

//   // Re-run animation simulation when bot text or theme changes
//   useEffect(() => {
//     setTimeout(() => {
//       setIsTyping(true);
//       setMessages([]);
//     }, 0);
    
//     const welcome = store.welcomeMessage || 'Hi there! How can I help you today?';
    
//     // Simulate typing for welcome message
//     const timer1 = setTimeout(() => {
//       setIsTyping(false);
//       setMessages([{ sender: 'bot', text: welcome }]);
      
//       // The user replies
//       const timer2 = setTimeout(() => {
//         setMessages(prev => [...prev, { sender: 'user', text: store.businessType === 'E-commerce' ? 'Where is my order?' : 'I have a question.' }]);
        
//         // Bot typing follow-up
//         setIsTyping(true);
//         const timer3 = setTimeout(() => {
//           setIsTyping(false);
//           setMessages(prev => [...prev, { sender: 'bot', text: `I can help with that. Since you selected a ${store.toneOfVoice.toLowerCase()} tone, I will answer accordingly!` }]);
//         }, 1200);
//         return () => clearTimeout(timer3);
//       }, 1500);
//       return () => clearTimeout(timer2);
//     }, 800);
    
//     return () => clearTimeout(timer1);
//   }, [store.welcomeMessage, store.themeId, store.botName, store.businessType, store.toneOfVoice]);

//   const botNameDisplay = store.botName || `${store.businessName || 'Business'}Bot`;
  
//   // Dynamic inline styles based on font and border radius
//   const previewStyle = {
//     fontFamily: store.fontStyle === 'Rounded (Nunito)' ? '"Nunito", sans-serif' : 
//                 store.fontStyle === 'Elegant (Playfair)' ? '"Playfair Display", serif' : 
//                 store.fontStyle === 'Mono (JetBrains Mono)' ? '"JetBrains Mono", monospace' : 
//                 'inherit',
//     borderRadius: `${store.borderRadius}px`,
//   } as React.CSSProperties;

//   // Add CSS variable override for accent color
//   const scopedVars = {
//     '--user-bg': store.accentColor
//   } as React.CSSProperties;

//   return (
//     <div className={cn("w-full bg-background border border-border shadow-md overflow-hidden flex flex-col h-[550px]", `bot-theme-${store.themeId}`)} style={{...previewStyle, ...scopedVars}}>
//       {/* Header */}
//       <div 
//         className="h-16 flex items-center px-4 gap-3 text-white shadow-sm z-10 relative"
//         style={{ backgroundColor: 'var(--bot-header)' }}
//       >
//         <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
//            {store.avatarStyle === 'Robot' ? <Bot size={20} /> : <User size={20} />}
//         </div>
//         <div>
//           <h3 className="font-semibold text-sm">{botNameDisplay}</h3>
//           <span className="text-xs text-green-400 flex items-center gap-1 opacity-90">
//             <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span> Online
//           </span>
//         </div>
//       </div>
      
//       {/* Chat Area */}
//       <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto" style={{ backgroundColor: 'var(--chat-bg)' }}>
//         <AnimatePresence>
//           {messages.map((msg, i) => (
//             <motion.div 
//               key={i}
//               initial={{ opacity: 0, y: 10, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               className={cn("flex gap-2 max-w-[85%]", msg.sender === 'user' ? "self-end justify-end" : "self-start")}
//             >
//               {msg.sender === 'bot' && (
//                 <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white" style={{ backgroundColor: 'var(--bot-header)' }}>
//                   {store.avatarStyle === 'Robot' ? <Bot size={14}/> : <User size={14} />}
//                 </div>
//               )}
//               <div 
//                 className={cn("px-4 py-2 text-sm shadow-sm", msg.sender === 'user' ? "rounded-l-2xl rounded-tr-xl text-white" : "rounded-r-2xl rounded-tl-xl")}
//                 style={{ 
//                   backgroundColor: msg.sender === 'user' ? 'var(--user-bg)' : 'var(--bot-bg)',
//                   color: msg.sender === 'user' ? 'var(--user-text)' : 'var(--bot-text)'
//                 }}
//               >
//                 {msg.text}
//               </div>
//             </motion.div>
//           ))}
          
//           {isTyping && (
//              <motion.div 
//                initial={{ opacity: 0, y: 10 }}
//                animate={{ opacity: 1, y: 0 }}
//                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//                className="flex gap-2 self-start max-w-[85%]"
//              >
//                 <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white" style={{ backgroundColor: 'var(--bot-header)' }}>
//                   <Bot size={14}/>
//                 </div>
//                 <div 
//                   className="px-4 py-3 rounded-r-2xl rounded-tl-xl flex items-center gap-1 shadow-sm"
//                   style={{ backgroundColor: 'var(--bot-bg)' }}
//                 >
//                   <motion.div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
//                   <motion.div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
//                   <motion.div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
//                 </div>
//              </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
      
//       {/* Input Area */}
//       <div className="p-3 border-t shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-10 relative" style={{ backgroundColor: 'var(--chat-bg)', borderColor: 'rgba(0,0,0,0.05)' }}>
//         <div className="h-12 rounded-full border border-black/10 bg-white/50 dark:bg-black/10 px-4 flex items-center justify-between pointer-events-none opacity-70">
//            <span className="text-sm text-gray-400 dark:text-gray-500">Type your message...</span>
//            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bot-header)' }}>
//              <Send size={14} className="text-white ml-0.5" />
//            </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useWizardStore } from "../../store/wizardStore";
import { Bot, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Theme token map — keyed by the `id` field in Step5Theme's THEMES array:
//   'midnight' | 'emerald' | 'sakura' | 'ocean' | 'slate' | 'azure' | 'pearl'
//
// Every colour value is lifted directly from the matching SVG element:
//   windowBg      ← outer <rect fill>
//   headerBg      ← bot-message bubble <rect fill>  (reused as header surface)
//   botBubbleBg   ← bot-message bubble <rect fill>
//   userBubbleBg  ← user-message bubble <rect fill>
//   sendBtnBg     ← send-button <circle fill>
//   badge*        ← bottom label <rect> / <text>
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
}

const THEME_TOKENS: Record<string, ThemeTokens> = {

  // id: 'midnight'
  midnight: {
    windowBg:         "#0d1117",
    windowBorder:     "rgba(255,255,255,0.08)",
    headerBg:         "#161b22",
    headerBorder:     "rgba(255,255,255,0.07)",
    headerText:       "#f8fafc",
    headerSubtext:    "#94a3b8",
    avatarBg:         "#7c3aed",
    bodyBg:           "#0d1117",
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
  },

  // id: 'emerald'
  emerald: {
    windowBg:         "#0a1a12",
    windowBorder:     "rgba(255,255,255,0.08)",
    headerBg:         "#0f2318",
    headerBorder:     "rgba(16,185,129,0.12)",
    headerText:       "#ecfdf5",
    headerSubtext:    "#6ee7b7",
    avatarBg:         "#10b981",
    bodyBg:           "#0a1a12",
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
  },

  // id: 'sakura'
  sakura: {
    windowBg:         "#1a0d14",
    windowBorder:     "rgba(255,255,255,0.08)",
    headerBg:         "#2a1020",
    headerBorder:     "rgba(244,114,182,0.1)",
    headerText:       "#fdf2f8",
    headerSubtext:    "#f9a8d4",
    avatarBg:         "#db2777",
    bodyBg:           "#1a0d14",
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
  },

  // id: 'ocean'
  ocean: {
    windowBg:         "#051525",
    windowBorder:     "rgba(255,255,255,0.08)",
    headerBg:         "#0a2040",
    headerBorder:     "rgba(56,189,248,0.1)",
    headerText:       "#f0f9ff",
    headerSubtext:    "#7dd3fc",
    avatarBg:         "#0284c7",
    bodyBg:           "#051525",
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
  },

  // id: 'slate'
  slate: {
    windowBg:         "#0f1217",
    windowBorder:     "rgba(148,163,184,0.1)",
    headerBg:         "#1e2532",
    headerBorder:     "rgba(148,163,184,0.08)",
    headerText:       "#f1f5f9",
    headerSubtext:    "#94a3b8",
    avatarBg:         "#475569",
    bodyBg:           "#0f1217",
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
  },

  // id: 'azure'
  azure: {
    windowBg:         "#f4f8fd",
    windowBorder:     "#cfe0f5",
    headerBg:         "#2563eb",
    headerBorder:     "transparent",
    headerText:       "#ffffff",
    headerSubtext:    "#dbeafe",
    avatarBg:         "#2563eb",
    bodyBg:           "#f4f8fd",
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
  },

  // id: 'pearl'  (no SVG in Step5 — tokens inferred from chatBg/botBg/userBg)
  pearl: {
    windowBg:         "#faf8f4",
    windowBorder:     "#e8e0d6",
    headerBg:         "#7c3aed",
    headerBorder:     "transparent",
    headerText:       "#ffffff",
    headerSubtext:    "#ede9fe",
    avatarBg:         "#7c3aed",
    bodyBg:           "#faf8f4",
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
  },
};

const FALLBACK = THEME_TOKENS.midnight;

function resolveTokens(themeId: string | undefined, accentColor: string | undefined): ThemeTokens {
  const base = THEME_TOKENS[themeId ?? ""] ?? FALLBACK;
  // If the user overrode the accent colour in Step5, apply it to the user bubble + send btn
  if (accentColor && accentColor !== base.userBubbleBg) {
    return { ...base, userBubbleBg: accentColor, sendBtnBg: accentColor, avatarBg: accentColor };
  }
  return base;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

type Message = { sender: "bot" | "user"; text: string };

export function ChatPreview() {
  const store = useWizardStore();

  // Re-resolve tokens any time themeId OR accentColor changes
  const tk = resolveTokens(store.themeId, store.accentColor);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping]  = useState(true);

  const fontFamily =
    store.fontStyle === "Rounded (Nunito)"      ? '"Nunito", sans-serif'            :
    store.fontStyle === "Elegant (Playfair)"    ? '"Playfair Display", serif'       :
    store.fontStyle === "Mono (JetBrains Mono)" ? '"JetBrains Mono", monospace'     :
    "inherit";

  const borderRadius   = store.borderRadius ?? 16;
  const botName        = store.botName || `${store.businessName || "Business"}Bot`;
  const Icon           = store.avatarStyle === "Robot" ? Bot : User;

  // Animated demo conversation — replays whenever anything visible changes
  useEffect(() => {
    setIsTyping(true);
    setMessages([]);

    const welcome  = store.welcomeMessage || "Hi there! How can I help you today?";
    const userLine = store.businessType === "E-commerce"
      ? "Where is my order?"
      : "I have a question.";
    const botLine  = `I can help with that! Since you picked a ${
      store.toneOfVoice?.toLowerCase() ?? "friendly"
    } tone, I'll respond accordingly.`;

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
  }, [
    store.welcomeMessage,
    store.themeId,
    store.accentColor,
    store.botName,
    store.businessType,
    store.toneOfVoice,
  ]);

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div
      className="w-full flex flex-col overflow-hidden shadow-lg relative"
      style={{
        height: 550,
        fontFamily,
        borderRadius,
        background:   tk.windowBg,
        border:       `1px solid ${tk.windowBorder}`,
        transition:   "background 0.3s ease, border-color 0.3s ease",
      }}
    >

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 flex-shrink-0 z-10 relative"
        style={{
          height:       64,
          background:   tk.headerBg,
          borderBottom: `1px solid ${tk.headerBorder}`,
          transition:   "background 0.3s ease",
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: tk.avatarBg, transition: "background 0.3s ease" }}
        >
          <Icon size={18} color={tk.headerText} strokeWidth={1.8} />
        </div>

        <div className="flex flex-col leading-tight">
          <span
            className="text-sm font-semibold"
            style={{ color: tk.headerText, transition: "color 0.3s ease" }}
          >
            {botName}
          </span>
          <span
            className="text-[11px] flex items-center gap-1 mt-0.5"
            style={{ color: tk.headerSubtext, transition: "color 0.3s ease" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
            Online
          </span>
        </div>
      </div>

      {/* ── Chat body ──────────────────────────────────────────────────────── */}
      <div
        className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto"
        style={{ background: tk.bodyBg, transition: "background 0.3s ease" }}
      >
        <AnimatePresence initial={false}>

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`flex gap-2 max-w-[85%] ${
                msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: tk.avatarBg, transition: "background 0.3s ease" }}
                >
                  <Icon size={13} color="#ffffff" strokeWidth={1.8} />
                </div>
              )}

              <div
                className="px-4 py-2.5 text-[13px] leading-relaxed"
                style={
                  msg.sender === "bot"
                    ? {
                        background:   tk.botBubbleBg,
                        border:       `1px solid ${tk.botBubbleBorder}`,
                        color:        tk.botBubbleText,
                        borderRadius: "14px 14px 14px 2px",
                        transition:   "background 0.3s ease, color 0.3s ease",
                      }
                    : {
                        background:   tk.userBubbleBg,
                        color:        tk.userBubbleText,
                        borderRadius: "14px 14px 2px 14px",
                        transition:   "background 0.3s ease, color 0.3s ease",
                      }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="flex gap-2 self-start max-w-[85%]"
            >
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: tk.avatarBg }}
              >
                <Icon size={13} color="#ffffff" strokeWidth={1.8} />
              </div>
              <div
                className="px-4 py-3 flex items-center gap-1"
                style={{
                  background:   tk.botBubbleBg,
                  border:       `1px solid ${tk.botBubbleBorder}`,
                  borderRadius: "14px 14px 14px 2px",
                }}
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
      <div
        className="flex items-center gap-2.5 px-3 py-2.5 flex-shrink-0 z-10 relative"
        style={{
          background: tk.inputBarBg,
          borderTop:  `1px solid ${tk.inputBarBorder}`,
          transition: "background 0.3s ease",
        }}
      >
        <div
          className="flex-1 h-10 flex items-center px-4 text-[12px] pointer-events-none select-none"
          style={{
            background:   tk.inputFieldBg,
            border:       `1px solid ${tk.inputFieldBorder}`,
            color:        tk.inputPlaceholder,
            borderRadius: 50,
            transition:   "background 0.3s ease",
          }}
        >
          Type your message…
        </div>

        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: tk.sendBtnBg, transition: "background 0.3s ease" }}
        >
          <Send size={14} color="#ffffff" className="ml-0.5" />
        </div>
      </div>

      {/* ── Theme badge ────────────────────────────────────────────────────── */}
      <div
        className="absolute right-3 pointer-events-none select-none z-20"
        style={{ bottom: 62 }}
      >
        <span
          className="text-[9px] px-2.5 py-1 rounded-full"
          style={{
            background:    tk.badgeBg,
            border:        `0.5px solid ${tk.badgeBorder}`,
            color:         tk.badgeText,
            letterSpacing: "0.4px",
            transition:    "background 0.3s ease, color 0.3s ease",
          }}
        >
          {tk.label}
        </span>
      </div>

    </div>
  );
}