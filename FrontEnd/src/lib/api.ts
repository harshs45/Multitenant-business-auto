import { API_BASE_URL } from '../config/api';

const API_BASE = API_BASE_URL;

/* ─── Token helpers ─────────────────────────────────────── */

export function getToken(): string | null {
  return localStorage.getItem('bf_token');
}

export function setToken(token: string): void {
  localStorage.setItem('bf_token', token);
}

export function clearToken(): void {
  localStorage.removeItem('bf_token');
  localStorage.removeItem('bf_refresh_token');
}

export function setRefreshToken(token: string): void {
  localStorage.setItem('bf_refresh_token', token);
}

/* ─── Generic fetch wrapper ─────────────────────────────── */

export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const json = await res.json();

  if (!res.ok) {
    const message =
      json?.error?.message ||
      json?.errors?.[0]?.msg ||
      `Request failed (${res.status})`;
    throw new Error(message);
  }

  return json;
}

/* ─── Auth API ──────────────────────────────────────────── */

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      status: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface MeResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      status: string;
    };
  };
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getMe(): Promise<MeResponse> {
  return request<MeResponse>('/auth/me');
}

/* ─── User Profile API ────────────────────────────────────── */

export async function updateProfile(data: { name: string }): Promise<MeResponse> {
  return request<MeResponse>('/users/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/* ─── Bot Generate API ──────────────────────────────────── */

export interface GenerateBotPayload {
  businessName: string;
  websiteUrl: string;
  businessType: string;
  businessDescription: string;
  supportEmail: string;
  businessHours: string;
  adaptiveFields: Record<string, string | string[]>;
  faqTopics: string[];
  botName: string;
  avatarStyle: string;
  welcomeMessage: string;
  toneOfVoice: string;
  responseLanguage: string;
  fallbackEmail: string;
  features: Record<string, boolean>;
  themeId: string;
  accentColor: string;
  widgetPosition: string;
  borderRadius: number;
  fontStyle: string;
}

export interface GenerateBotResponse {
  success: boolean;
  data: {
    botId: string;
    botName: string;
    apiKey: string;        // ← was publicKey
    embedScript: string;   // ← add this too
    businessId: string;
    businessName: string;
    themeKey: string;
    widgetPosition: string;
    accentColor: string | null;
    isPublished: boolean;
    publishedAt: string;
    status: string;        // ← add this too
  };
}

export async function generateBot(
  payload: GenerateBotPayload,
): Promise<GenerateBotResponse> {
  return request<GenerateBotResponse>('/bots/generate', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/* ─── Analytics API ─────────────────────────────────────── */

export interface DailyUsage {
  eventType: string;
  eventDate: string;
  total: number;
}

export interface AnalyticsOverview {
  botId: string;
  botName: string;
  totalConversations: number;
  totalMessages: number;
  totalLeads: number;
  totalHandoffs: number;
  dailyUsage: DailyUsage[];
}

export interface AnalyticsOverviewResponse {
  success: boolean;
  data: AnalyticsOverview;
}

export async function getAnalyticsOverview(
  botId: string,
): Promise<AnalyticsOverviewResponse> {
  return request<AnalyticsOverviewResponse>(`/analytics/bots/${botId}/overview`);
}
