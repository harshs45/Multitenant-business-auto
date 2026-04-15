import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listAllBots, type Bot } from '../lib/bots.api';
import { 
  MessageSquare, 
  Plus, 
  ArrowRight,
  Loader2,
  AlertCircle,
  Database,
  Bot as BotIcon,
  Search,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchAllBots() {
      setLoading(true);
      setError(null);
      try {
        const botsList = await listAllBots();
        console.log('DEBUG: Dashboard fetched bots:', botsList);
        setBots(botsList);
      } catch (err: any) {
        setError(err.message || 'Failed to load bots');
      } finally {
        setLoading(false);
      }
    }
    fetchAllBots();
  }, []);

  const filteredBots = bots.filter(bot => 
    bot.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bot.botName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/20 pb-12 pt-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Hub Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
              My Bots
            </h1>
            <p className="text-muted-foreground">
              Manage all your AI assistants and business integrations.
            </p>
          </div>
          <button 
            onClick={() => navigate('/build')}
            className="h-11 px-6 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Plus size={20} /> Create New Bot
          </button>
        </header>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search bots by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
            />
          </div>
          <div className="flex bg-background border border-border rounded-xl p-1 shrink-0">
             <button className="p-2 bg-muted text-primary rounded-lg transition-all"><LayoutGrid size={18} /></button>
             <button className="p-2 text-muted-foreground hover:bg-muted/50 rounded-lg transition-all hover:text-foreground"><ListIcon size={18} /></button>
          </div>
        </div>

        {/* Bot Grid / List */}
        <main>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p className="font-medium">Discovering your assistants...</p>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 text-center text-destructive">
               <AlertCircle className="mx-auto mb-3" size={32} />
               <p className="text-lg font-bold">{error}</p>
               <button onClick={() => window.location.reload()} className="mt-4 text-sm font-bold underline">Try refreshing the page</button>
            </div>
          ) : filteredBots.length === 0 ? (
            <div className="bg-background border-2 border-dashed border-border rounded-3xl p-16 text-center">
               <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground/50">
                  <BotIcon size={32} />
               </div>
               <h3 className="text-xl font-bold text-foreground mb-2">No bots found</h3>
               <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                 {searchQuery ? "We couldn't find any bots matching your search." : "You haven't created any AI assistants yet. Start building one now."}
               </p>
               {!searchQuery && (
                 <button 
                  onClick={() => navigate('/build')}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                 >
                   Build Your First Bot
                 </button>
               )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <AnimatePresence>
                 {filteredBots.map((bot, i) => (
                   <motion.div
                    key={bot.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/dashboard/bots/${bot.id}`)}
                    className="bg-background border border-border rounded-2xl p-6 shadow-sm hover:border-primary/50 transition-all cursor-pointer group flex flex-col justify-between"
                   >
                     <div>
                        <div className="flex items-start justify-between mb-4">
                           <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                             <MessageSquare size={24} />
                           </div>
                           <span className={cn(
                             "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded",
                             bot.status === 'published' ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"
                           )}>
                             {bot.status}
                           </span>
                        </div>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{bot.botName || bot.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {bot.businessDescription || "No description provided."}
                        </p>
                     </div>

                     <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs font-semibold text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                           <Database size={14} /> Knowledge Base Ready
                        </div>
                        <div className="flex items-center gap-1 group-hover:text-primary transition-colors">
                           Open Workspace <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                     </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
