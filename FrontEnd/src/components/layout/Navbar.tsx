import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Moon, Sun, LogOut, User } from "lucide-react";
import { useTheme } from "../theme-provider";
import { useAuthStore } from "../../store/authStore";
import { HashLink } from "react-router-hash-link";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 inset-x-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-950 flex items-center justify-center text-primary-foreground group-hover:scale-105 transition-transform">
            <MessageSquare size={18} />
          </div>
          <span className="font-semibold text-lg tracking-tight">BotForge</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground hover:[&>a]:text-foreground transition-colors">
            <HashLink smooth to="/#features">Features</HashLink>
            <HashLink smooth to="/#themes">Themes</HashLink>
            <HashLink smooth to="/#pricing">Pricing</HashLink>
          </div>

          <div className="flex items-center gap-3 border-l border-border pl-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                  <User size={16} />
                  <span className="font-medium text-foreground max-w-[120px] truncate">
                    {user?.name || user?.email}
                  </span>
                </div>
                <Link
                  to="/build"
                  className="bg-blue-950 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-950-hover transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-muted-foreground hover:text-red-400 rounded-full hover:bg-muted transition-colors"
                  title="Sign out"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-950 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-950-hover transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
