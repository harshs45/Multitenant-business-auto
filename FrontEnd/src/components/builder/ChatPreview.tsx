import { useState, useEffect } from "react";
import { useWizardStore } from "../../store/wizardStore";
import { Bot, Send, User } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function ChatPreview() {
  const store = useWizardStore();
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  // Re-run animation simulation when bot text or theme changes
  useEffect(() => {
    setTimeout(() => {
      setIsTyping(true);
      setMessages([]);
    }, 0);
    
    const welcome = store.welcomeMessage || 'Hi there! How can I help you today?';
    
    // Simulate typing for welcome message
    const timer1 = setTimeout(() => {
      setIsTyping(false);
      setMessages([{ sender: 'bot', text: welcome }]);
      
      // The user replies
      const timer2 = setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'user', text: store.businessType === 'E-commerce' ? 'Where is my order?' : 'I have a question.' }]);
        
        // Bot typing follow-up
        setIsTyping(true);
        const timer3 = setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { sender: 'bot', text: `I can help with that. Since you selected a ${store.toneOfVoice.toLowerCase()} tone, I will answer accordingly!` }]);
        }, 1200);
        return () => clearTimeout(timer3);
      }, 1500);
      return () => clearTimeout(timer2);
    }, 800);
    
    return () => clearTimeout(timer1);
  }, [store.welcomeMessage, store.themeId, store.botName, store.businessType, store.toneOfVoice]);

  const botNameDisplay = store.botName || `${store.businessName || 'Business'}Bot`;
  
  // Dynamic inline styles based on font and border radius
  const previewStyle = {
    fontFamily: store.fontStyle === 'Rounded (Nunito)' ? '"Nunito", sans-serif' : 
                store.fontStyle === 'Elegant (Playfair)' ? '"Playfair Display", serif' : 
                store.fontStyle === 'Mono (JetBrains Mono)' ? '"JetBrains Mono", monospace' : 
                'inherit',
    borderRadius: `${store.borderRadius}px`,
  } as React.CSSProperties;

  // Add CSS variable override for accent color
  const scopedVars = {
    '--user-bg': store.accentColor
  } as React.CSSProperties;

  return (
    <div className={cn("w-full bg-background border border-border shadow-md overflow-hidden flex flex-col h-[550px]", `bot-theme-${store.themeId}`)} style={{...previewStyle, ...scopedVars}}>
      {/* Header */}
      <div 
        className="h-16 flex items-center px-4 gap-3 text-white shadow-sm z-10 relative"
        style={{ backgroundColor: 'var(--bot-header)' }}
      >
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
           {store.avatarStyle === 'Robot' ? <Bot size={20} /> : <User size={20} />}
        </div>
        <div>
          <h3 className="font-semibold text-sm">{botNameDisplay}</h3>
          <span className="text-xs text-green-400 flex items-center gap-1 opacity-90">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span> Online
          </span>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto" style={{ backgroundColor: 'var(--chat-bg)' }}>
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn("flex gap-2 max-w-[85%]", msg.sender === 'user' ? "self-end justify-end" : "self-start")}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white" style={{ backgroundColor: 'var(--bot-header)' }}>
                  {store.avatarStyle === 'Robot' ? <Bot size={14}/> : <User size={14} />}
                </div>
              )}
              <div 
                className={cn("px-4 py-2 text-sm shadow-sm", msg.sender === 'user' ? "rounded-l-2xl rounded-tr-xl text-white" : "rounded-r-2xl rounded-tl-xl")}
                style={{ 
                  backgroundColor: msg.sender === 'user' ? 'var(--user-bg)' : 'var(--bot-bg)',
                  color: msg.sender === 'user' ? 'var(--user-text)' : 'var(--bot-text)'
                }}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
               className="flex gap-2 self-start max-w-[85%]"
             >
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white" style={{ backgroundColor: 'var(--bot-header)' }}>
                  <Bot size={14}/>
                </div>
                <div 
                  className="px-4 py-3 rounded-r-2xl rounded-tl-xl flex items-center gap-1 shadow-sm"
                  style={{ backgroundColor: 'var(--bot-bg)' }}
                >
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Input Area */}
      <div className="p-3 border-t shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-10 relative" style={{ backgroundColor: 'var(--chat-bg)', borderColor: 'rgba(0,0,0,0.05)' }}>
        <div className="h-12 rounded-full border border-black/10 bg-white/50 dark:bg-black/10 px-4 flex items-center justify-between pointer-events-none opacity-70">
           <span className="text-sm text-gray-400 dark:text-gray-500">Type your message...</span>
           <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bot-header)' }}>
             <Send size={14} className="text-white ml-0.5" />
           </div>
        </div>
      </div>
    </div>
  );
}
