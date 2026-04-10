const service = require('./themes.service');

const getAll = async (req, res, next) => {
  try { res.json({ success: true, data: service.getAll() }); }
  catch (err) { next(err); }
};

const getByKey = async (req, res, next) => {
  try { res.json({ success: true, data: service.getByKey(req.params.themeKey) }); }
  catch (err) { next(err); }
};

module.exports = { getAll, getByKey };
