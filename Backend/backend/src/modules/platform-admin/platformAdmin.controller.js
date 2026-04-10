const service = require('./platformAdmin.service');

const getOverview = async (req, res, next) => {
  try {
    const data = await service.getOverview();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

module.exports = { getOverview };
