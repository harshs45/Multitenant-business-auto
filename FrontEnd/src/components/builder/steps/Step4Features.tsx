import { useWizardStore } from "../../../store/wizardStore";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";

const UNIVERSAL_FEATURES = [
  { id: 'human-handoff', label: 'Human handoff', desc: 'Escalate complex queries to a live agent' },
  { id: 'lead-collection', label: 'Lead collection', desc: 'Capture visitor name, email, and phone number' },
  { id: 'offline-message', label: 'Offline message', desc: 'Send an email when no agent is available' },
];

const DYNAMIC_FEATURES: Record<string, {id: string, label: string, desc: string}[]> = {
  'E-commerce': [
    { id: 'order-tracking', label: 'Order Tracking', desc: 'Allow customers to check order status' },
    { id: 'cart-recovery', label: 'Cart Recovery', desc: 'Send reminders for abandoned carts' },
    { id: 'product-rec', label: 'Product Recommendations', desc: 'Suggest items based on chat history' },
  ],
  'Healthcare': [
    { id: 'apt-booking', label: 'Appointment Booking', desc: 'Schedule visits directly in chat' },
    { id: 'rx-refill', label: 'Prescription Refills', desc: 'Automate refill requests securely' },
    { id: 'symptom-check', label: 'Basic Symptom Checker', desc: 'Triage patients before routing' },
  ],
  'SaaS': [
    { id: 'kb-integration', label: 'Knowledge Base', desc: 'Auto-reply with help articles' },
    { id: 'bug-report', label: 'Bug Reporting', desc: 'Capture logs and reproduction steps' },
    { id: 'upgrade-prompt', label: 'Smart Upgrades', desc: 'Detect intent to upgrade plans' },
  ],
  'Restaurant': [
    { id: 'reservations', label: 'Table Reservations', desc: 'Book tables via chat' },
    { id: 'menu-queries', label: 'Menu & Allergens', desc: 'Answer ingredient questions instantly' },
    { id: 'delivery-status', label: 'Delivery Tracking', desc: 'Real-time updates on food orders' },
  ],
  'Real Estate': [
    { id: 'property-search', label: 'Property Search', desc: 'Filter listings via conversation' },
    { id: 'schedule-viewing', label: 'Schedule Viewing', desc: 'Book tours for specific properties' },
    { id: 'mortgage-calc', label: 'Mortgage Calculator', desc: 'Quick estimates inline' },
  ],
  'Finance': [
    { id: 'account-balance', label: 'Balance Inquiry', desc: 'Securely check account status' },
    { id: 'loan-app', label: 'Loan Pre-qualification', desc: 'Gather initial application data' },
    { id: 'fraud-report', label: 'Fraud Reporting', desc: 'High-priority escalation flow' },
  ],
  'Education': [
    { id: 'course-enroll', label: 'Course Enrollment', desc: 'Guide students through signup' },
    { id: 'progress', label: 'Progress Tracking', desc: 'Check assignment status' },
    { id: 'faq-tutor', label: 'Tutor QA', desc: 'Basic academic question answering' },
  ],
  'Agency': [
    { id: 'request-quote', label: 'Request a Quote', desc: 'Gather project requirements' },
    { id: 'portfolio', label: 'Portfolio Search', desc: 'Showcase relevant past work' },
    { id: 'consultation', label: 'Consultation Booking', desc: 'Schedule initial intro calls' },
  ]
};

const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
  <button 
    title="Toggle Feature"
    onClick={onChange}
    className={cn(
      "w-11 h-6 rounded-full flex items-center transition-colors px-1",
      checked ? "bg-primary" : "bg-muted-foreground/30"
    )}
  >
    <div className={cn(
      "w-4 h-4 rounded-full bg-white shadow-sm transition-transform", 
      checked ? "translate-x-5" : "translate-x-0"
    )} />
  </button>
);

export function Step4Features() {
  const { businessType, features, toggleFeature, nextStep, prevStep } = useWizardStore();

  const businessFeatures = businessType && DYNAMIC_FEATURES[businessType] 
    ? DYNAMIC_FEATURES[businessType] 
    : DYNAMIC_FEATURES['SaaS']; // Fallback

  const allFeatures = [...businessFeatures, ...UNIVERSAL_FEATURES];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Features & Capabilities</h2>
        <p className="text-muted-foreground">Toggle the specific powers you want your chatbot to have.</p>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pb-4 custom-scrollbar pr-2">
        {allFeatures.map((feat, index) => (
          <motion.div
            key={feat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="flex items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors shadow-sm"
          >
            <div>
              <h4 className="font-semibold text-sm mb-1">{feat.label}</h4>
              <p className="text-xs text-muted-foreground">{feat.desc}</p>
            </div>
            <Toggle 
              checked={!!features[feat.id]} 
              onChange={() => toggleFeature(feat.id)} 
            />
          </motion.div>
        ))}
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
