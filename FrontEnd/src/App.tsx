import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Builder from "./pages/Builder";
import Dashboard from "./pages/Dashboard";
import BotWorkspace from "./pages/BotWorkspace";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import KnowledgeBase from "./pages/KnowledgeBase";
import BotSettings from "./pages/BotSettings";
import Leads from "./pages/Leads";
import Conversations from "./pages/Conversations";
import Deployment from "./pages/Deployment";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

import ChatWidget from "./pages/ChatWidget";

function AppContent() {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/build"
        element={
          <ProtectedRoute>
            <Builder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/bots/:botId"
        element={
          <ProtectedRoute>
            <BotWorkspace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/bots/:botId/knowledge"
        element={
          <ProtectedRoute>
            <KnowledgeBase />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/bots/:botId/settings"
        element={
          <ProtectedRoute>
            <BotSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/bots/:botId/leads"
        element={
          <ProtectedRoute>
            <Leads />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/bots/:botId/conversations"
        element={
          <ProtectedRoute>
            <Conversations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/bots/:botId/deployment"
        element={
          <ProtectedRoute>
            <Deployment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      {/* Fallback for legacy /knowledge-base route (optional, but safer) */}
      <Route
        path="/knowledge-base"
        element={
          <ProtectedRoute>
            <KnowledgeBase />
          </ProtectedRoute>
        }
      />
      <Route path="/chat/:publicKey" element={<ChatWidget />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="botforge-theme">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
