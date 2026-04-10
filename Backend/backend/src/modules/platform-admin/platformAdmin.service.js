const { User, Business, Bot, Conversation, Lead, Subscription } = require('../../models');
const AppError = require('../../common/errors/AppError');

/**
 * Platform-wide overview (super admin only).
 */
const getOverview = async () => {
  const [totalUsers, totalBusinesses, totalBots, totalConversations, totalLeads] = await Promise.all([
    User.count(),
    Business.count(),
    Bot.count(),
    Conversation.count(),
    Lead.count(),
  ]);

  const activeSubscriptions = await Subscription.count({ where: { status: 'active' } });

  return {
    totalUsers,
    totalBusinesses,
    totalBots,
    totalConversations,
    totalLeads,
    activeSubscriptions,
  };
};

module.exports = { getOverview };
