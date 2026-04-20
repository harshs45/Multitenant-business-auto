const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const {
  EmbedToken,
  Bot,
  Business,
  Conversation,
  Message,
  Lead,
  HandoffRequest,
  UsageLog,
  Subscription,
} = require('../../models');
const AppError = require('../../common/errors/AppError');
const { PLANS } = require('../../common/constants/plans');
const llm = require('./llm.service');

/* ─── Helpers ───────────────────────────────────────────── */

const resolveBot = async (publicKey) => {
  const embedToken = await EmbedToken.findOne({
    where: {
      publicKey,
      isActive: true,
    },
    include: [
      {
        model: Bot,
        as: 'bot',
        required: true,
        where: {
          widgetActive: true,
          isPublished: true,
        },
        include: [
          {
            model: Business,
            as: 'business',
          },
        ],
      },
    ],
  });

  if (!embedToken || !embedToken.bot) {
    throw AppError.notFound('Invalid or inactive widget key');
  }

  return embedToken.bot;
};

const checkConversationLimit = async (businessId) => {
  const sub = await Subscription.findOne({ where: { businessId } });
  if (!sub) return;

  const plan = PLANS[sub.planKey];
  if (!plan || plan.maxConversationsPerMonth === -1) return;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const count = await UsageLog.sum('count', {
    where: {
      businessId,
      eventType: 'conversation_started',
      eventDate: { [Op.gte]: startOfMonth },
    },
  });

  if ((count || 0) >= plan.maxConversationsPerMonth) {
    throw AppError.tooMany('Monthly conversation limit reached for this plan');
  }
};

const logUsage = async (businessId, botId, eventType) => {
  const today = new Date().toISOString().split('T')[0];

  const [log] = await UsageLog.findOrCreate({
    where: { businessId, botId, eventType, eventDate: today },
    defaults: {
      id: uuidv4(),
      businessId,
      botId,
      eventType,
      eventDate: today,
      count: 0,
    },
  });

  log.count += 1;
  await log.save();
};

/* ─── Public Chat API ───────────────────────────────────── */

const createSession = async (publicKey, data = {}) => {
  try {
    console.log('CREATE SESSION HIT');
    console.log('publicKey:', publicKey);
    console.log('data:', data);

    const bot = await resolveBot(publicKey);
    console.log('resolved bot id:', bot?.id);
    console.log('resolved businessId:', bot?.businessId);

    await checkConversationLimit(bot.businessId);
    console.log('conversation limit check passed');

    const sessionId = data.sessionId || uuidv4();
    console.log('sessionId to use:', sessionId);

    const existing = await Conversation.findOne({ where: { sessionId } });
    console.log('existing session found:', !!existing);

    if (existing) return existing;

    const conversation = await Conversation.create({
      id: uuidv4(),
      botId: bot.id,
      sessionId,
      visitorId: data.visitorId || null,
      metadata: data.metadata || null,
    });

    console.log('conversation created:', conversation?.id);

    await logUsage(bot.businessId, bot.id, 'conversation_started');
    console.log('usage logged');

    return conversation;
  } catch (err) {
    console.error('CREATE SESSION ERROR:', err);
    console.error('CREATE SESSION STACK:', err.stack);
    throw err;
  }
};

const sendMessage = async (publicKey, data = {}) => {
  console.log('FULL SYSTEM PROMPT:\n', finalSystemPrompt);
  const bot = await resolveBot(publicKey);

  const conversation = await Conversation.findOne({
    where: { sessionId: data.sessionId, botId: bot.id },
  });

  if (!conversation) throw AppError.notFound('Chat session not found');
  if (conversation.status !== 'active') {
    throw AppError.badRequest('This conversation has ended');
  }

  const userContent = data.message || data.content || null;

  if (!userContent) {
    throw AppError.badRequest('Message is required');
  }

  await Message.create({
    id: uuidv4(),
    conversationId: conversation.id,
    role: 'user',
    content: userContent,
  });

  const history = await Message.findAll({
    where: { conversationId: conversation.id },
    order: [['createdAt', 'ASC']],
    limit: 20,
  });

  console.log('--- BOT DEBUG ---');
  console.log('Bot ID:', bot?.id);
  console.log('Bot Name:', bot?.name);
  console.log('systemPrompt exists:', !!bot?.systemPrompt);

  const finalSystemPrompt =
    bot?.systemPrompt || 'You are a helpful assistant.';

  console.log('FINAL PROMPT:', finalSystemPrompt.slice(0, 150));

  const llmResponse = await llm.complete(
    finalSystemPrompt,
    history.map((m) => ({
      role: m.role,
      content: m.content,
    }))
  );

  console.log('RAW LLM RESPONSE:', llmResponse);

  const assistantContent =
    typeof llmResponse === 'string'
      ? llmResponse
      : llmResponse?.content || llmResponse?.text || null;

  if (!assistantContent) {
    console.error('Bad LLM response:', llmResponse);
    throw new Error('LLM returned empty response');
  }

  const assistantMsg = await Message.create({
    id: uuidv4(),
    conversationId: conversation.id,
    role: 'assistant',
    content: assistantContent,
    metadata:
      typeof llmResponse === 'object' && llmResponse?.metadata
        ? llmResponse.metadata
        : null,
  });

  conversation.messageCount = (conversation.messageCount || 0) + 2;
  await conversation.save();

  await logUsage(bot.businessId, bot.id, 'message_sent');

  return {
    sessionId: conversation.sessionId,
    reply: assistantMsg.content,
    metadata: assistantMsg.metadata,
  };
};

const getHistory = async (publicKey, sessionId) => {
  const bot = await resolveBot(publicKey);

  const conversation = await Conversation.findOne({
    where: { sessionId, botId: bot.id },
    include: [
      {
        model: Message,
        as: 'messages',
      },
    ],
  });

  if (!conversation) throw AppError.notFound('Chat session not found');

  return conversation;
};

const requestHandoff = async (publicKey, data) => {
  const bot = await resolveBot(publicKey);

  const conversation = await Conversation.findOne({
    where: { sessionId: data.sessionId, botId: bot.id },
  });

  if (!conversation) throw AppError.notFound('Chat session not found');

  const handoff = await HandoffRequest.create({
    id: uuidv4(),
    conversationId: conversation.id,
    botId: bot.id,
    reason: data.reason || 'User requested human assistance',
  });

  conversation.status = 'handed_off';
  await conversation.save();

  await logUsage(bot.businessId, bot.id, 'handoff_requested');

  return handoff;
};

const captureLead = async (publicKey, data) => {
  const bot = await resolveBot(publicKey);

  const conversation = await Conversation.findOne({
    where: { sessionId: data.sessionId, botId: bot.id },
  });

  if (!conversation) throw AppError.notFound('Chat session not found');

  const lead = await Lead.create({
    id: uuidv4(),
    conversationId: conversation.id,
    botId: bot.id,
    name: data.name || null,
    email: data.email || null,
    phone: data.phone || null,
    company: data.company || null,
    notes: data.notes || null,
    source: 'chat',
  });

  await logUsage(bot.businessId, bot.id, 'lead_captured');

  return lead;
};

module.exports = {
  createSession,
  sendMessage,
  getHistory,
  requestHandoff,
  captureLead,
};