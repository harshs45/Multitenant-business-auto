import { useState,useRef } from "react";
import { Link,useNavigate  } from "react-router-dom";
import { Eye, EyeOff, MessageSquare ,Moon, Sun} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../components/theme-provider";
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false); // REMOVED local loading



  const { theme, setTheme } = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearError();
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    clearError();

    if (!formData.email || !formData.password) {
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

const handleKeyDown = (e: any, nextRef?: any) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (nextRef) {
      nextRef.current?.focus();
    } else {
      handleSubmit(e); 
    }
  }
};
  return (
    
    <div className="min-h-screen bg-white dark:bg-[#0d1117] flex items-center justify-center px-4 py-12 transition-colors">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group absolute top-5 left-10">
        <div className="w-8 h-8 rounded-lg bg-blue-950 flex items-center justify-center text-white group-hover:scale-105 transition-transform ">
          <MessageSquare size={18} />
        </div>
        <span className="font-semibold text-lg tracking-tight">BotForge</span>
      </Link>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-6 right-6 px-4 py-2 rounded-lg text-sm font-medium border bg-white dark:bg-white/5 text-gray-700 dark:text-white border-gray-300 dark:border-white/10 shadow dark:shadow-none transition"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Background circles */}
      <div className="fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full border border-gray-300/40 dark:border-white/[0.06]" />
      <div className="fixed top-1/3 -right-32 w-[700px] h-[700px] rounded-full border border-gray-300/40 dark:border-white/[0.06]" />
      <div className="fixed bottom-[-200px] left-1/4 w-[600px] h-[600px] rounded-full border border-gray-300/40 dark:border-white/[0.06]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white hover:border-violet-500/30 transition rounded-2xl px-8 py-10 shadow-2xl">

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-1.5">
              Login to continue building chatbots
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Email */}
            <input
              ref={emailRef}
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              placeholder="Email"
              className="w-full h-11 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-white dark:placeholder:text-white/20 rounded-xl px-4 focus:ring-2 focus:ring-violet-500/40"
              autoComplete="off"
            />

            {/* Password */}
            <div className="relative">
              <input
                ref={passwordRef}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e)} 
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-11 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-white dark:placeholder:text-white/20 rounded-xl px-4 pr-10 focus:ring-2 focus:ring-violet-500/40"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 dark:text-white/40"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

{/* 
            <div className="text-center text-sm text-gray-400 dark:text-white/30">
              or
            </div> */}

            {/* Google
            <button
              type="button"
              className="w-full h-11 bg-gray-100 border border-gray-300 text-gray-700 dark:bg-white/[0.05] dark:border-white/[0.08] dark:text-white/70 rounded-xl"
            >
              Continue with Google
            </button> */}
            
            
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 dark:text-white/30 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-violet-500">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
  
}