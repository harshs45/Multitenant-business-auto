import { useState } from "react";
import { useWizardStore } from "../../../store/wizardStore";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export function Step2Audience() {
  const { 
    businessType, 
    adaptiveFields, 
    setAdaptiveField, 
    supportEmail, 
    businessHours, 
    faqTopics, 
    setField, 
    nextStep, 
    prevStep 
  } = useWizardStore();

  const [topicInput, setTopicInput] = useState("");
  const [tagInput, setTagInput] = useState(""); // For Real Estate / Agency tag inputs

  const renderAdaptiveFields = () => {
    switch (businessType) {
      case 'Healthcare':
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Patient Age Range</label>
              <select 
                title="Patient Age Range"
                value={adaptiveFields['ageRange'] as string || ''}
                onChange={(e) => setAdaptiveField('ageRange', e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary"
              >
                <option value="">Select range...</option>
                <option value="pediatrics">Pediatrics (0-18)</option>
                <option value="adults">Adults (18-65)</option>
                <option value="geriatrics">Geriatrics (65+)</option>
                <option value="all">All Ages</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Clinic Type</label>
              <select 
                title="Clinic Type"
                value={adaptiveFields['clinicType'] as string || ''}
                onChange={(e) => setAdaptiveField('clinicType', e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary"
              >
                <option value="">Select type...</option>
                <option value="general">General Practice</option>
                <option value="dental">Dental</option>
                <option value="specialist">Specialist</option>
              </select>
            </div>
          </div>
        );
      case 'E-commerce':
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Avg. Order Value</label>
              <select 
                title="Avg Order Value"
                value={adaptiveFields['aov'] as string || ''}
                onChange={(e) => setAdaptiveField('aov', e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary"
              >
                <option value="">Select AOV...</option>
                <option value="low">&lt;$50</option>
                <option value="mid">$50 - $200</option>
                <option value="high">$200+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Return Policy</label>
              <select 
                title="Return Policy"
                value={adaptiveFields['returnPolicy'] as string || ''}
                onChange={(e) => setAdaptiveField('returnPolicy', e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary"
              >
                <option value="">Select policy...</option>
                <option value="14days">14 Days</option>
                <option value="30days">30 Days</option>
                <option value="noreturns">No Returns</option>
              </select>
            </div>
          </div>
        );
      case 'Restaurant':
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Cuisine Type</label>
              <input 
                type="text" 
                placeholder="e.g. Italian, Vegan" 
                value={adaptiveFields['cuisine'] as string || ''}
                onChange={(e) => setAdaptiveField('cuisine', e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Seating Capacity</label>
              <input 
                type="number" 
                placeholder="e.g. 50" 
                value={adaptiveFields['capacity'] as string || ''}
                onChange={(e) => setAdaptiveField('capacity', e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary"
              />
            </div>
          </div>
        );
      case 'Real Estate':
      case 'Agency': {
        const tags = (adaptiveFields['tags'] as string[]) || [];
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium mb-1.5">
                {businessType === 'Real Estate' ? 'Property Types' : 'Services Offered'}
              </label>
              <div className="flex flex-wrap gap-2 mb-2 p-2 border border-border rounded-lg min-h-[44px] bg-background">
                {tags.map((tag, i) => (
                  <span key={i} className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                    {tag}
                    <button onClick={() => setAdaptiveField('tags', tags.filter((_, idx) => idx !== i))} className="hover:text-primary-hover"><X size={12}/></button>
                  </span>
                ))}
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && tagInput.trim()) {
                      e.preventDefault();
                      setAdaptiveField('tags', [...tags, tagInput.trim()]);
                      setTagInput("");
                    }
                  }}
                  placeholder="Type & press Enter"
                  className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                {businessType === 'Real Estate' ? 'Service Area' : 'Primary Industry'}
              </label>
              <input 
                type="text" 
                placeholder={businessType === 'Real Estate' ? "e.g. Downtown" : "e.g. Tech"} 
                value={adaptiveFields['area'] as string || ''}
                onChange={(e) => setAdaptiveField('area', e.target.value)}
                className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary"
              />
            </div>
          </div>
        );
      }
      // SaaS, Finance, Education omitted for brevity but they follow the same pattern
      default:
        return (
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Standard fields configured for {businessType || "your business"}.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Audience & Operations</h2>
        <p className="text-muted-foreground">Set up specifics for your {businessType?.toLowerCase() || 'business'} so the AI knows how to respond.</p>
      </div>

      <div className="space-y-8 flex-1 overflow-y-auto pb-4 custom-scrollbar pr-2">
        {/* Adaptive section */}
        <section>
           <h3 className="text-sm border-b border-border pb-2 mb-4 font-semibold text-foreground/80 uppercase tracking-wide">Industry specifics</h3>
           {renderAdaptiveFields()}
        </section>

        {/* Universal section */}
        <section>
          <h3 className="text-sm border-b border-border pb-2 mb-4 font-semibold text-foreground/80 uppercase tracking-wide">General Operations</h3>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
             <div>
               <label className="block text-sm font-medium mb-1.5">Support Email</label>
               <input 
                 type="email" 
                 placeholder="support@acme.com" 
                 value={supportEmail}
                 onChange={(e) => setField('supportEmail', e.target.value)}
                 className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary"
               />
             </div>
             <div>
               <label className="block text-sm font-medium mb-1.5">Business Hours</label>
               <select 
                 title="Business Hours"
                 value={businessHours}
                 onChange={(e) => setField('businessHours', e.target.value)}
                 className="w-full h-11 px-4 rounded-lg bg-background border border-border outline-none focus:border-primary"
               >
                 <option>9am - 5pm, Mon-Fri</option>
                 <option>24/7 Support</option>
                 <option>Custom</option>
               </select>
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">FAQ Topics (Type & press Enter)</label>
            <div className="flex flex-wrap gap-2 mb-2 p-2 border border-border rounded-lg min-h-[44px] bg-background">
              {faqTopics.map((topic, i) => (
                <span key={i} className="bg-muted text-foreground text-xs px-2.5 py-1 rounded-full flex items-center gap-1 border border-border">
                  {topic}
                  <button onClick={() => setField('faqTopics', faqTopics.filter((_, idx) => idx !== i))} className="hover:text-red-500"><X size={12}/></button>
                </span>
              ))}
              <input 
                type="text" 
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && topicInput.trim()) {
                    e.preventDefault();
                    if (!faqTopics.includes(topicInput.trim())) {
                      setField('faqTopics', [...faqTopics, topicInput.trim()]);
                    }
                    setTopicInput("");
                  }
                }}
                placeholder="e.g. Shipping, Returns"
                className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
              />
            </div>
          </div>
        </section>
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
