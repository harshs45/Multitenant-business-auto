import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getAnalyticsOverview, type AnalyticsOverview } from '../lib/api';
import { getBotById, type Bot } from '../lib/bots.api';
import { 
  
  MessageSquare, 
  FileText, 
  Plus, 
  ArrowUpRight,
  TrendingUp,
  Clock,
  User as UserIcon,
  ShieldCheck,
  Loader2,
  Settings,
  Database,
  ArrowLeft,
  AlertCircle,
  Copy,
  Check,
  Layout
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function BotWorkspace() {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();

  const [bot, setBot] = useState<Bot | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchBotData() {
      if (!botId) return;
      setLoading(true);
      setError(null);
      try {
        // Fetch bot details and analytics in parallel
        const [botRes, analyticsRes] = await Promise.all([
          getBotById(botId),
          getAnalyticsOverview(botId)
        ]);

        if (botRes.success) {
          setBot(botRes.data);
        } else {
          setError('Bot not found');
        }

        if (analyticsRes.success) {
          setAnalytics(analyticsRes.data);
        }
      } catch (err: any) {
        console.error('Failed to fetch bot workspace data:', err);
        setError(err.message || 'Failed to load bot data');
      } finally {
        setLoading(false);
      }
    }
    fetchBotData();
  }, [botId]);

  // Extract public widget key from embedTokens (safe null handling)
  const widgetKey = bot?.embedTokens?.[0]?.publicKey || '';

  const handleCopyKey = () => {
    if (widgetKey) {
      navigator.clipboard.writeText(widgetKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-muted-foreground font-medium">Loading workspace...</p>
      </div>
    );
  }

  if (error || !bot) {
    return (
      <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-background border border-border rounded-2xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6 text-destructive">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Workspace Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The bot you are looking for does not exist or you don't have access to it.
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full h-11 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Back to My Bots
          </button>
        </div>
      </div>
    );
  }

  // Real Data vs Mock distinction
  const stats = [
    { 
      label: 'Conversations', 
      value: analytics?.totalConversations?.toLocaleString() || '0', 
      change: 'Lifetime', 
      icon: MessageSquare, 
      color: 'text-blue-500',
    },
    { 
      label: 'Messages', 
      value: analytics?.totalMessages?.toLocaleString() || '0', 
      change: 'Total', 
      icon: TrendingUp, 
      color: 'text-purple-500',
    },
    { 
      label: 'Leads Collected', 
      value: analytics?.totalLeads?.toLocaleString() || '0', 
      change: 'New', 
      icon: UserIcon, 
      color: 'text-emerald-500',
    },
    { 
      label: 'Handoffs', 
      value: analytics?.totalHandoffs?.toLocaleString() || '0', 
      change: 'Active', 
      icon: ShieldCheck, 
      color: 'text-amber-500',
    },
  ];

  // Map daily usage to chart: we sum all event types per date
  const chartData = (analytics?.dailyUsage || []).reduce((acc: any[], curr) => {
    const existing = acc.find(a => a.date === curr.eventDate);
    if (existing) {
      existing.total += parseInt(curr.total as any, 10);
    } else {
      acc.push({ date: curr.eventDate, total: parseInt(curr.total as any, 10) });
    }
    return acc;
  }, [])
  .slice(-7); // Last 7 days

  const maxVal = Math.max(...chartData.map(d => d.total), 1);

  const activities = [
    { id: 1, type: 'bot', text: 'Bot configuration updated', time: '2 hours ago', icon: ShieldCheck },
    { id: 2, type: 'doc', text: 'Pricing_Guide.pdf processed', time: '5 hours ago', icon: FileText },
    { id: 3, type: 'chat', text: 'New lead collected via widget', time: '1 day ago', icon: UserIcon },
    { id: 4, type: 'faq', text: 'Added 5 new FAQs from website', time: '2 days ago', icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-muted/20 pb-12 pt-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> My Bots
          </Link>
          <ChevronRight />
          <span className="text-foreground font-medium">{bot.botName || bot.name}</span>
        </nav>

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {bot.botName || bot.name}
              </h1>
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                bot.status === 'published' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
              )}>
                {bot.status}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 max-w-xl truncate">
              {bot.businessDescription || 'Standard AI configuration'}
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate(`/dashboard/bots/${botId}/knowledge`)}
              className="h-10 px-4 rounded-lg bg-background border border-border hover:bg-muted transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Database size={16} /> Knowledge Base
            </button>
            <button 
              onClick={() => navigate(`/dashboard/bots/${botId}/deployment`)}
              className="h-10 px-4 rounded-lg bg-background border border-border hover:bg-muted transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Layout size={16} /> Widget Deployment
            </button>
            <button 
              onClick={() => navigate(`/dashboard/bots/${botId}/settings`)}
              className="h-10 px-4 rounded-lg bg-blue-700 text-primary-foreground hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2 shadow-sm"
            >
              <Settings size={16} /> Settings
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                if (stat.label === 'Conversations') navigate(`/dashboard/bots/${botId}/conversations`);
              }}
              className={cn(
                "bg-background border border-border rounded-2xl p-6 shadow-sm group hover:border-blue-300 transition-colors relative overflow-hidden",
                (stat.label === 'Conversations') && "cursor-pointer"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-colors", stat.color)}>
                  <stat.icon size={20} />
                </div>
                <div className="flex flex-col items-end">
                   <span className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                   )}>
                    {stat.change}
                   </span>
                   {(stat.label === 'Conversations') && (
                     <span className="text-[9px] font-bold text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity">View All →</span>
                   )}
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mt-0.5">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Section (REAL Visualization) */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-background border border-border rounded-2xl p-6 shadow-sm overflow-hidden relative min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bold text-lg">Conversation Trends</h3>
                  <p className="text-sm text-muted-foreground">Volume of interactions over the last 7 days</p>
                </div>
              </div>

              {/* Chart Implementation */}
              <div className="flex-1 flex items-end gap-2 px-2 pb-6 pt-4">
                {chartData.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm italic">
                    No activity recorded in the last 7 days
                  </div>
                ) : (
                  chartData.map((d, i) => {
                    const heightPercent = (d.total / maxVal) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full relative">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercent}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="w-full bg-primary/20 rounded-t-lg"
                          />
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercent * 0.7}%` }}
                            transition={{ duration: 1.2, delay: i * 0.1 }}
                            className="w-full absolute bottom-0 bg-primary rounded-t-lg shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                          />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {d.total}
                          </div>
                        </div>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-tighter">
                          {new Date(d.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>


            {/* Quick Actions Placeholder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-center gap-4 hover:bg-primary/10 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                  <TrendingUp size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary">Optimize Bot</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    Review pending questions <ArrowUpRight size={12} />
                  </p>
                </div>
              </div>
              <div 
                // onClick={() => navigate(`/dashboard/bots/${botId}/leads`)}
                className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4 hover:bg-emerald-500/10 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <UserIcon size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-emerald-500">View Leads</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    Manage contact data <ArrowUpRight size={12} />
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar Section */}
          <aside className="space-y-8">
            
            {/* Widget Key Section (REAL) */}
            <div className="bg-background border border-border rounded-2xl p-6 shadow-sm relative">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-500" /> Widget Key
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1.5 block">Public Widget Key</label>
                  <div className="relative group">
                    <div className="w-full h-11 px-4 bg-muted/30 border border-border rounded-lg flex items-center font-mono text-sm overflow-hidden pr-12">
                      {widgetKey ? `${widgetKey.slice(0, 12)}••••••••${widgetKey.slice(-6)}` : 'No embed token found'}
                    </div>
                    <button 
                      onClick={handleCopyKey}
                      disabled={!widgetKey}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                      title="Copy Widget Key"
                    >
                      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="pt-2">
                   <Link 
                    to={`/dashboard/bots/${botId}/deployment`}
                    className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1"
                   >
                     Manage Deployment & Script <ArrowUpRight size={12} />
                   </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity (MOCK) */}
            <div className="bg-background border border-border rounded-2xl p-6 shadow-sm relative">
              <div className="absolute top-2 right-2 text-[8px] font-bold text-muted-foreground/30 uppercase">Mock Activity</div>
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Clock size={18} className="text-blue-500" /> Bot Log
              </h3>
              <div className="space-y-6">
                {activities.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                      <item.icon size={14} className="text-muted-foreground group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
