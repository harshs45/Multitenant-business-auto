import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBotById, updateBotTheme, type Bot, type BotTheme } from '../lib/bots.api';
import { 
  Code, 
  Palette, 
  Monitor, 
  Copy, 
  Check, 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  Save,
  ChevronRight,
  MousePointer2,
  LayoutGrid,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { WIDGET_LOADER_URL, API_BASE_URL } from '../config/api';

const PRESETS = [
  { name: 'Emerald', color: '#10b981' },
  { name: 'Indigo', color: '#6366f1' },
  { name: 'Rose', color: '#f43f5e' },
  { name: 'Amber', color: '#f59e0b' },
  { name: 'Slate', color: '#475569' },
  { name: 'Violet', color: '#8b5cf6' },
  { name: 'Cyan', color: '#06b6d4' },
  { name: 'Crimson', color: '#dc2626' },
];

const THEMES = [
  { key: 'emerald', name: 'Zest', bg: 'bg-emerald-500', desc: 'Modern & Vibrant' },
  { key: 'midnight', name: 'Dark Ops', bg: 'bg-slate-900', desc: 'Deep & Focused' },
  { key: 'ocean', name: 'Arctic', bg: 'bg-blue-500', desc: 'Fresh & Clean' },
  { key: 'standard', name: 'Glass', bg: 'bg-white', desc: 'Minimal & Light' },
];

export default function Deployment() {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();

  // State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bot, setBot] = useState<Bot | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Local Form State
  const [theme, setTheme] = useState<Partial<BotTheme>>({
    themeKey: 'standard',
    customPrimaryColor: '#8b5cf6',
    widgetPosition: 'bottom-right'
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    async function init() {
      if (!botId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getBotById(botId);
        if (res.success) {
          setBot(res.data);
          const t = (res.data as any).theme || {};
          const currentTheme = {
            themeKey: t.themeKey || 'standard',
            customPrimaryColor: t.customPrimaryColor || '#8b5cf6',
            widgetPosition: t.widgetPosition || 'bottom-right'
          };
          setTheme(currentTheme);
        } else {
          setError('Bot not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to initialize deployment');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [botId]);

  const handleUpdate = (updates: Partial<BotTheme>) => {
    setTheme(prev => ({ ...prev, ...updates }));
    setIsDirty(true);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    if (!botId) return;
    setSaving(true);
    setSaveSuccess(false);
    setError(null);
    try {
      const res = await updateBotTheme(botId, theme);
      if (res.success) {
        setSaveSuccess(true);
        setIsDirty(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  // Extract public widget key from embedTokens (safe null handling)
  const publicKey = bot?.embedTokens?.[0]?.publicKey || '';

  const handleCopySnippet = () => {
    if (!bot || !publicKey) return;
    
    const snippet = `<!-- BotForge Widget -->
<script>
  window.BotForgeConfig = {
    publicKey: "${publicKey}",
    botId: "${bot.id}",
    apiBase: "${API_BASE_URL}"
  };
  (function(d,s,k,a){
    var j=d.createElement(s);
    j.src="${WIDGET_LOADER_URL}";
    j.async=true;
    j.setAttribute('data-botforge-key', k);
    j.setAttribute('data-botforge-api', a);
    d.head.appendChild(j);
  })(document,'script','${publicKey}','${API_BASE_URL}');
</script>`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-muted-foreground font-medium text-lg">Preparing deployment hub...</p>
      </div>
    );
  }

  if (error && !bot) {
    return (
      <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-background border border-border rounded-2xl p-8 text-center shadow-lg">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6 text-destructive">
            <AlertCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Bot Not Found</h2>
          <p className="text-muted-foreground mb-8">{error}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Return to Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20 pt-24 px-4 sm:px-6 relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link to="/dashboard" className="hover:text-foreground transition-colors">My Bots</Link>
          <ChevronRight size={14} />
          <Link to={`/dashboard/bots/${botId}`} className="hover:text-foreground transition-colors font-medium">
             {bot?.botName || bot?.name}
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-bold">Deployment & Appearance</span>
        </nav>

        {/* Header Section */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center gap-4">
              <Code className="text-primary" size={36} /> Deployment Hub
            </h1>
            <p className="text-muted-foreground text-lg">
              Install the bot on your site and customize branding in real-time.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <AnimatePresence>
               {isDirty && (
                 <motion.span 
                   initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                   className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20"
                 >
                   Unsaved changes
                 </motion.span>
               )}
               {saveSuccess && (
                 <motion.span 
                   initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                   className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5"
                 >
                   <Check size={14} /> Synced to cloud
                 </motion.span>
               )}
             </AnimatePresence>
             <button 
               onClick={handleSave}
               disabled={saving || !isDirty}
               className="h-12 px-8 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center gap-2"
             >
               {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
               Save Changes
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Controls - 7 Cols */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Installation Section */}
            <section className="bg-background border border-border rounded-3xl p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Monitor size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Installation</h3>
                  <p className="text-sm text-muted-foreground">Add this script to your site's <code>&lt;head&gt;</code> tag.</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute top-3 right-3 flex items-center gap-2">
                   <button 
                    onClick={handleCopySnippet}
                    className="p-2.5 bg-background border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all shadow-sm"
                   >
                     {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                   </button>
                </div>
                <pre className="bg-[#1a1b26] text-[#a9b1d6] p-6 rounded-2xl overflow-x-auto text-[13px] leading-relaxed border border-border/5 font-mono shadow-inner pt-14">
                  <code>{`<!-- BotForge Widget -->
<script>
  window.BotForgeConfig = {
    publicKey: "${publicKey || 'loading...'}",
    botId: "${bot?.id}",
    apiBase: "${API_BASE_URL}"
  };
  (function(d,s,k,a){
    var j=d.createElement(s);
    j.src="${WIDGET_LOADER_URL}";
    j.async=true;
    j.setAttribute('data-botforge-key', k);
    j.setAttribute('data-botforge-api', a);
    d.head.appendChild(j);
  })(document,'script','${publicKey || 'loading...'}','${API_BASE_URL}');
</script>`}</code>
                </pre>
              </div>
            </section>

            {/* Appearance Section */}
            <section className="bg-background border border-border rounded-3xl p-8 shadow-sm space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Palette size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Branding & Styles</h3>
                  <p className="text-sm text-muted-foreground">Adjust the visual identity of your bot widget.</p>
                </div>
              </div>

              {/* Theme Selector */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Widget Theme</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {THEMES.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => handleUpdate({ themeKey: t.key })}
                      className={cn(
                        "group relative flex flex-col gap-3 p-4 rounded-2xl border-2 transition-all text-left",
                        theme.themeKey === t.key 
                          ? "border-primary bg-primary/5 ring-4 ring-primary/5" 
                          : "border-border hover:border-border-hover bg-muted/30"
                      )}
                    >
                      <div className={cn("w-full h-12 rounded-lg shadow-inner", t.bg)} />
                      <div>
                        <p className="text-sm font-bold text-foreground">{t.name}</p>
                        <p className="text-[10px] text-muted-foreground leading-tight">{t.desc}</p>
                      </div>
                      {theme.themeKey === t.key && (
                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
                          <Check size={12} strokeWidth={4} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Primary Accent Color</label>
                <div className="flex flex-wrap gap-4">
                  {PRESETS.map((p) => (
                    <button
                      key={p.color}
                      onClick={() => handleUpdate({ customPrimaryColor: p.color })}
                      className={cn(
                        "w-10 h-10 rounded-full transition-all hover:scale-110 flex items-center justify-center ring-offset-2 ring-offset-background",
                        theme.customPrimaryColor === p.color && "ring-2 ring-foreground"
                      )}
                      style={{ backgroundColor: p.color }}
                      title={p.name}
                    >
                      {theme.customPrimaryColor === p.color && <Check size={16} className="text-white" />}
                    </button>
                  ))}
                  <div className="flex items-center gap-3 ml-2 pl-6 border-l border-border">
                    <input 
                      type="color" 
                      value={theme.customPrimaryColor || '#8b5cf6'}
                      onChange={(e) => handleUpdate({ customPrimaryColor: e.target.value })}
                      className="w-10 h-10 rounded-full cursor-pointer bg-transparent border-none overflow-hidden"
                    />
                    <input 
                      type="text" 
                      value={theme.customPrimaryColor || ''}
                      onChange={(e) => handleUpdate({ customPrimaryColor: e.target.value })}
                      className="w-24 h-10 px-3 bg-muted border border-border rounded-lg text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Position Selector */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Widget Alignment</label>
                <div className="flex gap-4 p-1.5 bg-muted rounded-2xl w-fit">
                   <button 
                    onClick={() => handleUpdate({ widgetPosition: 'bottom-left' })}
                    className={cn(
                      "flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all",
                      theme.widgetPosition === 'bottom-left' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-background/50"
                    )}
                   >
                     Left
                   </button>
                   <button 
                    onClick={() => handleUpdate({ widgetPosition: 'bottom-right' })}
                    className={cn(
                      "flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all",
                      theme.widgetPosition === 'bottom-right' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-background/50"
                    )}
                   >
                     Right
                   </button>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar - Live Preview - 5 Cols */}
          <div className="lg:col-span-5 relative">
             <div className="sticky top-28 space-y-6">
                <div className="bg-[#0f172a] rounded-[32px] p-6 border-8 border-slate-800 shadow-2xl relative min-h-[600px] overflow-hidden">
                   <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-slate-800 rounded-full" />
                   
                   <div className="mt-12 space-y-4 px-2">
                      <div className="h-6 w-3/4 bg-slate-700/30 rounded-full" />
                      <div className="h-24 w-full bg-slate-700/20 rounded-3xl" />
                      <div className="grid grid-cols-2 gap-3">
                         <div className="h-20 bg-slate-700/10 rounded-2xl" />
                         <div className="h-20 bg-slate-700/10 rounded-2xl" />
                      </div>
                   </div>

                   {/* The Preview Widget Bubble */}
                   <div className={cn(
                     "absolute bottom-8 transition-all duration-500 flex flex-col items-end gap-4",
                     theme.widgetPosition === 'bottom-left' ? "left-8" : "right-8"
                   )}>
                      {/* Fake Pop-over */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={cn(
                          "w-64 bg-background border border-border rounded-2xl p-4 shadow-2xl space-y-3",
                          theme.themeKey === 'midnight' && "bg-slate-900 border-slate-800 text-white"
                        )}
                      >
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: theme.customPrimaryColor || '#8b5cf6' }}>
                               <Loader2 size={16} />
                            </div>
                            <div className="flex-1">
                               <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Greeting</p>
                               <p className="text-xs font-semibold leading-tight">{bot?.welcomeMessage || 'How can I help you?'}</p>
                            </div>
                         </div>
                         <div className="h-10 rounded-full border border-border bg-muted/30" />
                      </motion.div>

                      {/* Bubble Icon */}
                      <button 
                        className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95"
                        style={{ backgroundColor: theme.customPrimaryColor || '#8b5cf6' }}
                      >
                         <RefreshCw className="animate-spin-slow opacity-80" size={28} />
                      </button>
                   </div>

                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      <LayoutGrid size={12} className="text-slate-700" />
                      <span className="text-[8px] font-bold text-slate-700 uppercase tracking-widest">Live Live Appearance</span>
                   </div>
                </div>

                <div className="bg-background border border-border rounded-2xl p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                         <CheckCircle2 size={20} />
                      </div>
                      <p className="text-sm font-medium">Synced with production</p>
                   </div>
                   <MousePointer2 size={18} className="text-muted-foreground animate-bounce" />
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
