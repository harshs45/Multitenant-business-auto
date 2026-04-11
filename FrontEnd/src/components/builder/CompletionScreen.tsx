import { useState } from "react";
import { useWizardStore } from "../../store/wizardStore";
import { ChatPreview } from "./ChatPreview";
import { Check, Copy, ArrowLeft, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WIDGET_LOADER_URL, API_BASE_URL } from "../../config/api";

export function CompletionScreen() {
  const store = useWizardStore();
  const botId = store.botId || 'unknown';
  const [copied, setCopied] = useState(false);

  const botName = store.botName || `${store.businessName || 'Business'}Bot`;
  const themeName = ['midnight', 'emerald', 'sakura', 'ocean', 'slate', 'amber'].includes(store.themeId) 
    ? store.themeId.charAt(0).toUpperCase() + store.themeId.slice(1) 
    : 'Custom';

  const embedCode = `<!-- BotForge Widget -->
<script>
  window.BotForgeConfig = {
    publicKey: "${store.publicKey}",
    botId: "${botId}",
    apiBase: "${API_BASE_URL}"
  };
  (function(d,s,k,a){
    var j=d.createElement(s);
    j.src="${WIDGET_LOADER_URL}";
    j.async=true;
    j.setAttribute('data-botforge-key', k);
    j.setAttribute('data-botforge-api', a);
    d.head.appendChild(j);
  })(document,'script','${store.publicKey}','${API_BASE_URL}');
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full gap-8">
      {/* Left Column: Confirmation & Snippet */}
      <div className="flex-1 flex flex-col items-start justify-center">
        {/* Animated Checkmark */}
        <div className="mb-6">
          <svg className="w-16 h-16 text-primary" viewBox="0 0 52 52">
             <circle className="stroke-current opacity-20" cx="26" cy="26" r="25" fill="none" strokeWidth="2" />
             <motion.circle 
               className="stroke-current" 
               cx="26" cy="26" r="25" fill="none" strokeWidth="2" 
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
             />
             <motion.path 
               className="stroke-current" 
               fill="none" 
               strokeWidth="3" 
               d="M14 27l7 7 16-16"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
             />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-2">{botName} is live!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your chatbot is ready to deploy on {store.businessName || 'your website'}.
        </p>

        {/* Status Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-muted rounded-full text-sm border border-border">Name: <span className="font-semibold text-foreground">{botName}</span></span>
          <span className="px-3 py-1 bg-muted rounded-full text-sm border border-border">Type: <span className="font-semibold text-foreground">{store.businessType}</span></span>
          <span className="px-3 py-1 bg-muted rounded-full text-sm border border-border">Tone: <span className="font-semibold text-foreground">{store.toneOfVoice}</span></span>
          <span className="px-3 py-1 bg-muted rounded-full text-sm border border-border">Theme: <span className="font-semibold text-foreground">{themeName}</span></span>
        </div>

        {/* Embed Snippet */}
        <div className="w-full mb-8 relative group">
          <div className="flex items-center justify-between bg-muted/80 border border-b-0 border-border rounded-t-xl px-4 py-2">
             <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Embed code</span>
             <button 
               onClick={handleCopy}
               className="text-xs flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors bg-background border border-border px-2 py-1 rounded"
             >
               {copied ? <><Check size={14} className="text-green-500" /> Copied</> : <><Copy size={14} /> Copy fragment</>}
             </button>
          </div>
          <pre className="bg-[#1a1a2e] text-[#a9b1d6] p-4 rounded-b-xl overflow-x-auto text-sm border border-border">
            <code>{embedCode}</code>
          </pre>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 w-full">
           <button 
             onClick={() => store.setStep(0)}
             className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-border hover:bg-muted font-medium transition-colors"
           >
             <ArrowLeft size={16} /> Edit configuration
           </button>
           <Link 
             to="/"
             className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary-hover font-medium transition-all shadow-md"
           >
             Go to Dashboard <LayoutDashboard size={16} />
           </Link>
        </div>
      </div>

      {/* Right Column: Mini Preview */}
      <div className="hidden lg:block w-[400px]">
        <ChatPreview />
      </div>
    </div>
  );
}
