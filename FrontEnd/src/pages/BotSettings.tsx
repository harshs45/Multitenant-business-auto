import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { deleteBot, getBotById, updateBotIdentity, type Bot, type BotIdentity } from '../lib/bots.api';
import { 
  Settings, 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Save,
  MessageSquare,
  Globe,
  Mail,
  Zap,
  ChevronRight,
  Trash2,
  AlertTriangle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TONES = ['professional', 'friendly', 'casual', 'formal', 'witty', 'empathetic', 'enthusiastic', 'calm'];
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' }
];

export default function BotSettings() {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();

  // State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [bot, setBot] = useState<Bot | null>(null);
  
  // Deletion State
  const [deleteConfirmName, setDeleteConfirmName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form State
  const [formData, setFormData] = useState<BotIdentity>({
    botName: '',
    welcomeMessage: '',
    toneOfVoice: 'professional',
    responseLanguage: 'en',
    fallbackEmail: ''
  });

  useEffect(() => {
    async function fetchBot() {
      if (!botId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getBotById(botId);
        if (res.success) {
          setBot(res.data);
          // Prefill form (we use botName or name depending on what's available)
          setFormData({
            botName: res.data.botName || res.data.name || '',
            welcomeMessage: res.data.welcomeMessage || 'Hello! How can I help you today?',
            toneOfVoice: res.data.toneOfVoice || 'professional',
            responseLanguage: res.data.responseLanguage || 'en',
            fallbackEmail: res.data.fallbackEmail || ''
          });
        } else {
          setError('Bot not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load bot settings');
      } finally {
        setLoading(false);
      }
    }
    fetchBot();
  }, [botId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!botId) return;
    
    setSaving(true);
    setSaveSuccess(false);
    setError(null);

    try {
      const res = await updateBotIdentity(botId, formData);
      if (res.success) {
        setSaveSuccess(true);
        // Scroll to top or show feedback
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!botId || !bot) return;
    
    // Final check
    const currentName = bot.botName || bot.name || '';
    if (deleteConfirmName !== currentName) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const res = await deleteBot(botId);
      if (res.success) {
        // Navigate to dashboard after small delay to show success maybe?
        // But the constraint said "After successful deletion, navigate to /dashboard"
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      setDeleteError(err.message || 'Failed to delete bot');
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-muted-foreground font-medium">Loading configuration...</p>
      </div>
    );
  }

  if (error && !bot) {
    return (
      <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-background border border-border rounded-2xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6 text-destructive">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Configuration Error</h2>
          <p className="text-muted-foreground mb-8">{error}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full h-11 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Back to Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-12 pt-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/dashboard" className="hover:text-foreground transition-colors">My Bots</Link>
          <ChevronRight size={14} />
          <Link to={`/dashboard/bots/${botId}`} className="hover:text-foreground transition-colors">{bot?.botName || bot?.name}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Settings</span>
        </nav>

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <Settings className="text-primary" size={32} /> Bot Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Configure your AI assistant's personality and behavior.
            </p>
          </div>
          <Link 
            to={`/dashboard/bots/${botId}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Back to Workspace
          </Link>
        </header>

        {/* Settings Form */}
        <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-8">
              
              {/* Feedback States */}
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3 text-emerald-500"
                  >
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-bold">Changes saved successfully!</span>
                  </motion.div>
                )}
                {error && bot && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3 text-destructive"
                  >
                    <AlertCircle size={20} />
                    <span className="text-sm font-bold">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Basic Identity */}
                <section className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Zap size={20} className="text-primary" /> Identity
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bot Unique Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.botName}
                      onChange={(e) => setFormData({ ...formData, botName: e.target.value })}
                      className="w-full h-11 px-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                      placeholder="e.g. SalesHelper"
                    />
                    <p className="text-[10px] text-muted-foreground">The internal name used to identify this bot instance.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Welcome Message</label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.welcomeMessage}
                      onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                      className="w-full p-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium resize-none"
                      placeholder="e.g. Hi there! How can I assist you today?"
                    />
                  </div>
                </section>

                {/* Persona & Flow */}
                <section className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <MessageSquare size={20} className="text-primary" /> Personality
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tone of Voice</label>
                    <select 
                      value={formData.toneOfVoice}
                      onChange={(e) => setFormData({ ...formData, toneOfVoice: e.target.value })}
                      className="w-full h-11 px-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium capitalize"
                    >
                      {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Language</label>
                    <div className="relative group">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <select 
                        value={formData.responseLanguage}
                        onChange={(e) => setFormData({ ...formData, responseLanguage: e.target.value })}
                        className="w-full h-11 pl-10 pr-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                      >
                        {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Mail size={14} /> Fallback Email
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.fallbackEmail}
                      onChange={(e) => setFormData({ ...formData, fallbackEmail: e.target.value })}
                      className="w-full h-11 px-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                      placeholder="support@example.com"
                    />
                    <p className="text-[10px] text-muted-foreground">Used for lead notifications and human handoff requests.</p>
                  </div>
                </section>
              </div>
            </div>

            {/* Form Footer */}
            <div className="bg-muted/50 border-t border-border p-6 flex items-center justify-end">
              <button 
                type="submit"
                disabled={saving}
                className="h-12 px-8 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-70"
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Update Identity
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-background border border-destructive/20 rounded-2xl shadow-sm overflow-hidden">
           <div className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-destructive">
                 <AlertTriangle size={24} />
                 <h3 className="text-xl font-bold">Danger Zone</h3>
              </div>
              
              <div className="p-6 bg-destructive/5 border border-destructive/10 rounded-xl space-y-4">
                 <div>
                    <h4 className="font-bold text-foreground">Delete this bot</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                       Once you delete a bot, there is no going back. All conversation history and knowledge base data will be permanently removed.
                    </p>
                 </div>

                 {!showDeleteConfirm ? (
                   <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="h-10 px-4 bg-destructive text-destructive-foreground rounded-lg font-bold hover:bg-destructive/90 transition-all text-sm flex items-center gap-2"
                   >
                      <Trash2 size={16} /> Delete Assistant
                   </button>
                 ) : (
                   <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 pt-2 border-t border-destructive/10"
                   >
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-destructive uppercase tracking-widest">
                           Confirm by typing the bot name: <span className="text-foreground select-none">"{bot?.botName || bot?.name}"</span>
                         </label>
                         <div className="flex gap-2">
                           <input 
                             type="text" 
                             value={deleteConfirmName}
                             onChange={(e) => setDeleteConfirmName(e.target.value)}
                             className="flex-1 h-11 px-4 bg-background border border-destructive/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-destructive/50 transition-all font-medium"
                             placeholder="Type bot name here"
                           />
                           <button 
                            onClick={handleDelete}
                            disabled={isDeleting || deleteConfirmName !== (bot?.botName || bot?.name)}
                            className="h-11 px-6 bg-destructive text-destructive-foreground rounded-xl font-bold hover:bg-destructive/90 transition-all text-sm disabled:opacity-50 flex items-center gap-2"
                           >
                              {isDeleting ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
                              Confirm Delete
                           </button>
                           <button 
                             onClick={() => {
                               setShowDeleteConfirm(false);
                               setDeleteConfirmName('');
                               setDeleteError(null);
                             }}
                             className="h-11 px-4 bg-muted text-muted-foreground rounded-xl font-bold hover:bg-background transition-all"
                           >
                              <X size={18} />
                           </button>
                         </div>
                         {deleteError && (
                           <p className="text-xs font-bold text-destructive mt-2 flex items-center gap-1">
                             <AlertCircle size={12} /> {deleteError}
                           </p>
                         )}
                      </div>
                   </motion.div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
