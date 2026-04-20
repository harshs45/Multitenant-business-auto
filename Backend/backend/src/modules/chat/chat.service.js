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

const createSession = async (publicKey, data) => {
  const bot = await resolveBot(publicKey);
  await checkConversationLimit(bot.businessId);

  const sessionId = data.sessionId || uuidv4();

  const existing = await Conversation.findOne({ where: { sessionId } });
  if (existing) return existing;

  const conversation = await Conversation.create({
    id: uuidv4(),
    botId: bot.id,
    sessionId,
    visitorId: data.visitorId || null,
    metadata: data.metadata || null,
  });

  await logUsage(bot.businessId, bot.id, 'conversation_started');

  return conversation;
};

const sendMessage = async (publicKey, data) => {
  const bot = await resolveBot(publicKey);

  const conversation = await Conversation.findOne({
    where: { sessionId: data.sessionId, botId: bot.id },
  });

  if (!conversation) throw AppError.notFound('Chat session not found');
  if (conversation.status !== 'active') {
    throw AppError.badRequest('This conversation has ended');
  }

  await Message.create({
    id: uuidv4(),
    conversationId: conversation.id,
    role: 'user',
    content: data.message,
  });

  const history = await Message.findAll({
    where: { conversationId: conversation.id },
    order: [['createdAt', 'ASC']],
    limit: 20,
  });

  const llmResponse = await llm.complete
  console.log('--- BOT DEBUG ---');
console.log('Bot ID:', bot?.id);
console.log('Bot Name:', bot?.name);
console.log('systemPrompt type:', typeof bot?.systemPrompt);
console.log('systemPrompt exists:', !!bot?.systemPrompt);
console.log('systemPrompt preview:', bot?.systemPrompt?.slice(0, 200));

const finalSystemPrompt = bot?.systemPrompt || 'You are a helpful assistant.';
console.log('FINAL PROMPT USED:', finalSystemPrompt.slice(0, 200)); 
  
  (
    
    bot.systemPrompt || 'You are a helpful assistant.',
    

    history.map((m) => ({ role: m.role, content: m.content }))
    
  );

  const assistantMsg = await Message.create({
    id: uuidv4(),
    conversationId: conversation.id,
    role: 'assistant',
    content: llmResponse.content,
    metadata: llmResponse.metadata,
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