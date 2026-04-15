import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listLeads, type Lead } from '../lib/analytics.api';
import { getBotById, type Bot } from '../lib/bots.api';
import { 
  User, 
  Mail, 
  Clock, 
  ArrowLeft, 
  ChevronRight, 
  Search, 
  Loader2, 
  AlertCircle,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Leads() {
  const { botId } = useParams<{ botId: string }>();

  const [bot, setBot] = useState<Bot | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function init() {
      if (!botId) return;
      setLoading(true);
      setError(null);
      try {
        const [botRes, leadsRes] = await Promise.all([
          getBotById(botId),
          listLeads(botId, currentPage)
        ]);

        if (botRes.success) setBot(botRes.data);
        if (leadsRes.success) {
          setLeads(leadsRes.data.items);
          setTotalLeads(leadsRes.data.total);
          setTotalPages(leadsRes.pagination.totalPages);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [botId, currentPage]);

  const filteredLeads = leads.filter(l => 
    l.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-muted-foreground font-medium">Loading leads data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-12 pt-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
             My Bots
          </Link>
          <ChevronRight size={14} />
          <Link to={`/dashboard/bots/${botId}`} className="hover:text-foreground transition-colors">
            {bot?.botName || bot?.name || 'Bot'}
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Leads</span>
        </nav>

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <User className="text-emerald-500" size={32} /> User Leads
            </h1>
            <p className="text-muted-foreground">
              Total of {totalLeads} contacts collected by this bot.
            </p>
          </div>
          <Link 
            to={`/dashboard/bots/${botId}`}
            className="h-10 px-4 rounded-lg bg-background border border-border hover:bg-muted transition-colors text-sm font-medium flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Workspace
          </Link>
        </header>

        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
            />
          </div>
          <button className="h-11 px-4 bg-background border border-border rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-muted transition-all">
             <Filter size={18} /> Filter
          </button>
        </div>

        {/* Leads Table */}
        <section className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
          {error ? (
            <div className="p-20 text-center">
               <AlertCircle className="mx-auto mb-4 text-destructive" size={40} />
               <h3 className="text-lg font-bold mb-2">Fetch Error</h3>
               <p className="text-muted-foreground mb-6">{error}</p>
               <button onClick={() => window.location.reload()} className="text-primary font-bold underline">Retry</button>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-20 text-center">
               <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground/30">
                  <Mail size={32} />
               </div>
               <h3 className="text-xl font-bold mb-2">No leads captured</h3>
               <p className="text-muted-foreground max-w-sm mx-auto">
                 Once your bot starts interacting with users and capturing details, they will appear here.
               </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">User Information</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Captured</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <AnimatePresence>
                    {filteredLeads.map((lead, i) => (
                      <motion.tr 
                        key={lead.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4 min-w-[200px]">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                              {lead.name?.charAt(0) || 'U'}
                            </div>
                            <span className="font-semibold text-foreground">{lead.name || 'Anonymous User'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground/80">{lead.email}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground font-medium">
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-muted-foreground/50" />
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-all">
                              <ChevronRightIcon size={16} />
                           </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10">
               <p className="text-xs text-muted-foreground font-medium">
                 Showing {filteredLeads.length} of {totalLeads} leads
               </p>
               <div className="flex items-center gap-2">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="p-2 rounded-lg border border-border bg-background disabled:opacity-50 hover:bg-muted transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-bold px-3">Page {currentPage} of {totalPages}</span>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="p-2 rounded-lg border border-border bg-background disabled:opacity-50 hover:bg-muted transition-all"
                  >
                    <ChevronRightIcon size={16} />
                  </button>
               </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
