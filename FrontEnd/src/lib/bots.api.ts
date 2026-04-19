import { request } from './api';

export interface Bot {
  id: string;
  businessId: string;
  name: string;
  botName: string;
  businessDescription?: string;
  apiKey?: string;
  status: string;
  setupComplete: boolean;
  isPublished: boolean;
  updatedAt: string;
  createdAt: string;

  // Embed tokens (public widget keys)
  embedTokens?: Array<{ id: string; publicKey: string; isActive: boolean }>;

  // Identity / Core Personality fields
  welcomeMessage?: string;
  toneOfVoice?: string;
  responseLanguage?: string;
  fallbackEmail?: string;
}

export interface Business {
  id: string;
  userId: string;
  name: string;
}

export interface ListResponse<T> {
  success: boolean;
  data: T[] | { items: T[]; total: number };
  meta?: { total: number; page: number; limit: number; totalPages: number };
}

export interface SingleResponse<T> {
  success: boolean;
  data: T;
}

/* ─────────────────── Bot API Calls ─────────────────────── */

export async function listBusinesses(): Promise<ListResponse<Business>> {
  return request<ListResponse<Business>>('/businesses');
}

export async function listBusinessBots(businessId: string): Promise<ListResponse<Bot>> {
  return request<ListResponse<Bot>>(`/businesses/${businessId}/bots`);
}

export async function getBotById(botId: string): Promise<SingleResponse<Bot>> {
  return request<SingleResponse<Bot>>(`/bots/${botId}`);
}

export interface BotIdentity {
  botName: string;
  welcomeMessage: string;
  toneOfVoice: string;
  responseLanguage: string;
  fallbackEmail: string;
}

export interface BotTheme {
  id?: string;
  themeKey: string;
  customPrimaryColor: string | null;
  widgetPosition: 'bottom-right' | 'bottom-left' | 'center';
  customCss?: string | null;
  borderRadius?: number;
  fontStyle?: string;
}

/**
 * Updates a bot's identity configuration (name, tone, logic).
 */
export async function updateBotIdentity(botId: string, data: BotIdentity): Promise<SingleResponse<Bot>> {
  return request<SingleResponse<Bot>>(`/bots/${botId}/identity`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * Updates a bot's appearance and theme configuration.
 */
export async function updateBotTheme(botId: string, data: Partial<BotTheme>): Promise<SingleResponse<BotTheme>> {
  return request<SingleResponse<BotTheme>>(`/bots/${botId}/theme`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * Permanently deletes a bot.
 */
export async function deleteBot(botId: string): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(`/bots/${botId}`, {
    method: 'DELETE',
  });
}

/**
 * Helper to extract array from either old or new response structure.
 */
function extractItems<T>(data: T[] | { items: T[]; total: number }): T[] {
  if (Array.isArray(data)) return data;
  return data.items || [];
}

/**
 * Aggregates all bots across all user businesses.
 */
export async function listAllBots(): Promise<Bot[]> {
  try {
    const bizRes = await listBusinesses();
    if (!bizRes.success || !bizRes.data) return [];

    const businesses = extractItems<Business>(bizRes.data);
    if (businesses.length === 0) return [];

    const botPromises = businesses.map(biz => listBusinessBots(biz.id));
    const botResults = await Promise.all(botPromises);

    return botResults.flatMap(res => {
      if (!res.success || !res.data) return [];
      return extractItems<Bot>(res.data);
    });

  } catch (error) {
    console.error('Failed to list all bots:', error);
    return [];
  }
}