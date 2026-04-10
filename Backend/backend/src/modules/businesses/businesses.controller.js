const service = require('./businesses.service');

const create = async (req, res, next) => {
  try {
    const business = await service.create(req.user.id, req.body);
    res.status(201).json({ success: true, data: business });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const business = await service.getById(req.params.id, req.user.id);
    res.json({ success: true, data: business });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const business = await service.update(req.params.id, req.user.id, req.body);
    res.json({ success: true, data: business });
  } catch (err) { next(err); }
};

const listBots = async (req, res, next) => {
  try {
    const result = await service.listBots(req.params.id, req.user.id, req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

const list = async (req, res, next) => {
  try {
    const result = await service.listForUser(req.user.id, req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

module.exports = { create, getById, update, listBots, list };
