import { request } from './api';

export interface Lead {
  id: string;
  botId: string;
  conversationId: string;
  name: string;
  email: string;
  metadata?: any;
  createdAt: string;
}

export interface Conversation {
  id: string;
  botId: string;
  status: 'active' | 'resolved' | 'handoff';
  userId?: string;
  metadata?: any;
  createdAt: string;
  lead?: Lead;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    total: number;
  };
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

/**
 * Fetches paginated leads for a specific bot.
 */
export async function listLeads(botId: string, page = 1, limit = 10): Promise<PaginatedResponse<Lead>> {
  return request<PaginatedResponse<Lead>>(`/analytics/bots/${botId}/leads?page=${page}&limit=${limit}`);
}

/**
 * Fetches paginated conversations for a specific bot.
 */
export async function listConversations(botId: string, page = 1, limit = 10): Promise<PaginatedResponse<Conversation>> {
  return request<PaginatedResponse<Conversation>>(`/analytics/bots/${botId}/conversations?page=${page}&limit=${limit}`);
}

/**
 * Fetches transcript history using a bot's Widget Key.
 * NOTE: This uses the widget history endpoint for stability.
 */
export async function getConversationHistory(widgetKey: string, sessionId: string): Promise<{ success: boolean; data: Message[] }> {
  return request<{ success: boolean; data: Message[] }>(`/chat/${widgetKey}/history/${sessionId}`);
}
