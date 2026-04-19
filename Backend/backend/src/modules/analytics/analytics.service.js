const { Op, fn, col, literal } = require('sequelize');
const { Bot, Business, Conversation, Message, Lead, HandoffRequest, UsageLog } = require('../../models');
const AppError = require('../../common/errors/AppError');
const { paginate, paginatedResponseV2 } = require('../../common/utils/pagination');

const verifyBotOwnership = async (botId, userId) => {
  const bot = await Bot.findByPk(botId, {
    include: [{ model: Business, as: 'business' }],
  });
  if (!bot) throw AppError.notFound('Bot not found');
  if (bot.business.userId !== userId) throw AppError.forbidden('Access denied');
  return bot;
};

/**
 * Overview metrics for a bot.
 */
const getOverview = async (botId, userId) => {
  const bot = await verifyBotOwnership(botId, userId);

  const [totalConversations, totalMessages, totalLeads, totalHandoffs] = await Promise.all([
    Conversation.count({ where: { botId: bot.id } }),
    Message.count({
      include: [{ model: Conversation, as: 'conversation', where: { botId: bot.id }, attributes: [] }],
    }),
    Lead.count({ where: { botId: bot.id } }),
    HandoffRequest.count({ where: { botId: bot.id } }),
  ]);

  // Usage by day (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const dailyUsage = await UsageLog.findAll({
    where: {
      botId: bot.id,
      eventDate: { [Op.gte]: thirtyDaysAgo.toISOString().split('T')[0] },
    },
    attributes: ['eventType', 'eventDate', [fn('SUM', col('count')), 'total']],
    group: ['eventType', 'eventDate'],
    order: [['eventDate', 'ASC']],
    raw: true,
  });

  return {
    botId: bot.id,
    botName: bot.botName || bot.name,
    totalConversations,
    totalMessages,
    totalLeads,
    totalHandoffs,
    dailyUsage,
  };
};

/**
 * Paginated conversations for a bot.
 */
const getConversations = async (botId, userId, query) => {
  const bot = await verifyBotOwnership(botId, userId);
  const { page, limit, offset } = paginate(query);

  const where = { botId: bot.id };
  if (query.status) where.status = query.status;

  const { count, rows } = await Conversation.findAndCountAll({
    where,
    include: [
      { model: Lead, as: 'lead' },
      { model: HandoffRequest, as: 'handoffRequest' },
    ],
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return paginatedResponseV2(rows, count, { page, limit });
};

/**
 * Paginated leads for a bot.
 */
const getLeads = async (botId, userId, query) => {
  const bot = await verifyBotOwnership(botId, userId);
  const { page, limit, offset } = paginate(query);

  const { count, rows } = await Lead.findAndCountAll({
    where: { botId: bot.id },
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return paginatedResponseV2(rows, count, { page, limit });
};

module.exports = { getOverview, getConversations, getLeads };

