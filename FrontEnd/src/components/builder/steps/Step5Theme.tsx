import { useState } from "react";
import { useWizardStore } from "../../../store/wizardStore";
import { ArrowLeft, Check, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { cn } from "../../../lib/utils";
import { generateBot } from "../../../lib/api";

const THEMES = [
  { id: 'midnight',  name: 'Midnight Pro',    sub: 'Dark & sleek',       chatBg: '#0f0f23', botBg: '#16213e', userBg: '#7F77DD' },
  { id: 'emerald',   name: 'Emerald Fresh',   sub: 'Clean & natural',    chatBg: '#f0fdf4', botBg: '#d1fae5', userBg: '#059669' },
  { id: 'sakura',    name: 'Sakura',          sub: 'Soft & warm',        chatBg: '#fff1f8', botBg: '#fce7f3', userBg: '#db2777' },
  { id: 'ocean',     name: 'Ocean Breeze',    sub: 'Calm & clear',       chatBg: '#eff6ff', botBg: '#dbeafe', userBg: '#2563eb' },
  { id: 'slate',     name: 'Slate Classic',   sub: 'Professional',       chatBg: '#f8fafc', botBg: '#f1f5f9', userBg: '#475569' },
  { id: 'amber',     name: 'Warm Amber',      sub: 'Friendly & bold',    chatBg: '#fffbeb', botBg: '#fef3c7', userBg: '#d97706' },
];

export function Step5Theme() {
  const store = useWizardStore();
  const { 
    themeId, 
    accentColor, 
    widgetPosition, 
    borderRadius, 
    fontStyle, 
    setField, 
    prevStep,
    setStep,
    setBotId,
    setGenerationError,
    generationError,
  } = store;

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateBot = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const res = await generateBot({
        businessName: store.businessName,
        websiteUrl: store.websiteUrl,
        businessType: store.businessType,
        businessDescription: store.businessDescription,
        supportEmail: store.supportEmail,
        businessHours: store.businessHours,
        adaptiveFields: store.adaptiveFields,
        faqTopics: store.faqTopics,
        botName: store.botName,
        avatarStyle: store.avatarStyle,
        welcomeMessage: store.welcomeMessage,
        toneOfVoice: store.toneOfVoice,
        responseLanguage: store.responseLanguage,
        fallbackEmail: store.fallbackEmail,
        features: store.features,
        themeId: store.themeId,
        accentColor: store.accentColor,
        widgetPosition: store.widgetPosition,
        borderRadius: store.borderRadius,
        fontStyle: store.fontStyle,
      });

      setBotId(res.data.botId);
      setStep(6); // Move to completion screen
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate bot. Please try again.';
      setGenerationError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Theme & Customization</h2>
        <p className="text-muted-foreground">Select a starting theme and fine-tune to match your brand perfectly.</p>
      </div>

      <div className="space-y-8 flex-1 overflow-y-auto pb-4 custom-scrollbar pr-2">
        {/* Theme Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {THEMES.map((theme) => {
              const isSelected = themeId === theme.id;
              return (
                <div 
                  key={theme.id}
                  onClick={() => {
                    setField('themeId', theme.id);
                    setField('accentColor', theme.userBg); // auto-update accent
                  }}
                  className={cn(
                    "relative border rounded-xl p-3 cursor-pointer transition-all hover:scale-[1.02] flex flex-col gap-3 overflow-hidden",
                    isSelected ? "border-primary shadow-sm" : "border-border hover:border-primary/50"
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center z-10 shadow-sm">
                      <Check size={12} />
                    </div>
                  )}
                  {/* Mini Preview */}
                  <div 
                    className="h-28 rounded-lg flex flex-col gap-2 p-2"
                    style={{ backgroundColor: theme.chatBg }}
                  >
                    <div className="w-[70%] h-6 rounded-r-xl rounded-bl-xl opacity-80" style={{ backgroundColor: theme.botBg }}></div>
                    <div className="w-[60%] h-6 rounded-l-xl rounded-br-xl self-end" style={{ backgroundColor: isSelected ? accentColor : theme.userBg }}></div>
                    <div className="w-[50%] h-6 rounded-r-xl rounded-bl-xl opacity-80" style={{ backgroundColor: theme.botBg }}></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{theme.name}</h4>
                    <span className="text-xs text-muted-foreground">{theme.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Customization Controls */}
        <section className="bg-muted/30 border border-border rounded-xl p-6 space-y-6">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground/80">Fine-tuning</h3>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground flex items-center justify-between">
                <span>Override accent color</span>
                <span className="text-xs text-muted-foreground font-mono">{accentColor}</span>
              </label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  title="Accent Color"
                  value={accentColor}
                  onChange={(e) => setField('accentColor', e.target.value)}
                  className="w-11 h-11 rounded-lg border border-border cursor-pointer shrink-0"
                />
                <div className="flex-1 border border-border rounded-lg bg-background flex grid-cols-5 overflow-hidden">
                   {/* Preset dots */}
                   {['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'].map(color => (
                     <div 
                       key={color} 
                       className="flex-1 cursor-pointer hover:opacity-80 transition-opacity" 
                       style={{backgroundColor: color}}
                       onClick={() => setField('accentColor', color)}
                     />
                   ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Widget Position</label>
              <select 
                title="Widget Position"
                value={widgetPosition}
                onChange={(e) => setField('widgetPosition', e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary transition-all"
              >
                <option value="bottom-right">Bottom right</option>
                <option value="bottom-left">Bottom left</option>
                <option value="center">Center</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 flex justify-between">
                <span>Border Radius</span>
                <span className="text-xs text-muted-foreground">{borderRadius}px</span>
              </label>
              <input 
                title="Border Radius"
                type="range" 
                min="0" 
                max="24"
                value={borderRadius}
                onChange={(e) => setField('borderRadius', parseInt(e.target.value))}
                className="w-full h-11 accent-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Font Style</label>
              <select 
                title="Font Style"
                value={fontStyle}
                onChange={(e) => setField('fontStyle', e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary transition-all"
              >
                <option>System default</option>
                <option>Rounded (Nunito)</option>
                <option>Elegant (Playfair)</option>
                <option>Mono (JetBrains Mono)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Error message */}
        {generationError && (
          <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-2">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Generation failed</p>
              <p className="mt-1">{generationError}</p>
            </div>
          </div>
        )}

        {/* Deploy CTA internal section */}
        <div className="pt-6 pb-2 text-center">
           <h3 className="text-xl font-bold mb-1">Your chatbot is configured</h3>
           <p className="text-sm text-muted-foreground mb-6">Click below to generate and publish your bot.</p>
           <button 
             onClick={handleGenerateBot}
             disabled={isGenerating}
             className="w-full max-w-sm mx-auto h-14 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary-hover hover:scale-105 transition-all outline-none focus:ring-4 focus:ring-primary/30 flex items-center justify-center gap-2 disabled:opacity-80 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(139,92,246,0.39)]"
           >
             {isGenerating ? (
               <><Loader2 size={20} className="animate-spin" /> Building your bot...</>
             ) : (
               <>Generate my chatbot <ArrowRight size={20} /></>
             )}
           </button>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-border flex justify-start">
        <button 
          onClick={prevStep}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 text-muted-foreground h-11 px-4 hover:text-foreground font-medium transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>
    </div>
  );
}
