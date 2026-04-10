import { useWizardStore } from "../../../store/wizardStore";
import { ArrowRight, ShoppingCart, Cloud, Stethoscope, Utensils, Home, GraduationCap, Briefcase, Building } from "lucide-react";
import { cn } from "../../../lib/utils";

const BUSINESS_TYPES = [
  { id: 'E-commerce', label: 'E-commerce', icon: ShoppingCart },
  { id: 'SaaS', label: 'Software (SaaS)', icon: Cloud },
  { id: 'Healthcare', label: 'Healthcare', icon: Stethoscope },
  { id: 'Restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'Real Estate', label: 'Real Estate', icon: Home },
  { id: 'Education', label: 'Education', icon: GraduationCap },
  { id: 'Finance', label: 'Finance', icon: Building },
  { id: 'Agency', label: 'Agency', icon: Briefcase },
];

export function Step1Business() {
  const { businessName, websiteUrl, businessType, businessDescription, setField, nextStep } = useWizardStore();

  const isValid = businessName.trim().length > 0 && businessType !== '';

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Business Basics</h2>
        <p className="text-muted-foreground">Tell us about your business so we can tailor the AI.</p>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pb-4 custom-scrollbar pr-2">
        <div>
          <label className="block text-sm font-medium mb-1.5">Business Name <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            placeholder="e.g. Acme Corp" 
            value={businessName}
            onChange={(e) => setField('businessName', e.target.value)}
            className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>

        <div>
           <label className="block text-sm font-medium mb-1.5">Website URL</label>
           <input 
             type="url" 
             placeholder="https://acme.com" 
             value={websiteUrl}
             onChange={(e) => setField('websiteUrl', e.target.value)}
             className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
           />
        </div>

        <div>
           <label className="block text-sm font-medium mb-3">Business Type <span className="text-red-500">*</span></label>
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
             {BUSINESS_TYPES.map((type) => {
               const Icon = type.icon;
               const isSelected = businessType === type.id;
               return (
                 <div 
                   key={type.id}
                   onClick={() => setField('businessType', type.id)}
                   className={cn(
                     "border rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer transition-all hover:scale-[1.02]",
                     isSelected ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-border bg-background hover:bg-muted/50 text-foreground"
                   )}
                 >
                   <Icon size={24} className={isSelected ? "text-primary" : "text-muted-foreground"} />
                   <span className="text-sm font-medium text-center">{type.label}</span>
                 </div>
               );
             })}
           </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Business Description</label>
          <textarea 
            placeholder="Briefly describe what you do..." 
            value={businessDescription}
            onChange={(e) => setField('businessDescription', e.target.value)}
            className="w-full h-24 p-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
          />
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-border flex justify-end">
        <button 
          onClick={nextStep}
          disabled={!isValid}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground h-11 px-6 rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
