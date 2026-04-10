const { PLANS, PLAN_KEYS } = require('../../common/constants/plans');
const { Subscription, Business } = require('../../models');
const AppError = require('../../common/errors/AppError');

/**
 * Get all available plans.
 */
const getPlans = () => Object.values(PLANS);

/**
 * Get the active subscription for a business.
 */
const getSubscription = async (userId) => {
  const subscription = await Subscription.findOne({
    include: [{
      model: Business,
      as: 'business',
      where: { userId },
    }],
    order: [['createdAt', 'DESC']],
  });
  if (!subscription) throw AppError.notFound('No active subscription found');
  return subscription;
};

/**
 * Handle billing webhook (e.g. from Stripe).
 * This is a placeholder structure — integrate with your payment gateway.
 */
const handleWebhook = async (event) => {
  // Validate webhook signature (implement based on gateway)
  // const sig = req.headers['stripe-signature'];
  // const event = stripe.webhooks.constructEvent(req.body, sig, secret);

  switch (event.type) {
    case 'checkout.session.completed': {
      const data = event.data;
      const sub = await Subscription.findOne({
        where: { externalCustomerId: data.customer },
      });
      if (sub) {
        sub.planKey = data.planKey || sub.planKey;
        sub.status = 'active';
        sub.externalSubscriptionId = data.subscription;
        sub.currentPeriodStart = new Date(data.periodStart * 1000);
        sub.currentPeriodEnd = new Date(data.periodEnd * 1000);
        await sub.save();
      }
      break;
    }

    case 'customer.subscription.updated': {
      const data = event.data;
      const sub = await Subscription.findOne({
        where: { externalSubscriptionId: data.id },
      });
      if (sub) {
        sub.status = data.status === 'active' ? 'active' : data.status;
        sub.currentPeriodEnd = new Date(data.currentPeriodEnd * 1000);
        await sub.save();
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const data = event.data;
      const sub = await Subscription.findOne({
        where: { externalSubscriptionId: data.id },
      });
      if (sub) {
        sub.status = 'canceled';
        sub.planKey = 'free'; // Downgrade to free
        await sub.save();
      }
      break;
    }

    default:
      console.log(`Unhandled billing webhook event: ${event.type}`);
  }

  return { received: true };
};

module.exports = { getPlans, getSubscription, handleWebhook };
