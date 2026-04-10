/**
 * LLM provider abstraction.
 *
 * Supports: mock (default), openai, anthropic.
 * When LLM_PROVIDER=mock or no API key is configured, returns a simulated response.
 * Real integrations are integration-ready — just supply the API key via env.
 */
const secrets = require('../../config/secrets');

/* ─── Mock Provider ─────────────────────────────────────── */
const mockComplete = async (systemPrompt, messages) => {
  const lastMsg = messages[messages.length - 1]?.content || '';

  // Basic intent detection for demo purposes
  if (/help|human|agent|speak.*person/i.test(lastMsg)) {
    return {
      content: "I'd be happy to connect you with a human agent. Let me initiate a handoff for you. 🙋",
      metadata: { provider: 'mock', intent: 'handoff' },
    };
  }

  if (/contact|email|phone|name|reach/i.test(lastMsg)) {
    return {
      content: "I'd love to help you further! Could you share your name and email so our team can follow up? 📧",
      metadata: { provider: 'mock', intent: 'lead_capture' },
    };
  }

  return {
    content: `Thank you for your message! I'm your AI assistant and I'm here to help. Regarding "${lastMsg.slice(0, 80)}..." — let me look into that for you. Is there anything specific you'd like to know?`,
    metadata: { provider: 'mock', intent: 'general' },
  };
};

/* ─── OpenAI Provider ───────────────────────────────────── */
const openaiComplete = async (systemPrompt, messages) => {
  const apiKey = secrets.openaiApiKey();
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: secrets.openaiModel(),
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${response.status} - ${err.error?.message || 'Unknown'}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    metadata: {
      provider: 'openai',
      model: data.model,
      usage: data.usage,
    },
  };
};

/* ─── Anthropic Provider ────────────────────────────────── */
const anthropicComplete = async (systemPrompt, messages) => {
  const apiKey = secrets.anthropicApiKey();
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not configured');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: secrets.anthropicModel(),
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Anthropic API error: ${response.status} - ${err.error?.message || 'Unknown'}`);
  }

  const data = await response.json();
  return {
    content: data.content[0].text,
    metadata: {
      provider: 'anthropic',
      model: data.model,
      usage: data.usage,
    },
  };
};

/* ─── Gemini Provider ───────────────────────────────────── */
const geminiComplete = async (systemPrompt, messages) => {
  const apiKey = secrets.geminiApiKey();
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const modelString = secrets.geminiModel();
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelString}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${response.status} - ${err.error?.message || 'Unknown'}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  return {
    content,
    metadata: {
      provider: 'gemini',
      model: modelString,
      usage: data.usageMetadata || {},
    },
  };
};

/* ─── Provider Router ───────────────────────────────────── */
const complete = async (systemPrompt, messages) => {
  const provider = secrets.llmProvider();

  switch (provider) {
    case 'openai':
      return openaiComplete(systemPrompt, messages);
    case 'anthropic':
      return anthropicComplete(systemPrompt, messages);
    case 'gemini':
      return geminiComplete(systemPrompt, messages);
    case 'mock':
    default:
      return mockComplete(systemPrompt, messages);
  }
};

module.exports = { complete };
