const service = require('./billing.service');

const getPlans = async (req, res, next) => {
  try {
    res.json({ success: true, data: service.getPlans() });
  } catch (err) { next(err); }
};

const getSubscription = async (req, res, next) => {
  try {
    const sub = await service.getSubscription(req.user.id);
    res.json({ success: true, data: sub });
  } catch (err) { next(err); }
};

const handleWebhook = async (req, res, next) => {
  try {
    const result = await service.handleWebhook(req.body);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

module.exports = { getPlans, getSubscription, handleWebhook };
