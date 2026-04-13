const service = require('./embed.service');

const createToken = async (req, res, next) => {
  try {
    const token = await service.createToken(req.params.id, req.user.id, req.body);
    res.status(201).json({ success: true, data: token });
  } catch (err) { next(err); }
};

const getSnippet = async (req, res, next) => {
  try {
    const data = await service.getSnippet(req.params.id, req.user.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getWidgetConfig = async (req, res, next) => {
  try {
    const config = await service.getWidgetConfig(req.params.key);
    res.json({ success: true, data: config });
  } catch (err) { next(err); }
};

module.exports = { createToken, getSnippet, getWidgetConfig };
