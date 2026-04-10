import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { MessageSquare, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
  const { register, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (password !== confirmPw) {
      setLocalError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters');
      return;
    }

    try {
      await register(name, email, password);
      navigate('/build');
    } catch {
      // error already set in store
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-background border border-border rounded-2xl shadow-lg p-8"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
            <MessageSquare size={22} />
          </div>
          <span className="text-2xl font-bold tracking-tight">BotForge</span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Create your account</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Start building AI chatbots in minutes
        </p>

        {displayError && (
          <div
            className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            role="alert"
          >
            {displayError}
            <button
              onClick={() => { setLocalError(''); clearError(); }}
              className="ml-2 text-xs underline hover:no-underline"
            >
              dismiss
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium mb-1.5">
              Full name
            </label>
            <input
              id="signup-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full h-11 px-4 rounded-lg bg-muted/30 border border-border outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium mb-1.5">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 px-4 rounded-lg bg-muted/30 border border-border outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPw ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 chars, include a number"
                className="w-full h-11 px-4 pr-11 rounded-lg bg-muted/30 border border-border outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="signup-confirm" className="block text-sm font-medium mb-1.5">
              Confirm password
            </label>
            <input
              id="signup-confirm"
              type="password"
              required
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-4 rounded-lg bg-muted/30 border border-border outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-all outline-none focus:ring-4 focus:ring-primary/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(139,92,246,0.39)]"
          >
            {isLoading ? (
              <><Loader2 size={18} className="animate-spin" /> Creating account...</>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
