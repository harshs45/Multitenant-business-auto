import { create } from 'zustand';

export type BusinessType = 'E-commerce' | 'SaaS' | 'Healthcare' | 'Restaurant' | 'Real Estate' | 'Education' | 'Finance' | 'Agency';

interface BuilderState {
  activeStep: number;
  completedSteps: number[];
  
  // Step 1
  businessName: string;
  websiteUrl: string;
  businessType: BusinessType | '';
  businessDescription: string;
  
  // Step 2 (Adaptive fields stored generally, UI handles specific rendering)
  adaptiveFields: Record<string, string | string[]>;
  supportEmail: string;
  businessHours: string;
  faqTopics: string[];
  
  // Step 3
  botName: string;
  avatarStyle: string;
  welcomeMessage: string;
  toneOfVoice: string;
  responseLanguage: string;
  fallbackEmail: string;
  
  // Step 4
  features: Record<string, boolean>;
  
  // Step 5
  themeId: string;
  accentColor: string;
  widgetPosition: string;
  borderRadius: number;
  fontStyle: string;
  
  // API result
  botId: string | null;
  publicKey: string | null;
  generationError: string | null;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setField: (field: keyof Omit<BuilderState, 'setField' | 'nextStep' | 'prevStep' | 'setStep' | 'setBotId' | 'setGenerationError'>, value: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAdaptiveField: (key: string, value: any) => void;
  toggleFeature: (featureId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  setBotId: (id: string, publicKey: string) => void;
  setGenerationError: (error: string | null) => void;
}

export const useWizardStore = create<BuilderState>((set) => ({
  activeStep: 0,
  completedSteps: [],
  
  businessName: '',
  websiteUrl: '',
  businessType: '',
  businessDescription: '',
  
  adaptiveFields: {},
  supportEmail: '',
  businessHours: '9am - 5pm, Mon-Fri',
  faqTopics: [],
  
  botName: '',
  avatarStyle: 'Robot',
  welcomeMessage: 'Hi there! How can I help you today?',
  toneOfVoice: 'Professional',
  responseLanguage: 'English',
  fallbackEmail: '',
  
  features: {
    'human-handoff': true,
    'lead-collection': false,
    'offline-message': true,
  },
  
  themeId: 'midnight',
  accentColor: '#8B5CF6',
  widgetPosition: 'bottom-right',
  borderRadius: 12,
  fontStyle: 'system',

  botId: null,
  publicKey: null,
  generationError: null,

  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  
  setAdaptiveField: (key, value) => set((state) => ({
    adaptiveFields: { ...state.adaptiveFields, [key]: value }
  })),
  
  toggleFeature: (featureId) => set((state) => ({
    features: { ...state.features, [featureId]: !state.features[featureId] }
  })),
  
  nextStep: () => set((state) => {
    if (state.activeStep < 5) {
      const next = state.activeStep + 1;
      const completed = state.completedSteps.includes(state.activeStep) 
        ? state.completedSteps 
        : [...state.completedSteps, state.activeStep];
      return { activeStep: next, completedSteps: completed };
    }
    return state;
  }),
  
  prevStep: () => set((state) => {
    if (state.activeStep > 0) {
      return { activeStep: state.activeStep - 1 };
    }
    return state;
  }),
  
  setStep: (step) => set({ activeStep: step }),
  setBotId: (id, publicKey) => set({ botId: id, publicKey }),
  setGenerationError: (error) => set({ generationError: error }),
}));
