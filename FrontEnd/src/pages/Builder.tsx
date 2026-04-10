import { useWizardStore } from "../store/wizardStore";
import { WizardProgress } from "../components/builder/WizardProgress";
import { ChatPreview } from "../components/builder/ChatPreview";
import { Step1Business } from "../components/builder/steps/Step1Business";
import { Step2Audience } from "../components/builder/steps/Step2Audience";
import { Step3Identity } from "../components/builder/steps/Step3Identity";
import { Step4Features } from "../components/builder/steps/Step4Features";
import { Step5Theme } from "../components/builder/steps/Step5Theme";
import { CompletionScreen } from "../components/builder/CompletionScreen";
import { Navbar } from "../components/layout/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export default function Builder() {
  const activeStep = useWizardStore((state) => state.activeStep);
  const shouldReduceMotion = useReducedMotion();

  const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeInOut" as const };
  const variants = shouldReduceMotion 
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: (direction: number) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
        animate: { x: 0, opacity: 1 },
        exit: (direction: number) => ({ x: direction < 0 ? 30 : -30, opacity: 0 }),
      };

  const isCompleted = activeStep === 6; // Step 6 is Completion Screen

  return (
    <div className="min-h-screen flex flex-col bg-muted/20 font-sans">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-24 pb-12 flex items-start gap-8 flex-col lg:flex-row">
        
        {/* Left Form Panel */}
        <div className="w-full lg:w-3/5 bg-background border border-border shadow-sm rounded-2xl p-6 md:p-8 flex flex-col relative min-h-[600px]">
          {!isCompleted && <WizardProgress />}
          
          <div className="flex-1 mt-8 relative">
            <AnimatePresence mode="wait" custom={1}>
              {activeStep === 0 && (
                <motion.div key="step0" custom={1} variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
                  <Step1Business />
                </motion.div>
              )}
              {activeStep === 1 && (
                <motion.div key="step1" custom={1} variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
                  <Step2Audience />
                </motion.div>
              )}
              {activeStep === 2 && (
                <motion.div key="step2" custom={1} variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
                  <Step3Identity />
                </motion.div>
              )}
              {activeStep === 3 && (
                <motion.div key="step3" custom={1} variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
                  <Step4Features />
                </motion.div>
              )}
              {activeStep === 4 && (
                <motion.div key="step4" custom={1} variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
                  <Step5Theme />
                </motion.div>
              )}
              {activeStep === 5 && (
                // Step 5 is generating loading state, we'll handle this in Step 5 button click itself or here. Let's make 5 the final state wrapper, but wait, the prompt says Step 5 has the deploy CTA.
                // When they click Deploy, activeStep becomes 6.
                null
              )}
              {activeStep === 6 && (
                <motion.div key="step6" custom={1} variants={variants} initial="initial" animate="animate" exit="exit" transition={transition}>
                  <CompletionScreen />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Preview Panel (Sticky) */}
        {!isCompleted && (
          <div className="w-full lg:w-2/5 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)]">
            <ChatPreview />
          </div>
        )}
      </div>
    </div>
  );
}
