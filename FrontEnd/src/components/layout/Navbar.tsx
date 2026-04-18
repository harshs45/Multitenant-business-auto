// import { Link, useNavigate } from "react-router-dom";
// import { MessageSquare, Moon, Sun, LogOut, User } from "lucide-react";
// import { useTheme } from "../theme-provider";
// import { useAuthStore } from "../../store/authStore";

// export function Navbar() {
//   const { theme, setTheme } = useTheme();
//   const { isAuthenticated, user, logout } = useAuthStore();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
//     e.preventDefault();
//     const el = document.querySelector(hash);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth" });
//     } else {
//       navigate(`/${hash}`);
//     }
//   };

//   return (
//     <nav className="fixed top-0 inset-x-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-50">
//       <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2 group">
//           <div className="w-8 h-8 rounded-lg bg-blue-950 flex items-center justify-center text-primary-foreground group-hover:scale-105 transition-transform">
//             <MessageSquare size={18} />
//           </div>
//           <span className="font-semibold text-lg tracking-tight">BotForge</span>
//         </Link>
        
//         <div className="flex items-center gap-6">
//           <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground hover:[&>a]:text-foreground transition-colors">
//             <a href="/#features" onClick={(e) => handleHashLink(e, "#features")}>Features</a>
//             <a href="/#themes" onClick={(e) => handleHashLink(e, "#themes")}>Themes</a>
//             <a href="/#pricing" onClick={(e) => handleHashLink(e, "#pricing")}>Pricing</a>
//           </div>

//           <div className="flex items-center gap-3 border-l border-border pl-4">
//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
//               aria-label="Toggle theme"
//             >
//               {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//             </button>

//             {isAuthenticated ? (
//               <>
//                 <Link
//                   to="/dashboard/profile"
//                   className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
//                 >
//                   <User size={16} className="group-hover:text-primary transition-colors" />
//                   <span className="font-medium text-foreground max-w-[120px] truncate">
//                     {user?.name || user?.email}
//                   </span>
//                 </Link>
//                 <Link
//                   to="/dashboard"
//                   className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
//                 >
//                   My Bots
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 text-muted-foreground hover:text-red-400 rounded-full hover:bg-muted transition-colors"
//                   title="Sign out"
//                 >
//                   <LogOut size={18} />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   Sign in
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="bg-blue-950 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-950-hover transition-colors"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Moon, Sun, LogOut, User, Menu, X } from "lucide-react";
import { useTheme } from "../theme-provider";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/${hash}`);
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-950 flex items-center justify-center text-primary-foreground group-hover:scale-105 transition-transform">
            <MessageSquare size={18} />
          </div>
          <span className="font-semibold text-lg tracking-tight">BotForge</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground hover:[&>a]:text-foreground transition-colors">
            <a href="/#features" onClick={(e) => handleHashLink(e, "#features")}>Features</a>
            <a href="/#themes" onClick={(e) => handleHashLink(e, "#themes")}>Themes</a>
            <a href="/#pricing" onClick={(e) => handleHashLink(e, "#pricing")}>Pricing</a>
          </div>

          <div className="flex items-center gap-3 border-l border-border pl-4">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard/profile"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <User size={16} />
                  <span className="max-w-[120px] truncate">
                    {user?.name || user?.email}
                  </span>
                </Link>

                <Link
                  to="/dashboard"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm"
                >
                  My Bots
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 hover:text-red-400 rounded-full"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm">Sign in</Link>
                <Link
                  to="/signup"
                  className="bg-blue-950 text-primary-foreground px-4 py-2 rounded-full text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 py-4 space-y-4">
          
          <a href="/#features" onClick={(e) => handleHashLink(e, "#features")} className="block">Features</a>
          <a href="/#themes" onClick={(e) => handleHashLink(e, "#themes")} className="block">Themes</a>
          <a href="/#pricing" onClick={(e) => handleHashLink(e, "#pricing")} className="block">Pricing</a>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {isAuthenticated ? (
            <div className="space-y-3">
              <Link to="/dashboard/profile" className="block">
                {user?.name || user?.email}
              </Link>
              <Link to="/dashboard" className="block font-medium">
                My Bots
              </Link>
              <button onClick={handleLogout} className="text-red-400">
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link to="/login" className="block">Sign in</Link>
              <Link to="/signup" className="block font-medium">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}