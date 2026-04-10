import { useWizardStore } from "../../../store/wizardStore";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../../../lib/utils";

const TONES = ['Professional', 'Friendly', 'Casual', 'Witty', 'Empathetic', 'Formal'];

export function Step3Identity() {
  const { 
    businessName, 
    botName, 
    avatarStyle, 
    welcomeMessage, 
    toneOfVoice, 
    responseLanguage, 
    fallbackEmail, 
    setField, 
    nextStep, 
    prevStep 
  } = useWizardStore();

  const botNamePlaceholder = businessName ? `${businessName}Bot` : 'MyBusinessBot';

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Bot Identity</h2>
        <p className="text-muted-foreground">Give your chatbot a personality that fits your brand.</p>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pb-4 custom-scrollbar pr-2">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Bot Name</label>
            <input 
              type="text" 
              placeholder={botNamePlaceholder}
              value={botName}
              onChange={(e) => setField('botName', e.target.value)}
              className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Avatar Style</label>
            <select 
              title="Avatar Style"
              value={avatarStyle}
              onChange={(e) => setField('avatarStyle', e.target.value)}
              className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary transition-all"
            >
              <option>Robot</option>
              <option>Person</option>
              <option>Brand logo</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 flex justify-between">
            <span>Welcome Message</span>
            <span className={cn("text-xs", welcomeMessage.length > 200 ? "text-red-500" : "text-muted-foreground")}>
              {welcomeMessage.length} / 200
            </span>
          </label>
          <textarea 
            placeholder="Hi there! How can I help you today?" 
            value={welcomeMessage}
            onChange={(e) => setField('welcomeMessage', e.target.value)}
            maxLength={200}
            className="w-full h-24 p-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Tone of Voice</label>
          <div className="flex flex-wrap gap-2">
             {TONES.map(tone => (
               <button
                 key={tone}
                 onClick={() => setField('toneOfVoice', tone)}
                 className={cn(
                   "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                   toneOfVoice === tone 
                     ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                     : "bg-background border-border text-foreground hover:bg-muted"
                 )}
               >
                 {tone}
               </button>
             ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 border-t border-border pt-6">
           <div>
            <label className="block text-sm font-medium mb-1.5">Response Language</label>
            <select 
              title="Language"
              value={responseLanguage}
              onChange={(e) => setField('responseLanguage', e.target.value)}
              className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary transition-all"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Hinglish</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Arabic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Escalation Email (Fallback)</label>
            <input 
              type="email" 
              placeholder="help@business.com" 
              value={fallbackEmail}
              onChange={(e) => setField('fallbackEmail', e.target.value)}
              className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-border flex justify-between">
        <button 
          onClick={prevStep}
          className="inline-flex items-center gap-2 text-muted-foreground h-11 px-4 hover:text-foreground font-medium transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button 
          onClick={nextStep}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground h-11 px-6 rounded-lg font-medium hover:bg-primary-hover transition-colors"
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
