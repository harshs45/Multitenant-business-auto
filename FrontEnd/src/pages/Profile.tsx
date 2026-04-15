import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { updateProfile } from '../lib/api';
import { listAllBots } from '../lib/bots.api';
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Bot as BotIcon, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Shield,
  ArrowRight,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, checkAuth } = useAuthStore();
  
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [totalBots, setTotalBots] = useState<number | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const bots = await listAllBots();
        setTotalBots(bots.length);
      } catch (err) {
        console.error('Failed to fetch bot count:', err);
      } finally {
        setStatsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setError(null);
    try {
      const res = await updateProfile({ name });
      if (res.success) {
        setSaveSuccess(true);
        // Refresh auth state to update name in Navbar etc.
        await checkAuth();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/20 pb-20 pt-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <UserIcon className="text-primary" size={32} /> My Account
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal identity and platform settings.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Profile Form */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
               <div className="p-8 space-y-8">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xl font-bold">Personal Information</h3>
                     <AnimatePresence>
                        {saveSuccess && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                            className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-emerald-500/20"
                          >
                            <CheckCircle2 size={14} /> Profile updated
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </div>

                  <form onSubmit={handleUpdate} className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                          <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              setSaveSuccess(false);
                            }}
                            className="w-full h-12 pl-10 pr-4 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                            placeholder="Your display name"
                          />
                        </div>
                     </div>

                     <div className="space-y-2 opacity-60 cursor-not-allowed">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          Email Address <Shield size={12} />
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                          <input 
                            type="email" 
                            disabled
                            value={user.email}
                            className="w-full h-12 pl-10 pr-4 bg-muted border border-border rounded-xl font-medium"
                          />
                        </div>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                          Email cannot be changed in this iteration for security reasons.
                        </p>
                     </div>

                     <div className="pt-4 flex items-center justify-between border-t border-border mt-10">
                        {error && (
                          <div className="text-xs font-bold text-destructive flex items-center gap-1.5 bg-destructive/5 px-3 py-2 rounded-lg">
                            <AlertCircle size={14} /> {error}
                          </div>
                        )}
                        <button 
                          type="submit"
                          disabled={saving || !name || name === user.name}
                          className="ml-auto h-12 px-8 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
                        >
                          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                          Save Profile
                        </button>
                     </div>
                  </form>
               </div>
            </section>
          </div>

          {/* Sidebar Stats */}
          <aside className="space-y-6">
             <section className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold mb-6 flex items-center gap-2">
                   <Shield size={18} className="text-primary" /> Account Meta
                </h3>
                
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                         <Calendar size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Member Since</p>
                         <p className="text-sm font-semibold text-foreground">
                           {user.createdAt 
                             ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) 
                             : 'October 2024'}
                         </p>
                      </div>
                   </div>

                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                         <BotIcon size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Deployment Scope</p>
                         <p className="text-sm font-semibold text-foreground">
                           {statsLoading ? 'Loading...' : `${totalBots} Active Bots`}
                         </p>
                      </div>
                   </div>

                   <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                         <span>Account Tier</span>
                         <span className="text-primary">Creator Powe</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                         <div className="bg-primary h-full w-[85%] rounded-full" />
                      </div>
                   </div>
                </div>
             </section>

             <Link 
              to="/dashboard"
              className="w-full h-12 bg-muted/50 border border-border rounded-xl flex items-center justify-center gap-2 text-sm font-bold hover:bg-background transition-all"
             >
                Return to My Bots <ArrowRight size={16} />
             </Link>
          </aside>

        </div>
      </div>
    </div>
  );
}
