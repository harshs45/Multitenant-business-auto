const service = require('./features.service');

const getForType = async (req, res, next) => {
  try {
    const features = service.getForType(req.query.businessType);
    res.json({ success: true, data: features });
  } catch (err) { next(err); }
};

module.exports = { getForType };
