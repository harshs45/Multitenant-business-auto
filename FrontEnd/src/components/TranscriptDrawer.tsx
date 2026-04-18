import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Loader2, 
  AlertCircle, 
  MessageSquare,
  Clock,
  User as UserIcon,
  Bot as BotIcon
} from 'lucide-react';
import { getConversationHistory, type Message } from '../lib/analytics.api';
import { cn } from '../lib/utils';

interface TranscriptDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  widgetKey: string;
  sessionId: string | null;
  botName: string;
}

export function TranscriptDrawer({ isOpen, onClose, widgetKey, sessionId, botName }: TranscriptDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && sessionId && widgetKey) {
      fetchHistory();
    }
  }, [isOpen, sessionId, widgetKey]);

  const fetchHistory = async () => {
    if (!sessionId || !widgetKey) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getConversationHistory(widgetKey, sessionId);
      if (res.success) {
        setMessages(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load conversation history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-background border-l border-border shadow-2xl flex flex-col h-full"
          >
            {/* Header */}
            <header className="p-6 border-b border-border flex items-center justify-between bg-background z-10">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <MessageSquare size={20} className="text-primary" /> Chat Transcript
                </h3>
                <p className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-widest">
                  Session: {sessionId?.slice(0, 8)}...
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </header>

            {/* Transcript Body */}
            <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <Loader2 className="animate-spin mb-4" size={32} />
                  <p className="font-medium">Retrieving messages...</p>
                </div>
              ) : error ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                   <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center text-destructive mb-4">
                      <AlertCircle size={32} />
                   </div>
                   <h4 className="text-lg font-bold mb-2">Retrieval Failed</h4>
                   <p className="text-sm text-muted-foreground mb-6">{error}</p>
                   <button 
                    onClick={fetchHistory}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all"
                   >
                     Retry Fetch
                   </button>
                </div>
              ) : messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center">
                   <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                      <Clock size={32} />
                   </div>
                   <p className="font-medium">No messages recorded in this session</p>
                </div>
              ) : (
                <div className="space-y-6 pb-20">
                  {messages.map((msg, index) => (
                    <div 
                      key={msg.id || index}
                      className={cn(
                        "flex flex-col max-w-[85%]",
                        msg.role === 'user' ? "ml-auto items-end" : "items-start"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-2 px-1">
                        {msg.role !== 'user' && <BotIcon size={14} className="text-primary" />}
                        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">
                          {msg.role === 'user' ? 'Customer' : botName}
                        </span>
                        {msg.role === 'user' && <UserIcon size={14} className="text-muted-foreground" />}
                      </div>
                      <div className={cn(
                        "p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm",
                        msg.role === 'user' 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-muted border border-border rounded-tl-none"
                      )}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>

            {/* Footer / Status */}
            <footer className="p-4 border-t border-border bg-muted/30 text-center">
               <p className="text-[10px] text-muted-foreground font-semibold flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Audit data secured via owner-only session retrieval
               </p>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
