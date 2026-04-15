import { request } from './api';

export interface FAQ {
  id: string;
  botId: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface KBDocument {
  id: string;
  botId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KBResponse<T> {
  success: boolean;
  data: T;
}

/* ─── FAQs ─────────────────────────────────────────────── */

export async function getFAQs(botId: string): Promise<KBResponse<FAQ[]>> {
  return request<KBResponse<FAQ[]>>(`/knowledge-base/${botId}/faqs`);
}

export async function createFAQ(
  botId: string, 
  data: { question: string; answer: string }
): Promise<KBResponse<FAQ>> {
  return request<KBResponse<FAQ>>(`/knowledge-base/${botId}/faqs`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteFAQ(botId: string, faqId: string): Promise<KBResponse<null>> {
  return request<KBResponse<null>>(`/knowledge-base/${botId}/faqs/${faqId}`, {
    method: 'DELETE',
  });
}

/* ─── Documents ────────────────────────────────────────── */

export async function getDocuments(botId: string): Promise<KBResponse<KBDocument[]>> {
  return request<KBResponse<KBDocument[]>>(`/knowledge-base/${botId}/documents`);
}

export async function createDocument(
  botId: string, 
  data: { fileName: string; fileType: string; fileSize: number; content?: string }
): Promise<KBResponse<KBDocument>> {
  return request<KBResponse<KBDocument>>(`/knowledge-base/${botId}/documents`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteDocument(botId: string, documentId: string): Promise<KBResponse<null>> {
  return request<KBResponse<null>>(`/knowledge-base/${botId}/documents/${documentId}`, {
    method: 'DELETE',
  });
}
