import { useWizardStore } from "../../store/wizardStore";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

const STEPS = [
  "Business",
  "Audience",
  "Identity",
  "Features",
  "Theme"
];

export function WizardProgress() {
  const { activeStep, completedSteps, setStep } = useWizardStore();

  return (
    <div className="relative mb-8">
      <div className="flex items-center justify-between relative z-10 text-xs sm:text-sm font-medium">
        {STEPS.map((label, index) => {
          const isCompleted = completedSteps.includes(index) || activeStep > index;
          const isActive = activeStep === index;
          const isClickable = isCompleted || isActive;
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center gap-2 relative cursor-pointer"
              onClick={() => isClickable && setStep(index)}
            >
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 bg-background",
                  isActive ? "border-primary text-primary shadow-sm" : 
                  isCompleted ? "border-primary bg-primary text-primary-foreground" : 
                  "border-border text-muted-foreground"
                )}
              >
                {isCompleted && !isActive ? <Check size={16} /> : <span>{index + 1}</span>}
              </div>
              <span className={cn(
                "hidden sm:block transition-colors",
                isActive ? "text-foreground font-semibold" : 
                isCompleted ? "text-foreground" : "text-muted-foreground"
              )}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Background lines */}
      <div className="absolute top-4 left-0 w-full h-[2px] bg-border -z-0 translate-y-[-50%] px-4">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-in-out" 
          style={{ width: `${(Math.min(activeStep, 4) / 4) * 100}%` }}
        />
      </div>
    </div>
  );
}
