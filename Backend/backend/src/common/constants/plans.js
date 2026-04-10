/**
 * Monetization plans and their limits.
 */
const PLANS = {
  free: {
    key: 'free',
    label: 'Free',
    maxBots: 1,
    maxConversationsPerMonth: 100,
    maxMessages: 500,
    features: ['faq_answering', 'lead_collection'],
    price: 0,
  },
  starter: {
    key: 'starter',
    label: 'Starter',
    maxBots: 3,
    maxConversationsPerMonth: 1000,
    maxMessages: 5000,
    features: 'all',          // all features available
    price: 29,
  },
  growth: {
    key: 'growth',
    label: 'Growth',
    maxBots: 10,
    maxConversationsPerMonth: 10000,
    maxMessages: 50000,
    features: 'all',
    price: 79,
  },
  enterprise: {
    key: 'enterprise',
    label: 'Enterprise',
    maxBots: -1,               // unlimited
    maxConversationsPerMonth: -1,
    maxMessages: -1,
    features: 'all',
    price: null,               // custom pricing
  },
};

const PLAN_KEYS = Object.keys(PLANS);

module.exports = { PLANS, PLAN_KEYS };
