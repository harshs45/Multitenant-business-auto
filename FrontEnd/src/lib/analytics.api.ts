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
  sessionId: string;  // ← this line must be present
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

// Raw response from backend getHistory endpoint
interface ConversationHistoryResponse {
  success: boolean;
  data: {
    id: string;
    sessionId: string;
    status: string;
    messages: Message[];
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
 * Backend returns a conversation object with nested messages array.
 */
export async function getConversationHistory(widgetKey: string, sessionId: string): Promise<{ success: boolean; data: Message[] }> {
  const res = await request<ConversationHistoryResponse>(`/chat/${widgetKey}/history/${sessionId}`);
  return {
    success: res.success,
    data: res.data?.messages || [],
  };
}