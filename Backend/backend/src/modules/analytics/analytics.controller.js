const service = require('./analytics.service');

const getOverview = async (req, res, next) => {
  try {
    const data = await service.getOverview(req.params.id, req.user.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getConversations = async (req, res, next) => {
  try {
    const result = await service.getConversations(req.params.id, req.user.id, req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const getLeads = async (req, res, next) => {
  try {
    const result = await service.getLeads(req.params.id, req.user.id, req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

module.exports = { getOverview, getConversations, getLeads };
