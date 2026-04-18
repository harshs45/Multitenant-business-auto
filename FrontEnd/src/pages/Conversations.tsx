import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listConversations, type Conversation } from '../lib/analytics.api';
import { getBotById, type Bot } from '../lib/bots.api';
import { TranscriptDrawer } from '../components/TranscriptDrawer';
import {
  MessageSquare,
  Clock,
  ArrowLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Circle,
  User as UserIcon,
  Search,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function Conversations() {
  const { botId } = useParams<{ botId: string }>();

  const [bot, setBot] = useState<Bot | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [totalConversations, setTotalConversations] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    async function init() {
      if (!botId) return;

      setLoading(true);
      setError(null);

      try {
        const [botRes, convRes] = await Promise.all([
          getBotById(botId),
          listConversations(botId, currentPage),
        ]);

        if (botRes.success) {
          setBot(botRes.data);
        }

        if (convRes.success) {
          setConversations(convRes.data.items ?? []);
          setTotalConversations(convRes.data.total ?? 0);
          setTotalPages(convRes.pagination?.totalPages ?? 1);
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to load data';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [botId, currentPage]);

  const openTranscript = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setIsDrawerOpen(true);
  };

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-muted-foreground font-medium">
          Loading conversation history...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-12 pt-24 px-4 sm:px-6 relative overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/dashboard" className="hover:text-foreground transition-colors">
            My Bots
          </Link>
          <ChevronRight size={14} />
          <Link
            to={`/dashboard/bots/${botId}`}
            className="hover:text-foreground transition-colors"
          >
            {bot?.botName || bot?.name || 'Bot'}
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Conversations</span>
        </nav>

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <MessageSquare className="text-blue-500" size={32} />
              Interaction History
            </h1>
            <p className="text-muted-foreground">
              Total of {totalConversations} sessions recorded for this bot.
            </p>
          </div>

          <Link
            to={`/dashboard/bots/${botId}`}
            className="h-10 px-4 rounded-lg bg-background border border-border hover:bg-muted transition-colors text-sm font-medium flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Workspace
          </Link>
        </header>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by session ID or status..."
              disabled
              className="w-full h-11 pl-10 pr-4 bg-muted/50 border border-border rounded-xl font-medium cursor-not-allowed opacity-60"
            />
          </div>
        </div>

        <section className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
          {error ? (
            <div className="p-20 text-center">
              <AlertCircle className="mx-auto mb-4 text-destructive" size={40} />
              <h3 className="text-lg font-bold mb-2">Sync Error</h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-primary font-bold underline"
              >
                Retry
              </button>
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground/30">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">No conversations recorded</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Once users start chatting with your bot, their sessions will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {conversations.map((conv, i) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => openTranscript(conv.id)}
                  className="p-6 hover:bg-muted/30 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                      <MessageSquare size={20} />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-foreground flex items-center gap-2">
                        Session: {conv.id.slice(0, 13)}...
                        <span
                          className={cn(
                            'flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded',
                            conv.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          <Circle size={8} fill="currentColor" />
                          {conv.status}
                        </span>
                      </h4>

                      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(conv.createdAt).toLocaleDateString()}
                        </span>

                        {conv.lead && (
                          <span className="flex items-center gap-1 text-emerald-500">
                            <UserIcon size={12} />
                            {conv.lead.name || conv.lead.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1"
                    >
                      View Transcript <ChevronRightIcon size={14} />
                    </button>
                    <ChevronRightIcon className="text-muted-foreground/30" size={18} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10">
              <p className="text-xs text-muted-foreground font-medium">
                Total Interactions: {totalConversations}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 rounded-lg border border-border bg-background disabled:opacity-50 hover:bg-muted transition-all"
                >
                  <ChevronLeft size={16} />
                </button>

                <span className="text-xs font-bold px-3">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-2 rounded-lg border border-border bg-background disabled:opacity-50 hover:bg-muted transition-all"
                >
                  <ChevronRightIcon size={16} />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <TranscriptDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        widgetKey={bot?.embedTokens?.[0]?.publicKey || ''}
        sessionId={selectedSessionId}
        botName={bot?.botName || bot?.name || 'Bot'}
      />
    </div>
  );
}