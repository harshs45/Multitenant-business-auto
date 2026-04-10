import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Layout, Paintbrush, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <HeroSection />
        <SocialProof />
        <HowItWorks />
        <BusinessShowcase />
        <ThemeGallery />
        <FeaturesGrid />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 hidden md:block">
         {/* Decorative elements */}
         <div className="absolute top-20 right-[15%] w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob" />
         <div className="absolute top-40 right-[5%] w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles size={16} />
            <span>BotForge 2.0 is now live</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Build your business chatbot in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">minutes</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
            No code. No complexity. Just describe your business and BotForge generates a fully configured, branded AI chatbot — ready to deploy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/build" className="inline-flex justify-center items-center gap-2 bg-primary text-primary-foreground h-12 px-8 rounded-full font-medium hover:bg-primary-hover transition-all hover:scale-105">
              Start for free <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="inline-flex justify-center items-center gap-2 h-12 px-8 rounded-full font-medium border border-border hover:bg-muted transition-colors">
              See how it works
            </a>
          </div>
        </motion.div>

        {/* Animated mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          <div className="w-full max-w-sm bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col relative z-20 h-[500px]">
            <div className="h-16 bg-muted/50 border-b border-border flex items-center px-4 gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">BotForge AI</h3>
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
                </span>
              </div>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto bg-muted/10">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground"><Bot size={14}/></div>
                <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-none text-sm w-4/5">Hi! I'm ready to help your customers 24/7. What business are we building for?</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="flex gap-2 justify-end">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-none text-sm w-[70%]">We run an online coffee roast subscription.</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4 }} className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-primary-foreground"><Bot size={14}/></div>
                <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-none text-sm w-4/5">Perfect. I've configured your e-commerce flows, added cart recovery, and set a warm, energetic tone!</div>
              </motion.div>
            </div>
            <div className="p-3 border-t border-border bg-background">
              <div className="h-10 rounded-full border border-border bg-muted/30 px-4 flex items-center text-sm text-muted-foreground">Type your message...</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  const logos = ["Shopify", "Clinikk", "Notion", "Razorpay", "Zomato", "upGrad"];
  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-8">Trusted by 5,000+ businesses across 12 industries</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale">
          {logos.map(logo => (
            <div key={logo} className="text-xl font-bold font-serif tracking-tight flex items-center">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: <Layout className="text-primary"/>, title: "Describe your business", desc: "Select your industry and provide a few details." },
    { icon: <Paintbrush className="text-blue-500"/>, title: "Customize your bot", desc: "Choose your brand colors, tone, and features." },
    { icon: <Zap className="text-amber-500"/>, title: "Deploy in one click", desc: "Copy the embed snippet and paste it on your site." },
  ];
  return (
    <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">From zero to deployed in 3 steps</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Skip the complex flow builders. Our AI constructs the perfect conversational logic based strictly on your exact business type.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border -z-10" />
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex flex-col items-center text-center bg-background border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center border border-border mb-6">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">Step {i + 1}: {step.title}</h3>
            <p className="text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BusinessShowcase() {
  const types = ["E-commerce", "SaaS", "Healthcare", "Restaurant", "Real Estate", "Education", "Finance", "Agency"];
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
         <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Tailored for your industry</h2>
            <p className="text-muted-foreground text-lg">BotForge adapts its questions and conversational flows natively.</p>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {types.map((type, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="group relative h-32 bg-background border border-border rounded-xl p-4 flex flex-col justify-end overflow-hidden cursor-pointer"
              >
                 <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                 <span className="font-medium z-10">{type}</span>
              </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
}

function ThemeGallery() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your brand. Your chatbot.</h2>
        <p className="text-muted-foreground text-lg">Choose from 6 stunning curated themes, or inject your exact custom brand colors.</p>
      </div>
      <div className="flex overflow-x-auto pb-8 gap-6 snap-x">
         {/* Placeholder for themes */}
         {["Midnight Pro", "Emerald Fresh", "Sakura", "Ocean Breeze", "Slate Classic", "Warm Amber"].map((theme, i) => (
           <div key={i} className="flex-shrink-0 w-[280px] h-[360px] rounded-2xl border border-border bg-muted/50 snap-center flex items-center justify-center p-6 text-center">
              <span className="font-semibold">{theme}</span>
           </div>
         ))}
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const features = [
    { title: "Adaptive form", desc: "Questions that change based on your industry" },
    { title: "Tone selector", desc: "Set the personality: Professional to Witty" },
    { title: "Theme studio", desc: "6 curated themes + brand color override" },
    { title: "Smart features", desc: "Toggle capabilities specific to your business" },
    { title: "Multi-language", desc: "Serve customers in their native language" },
    { title: "One-click embed", desc: "Drop a JS snippet. Done." },
  ];
  return (
    <section id="features" className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Packed with everything you need</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-background border border-border rounded-xl p-6">
               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <ShieldCheck size={20} />
               </div>
               <h3 className="font-semibold mb-2">{f.title}</h3>
               <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-muted-foreground text-lg">Start for free. Scale when you grow.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {[{ name: "Free", price: "0", limit: "100" }, { name: "Starter", price: "999", limit: "1,000" }, { name: "Growth", price: "2,999", limit: "10,000", pop: true }, { name: "Enterprise", price: "Custom", limit: "Unlimited" }].map((tier, i) => (
          <div key={i} className={cn("p-6 rounded-2xl border flex flex-col", tier.pop ? "border-primary shadow-lg bg-primary/5" : "border-border bg-background")}>
            {tier.pop && <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Most Popular</div>}
            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
            <div className="mb-4"><span className="text-3xl font-bold">₹{tier.price}</span><span className="text-muted-foreground">/mo</span></div>
            <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
              <li>{tier.limit} conversations</li>
              <li>{tier.name === "Free" ? "1 bot" : "Multiple bots"}</li>
            </ul>
            <button className={cn("w-full py-2 rounded-full font-medium transition-colors", tier.pop ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "bg-muted text-foreground hover:bg-border")}>
              Choose {tier.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Loved by founders</h2>
        <div className="grid md:grid-cols-3 gap-6">
           {[{n: "Sarah Jenkins", r: "CEO, Blendy", q: "BotForge took our customer support from chaos to structured in exactly 4 minutes. Not an exaggeration."},
             {n: "Rahul M.", r: "Founder, Proptech", q: "We avoided hiring an external agency to build our chatbot. The real estate templates were spot on."},
             {n: "Elena K.", r: "Marketing Lead", q: "The branding customization is unmatched. Our chatbot looks like we spent $10k developing it from scratch."}].map((t, i) => (
             <motion.div key={i} whileHover={{ y: -5 }} className="bg-background border border-border p-6 rounded-2xl">
               <p className="text-muted-foreground mb-6">"{t.q}"</p>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                   {t.n.charAt(0)}
                 </div>
                 <div>
                   <h4 className="font-semibold text-sm">{t.n}</h4>
                   <p className="text-xs text-muted-foreground">{t.r}</p>
                 </div>
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How long does it take?", a: "Literally minutes. You fill out our 5-step wizard and you're done." },
    { q: "Do I need to know how to code?", a: "Not at all. We provide a simple JS snippet to copy-paste into your website." },
    { q: "Can I use my own brand colors?", a: "Yes, our Theme Studio allows full hex code customization." },
  ];
  return (
    <section className="py-24 max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-background border border-border rounded-xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between font-medium cursor-pointer">
              {faq.q}
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" width="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-24 bg-primary text-primary-foreground text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6">Ready to build your chatbot?</h2>
        <p className="text-primary-foreground/80 mb-8 text-lg">Join 5,000+ businesses delivering better customer experiences.</p>
        <Link to="/build" className="inline-flex justify-center items-center gap-2 bg-background text-foreground h-14 px-8 rounded-full font-bold hover:scale-105 transition-transform">
          Start building for free <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
