const service = require('./bots.service');
const generateService = require('./bot-generation.service');

const create = async (req, res, next) => {
  try {
    const bot = await service.create(req.user.id, req.body);
    res.status(201).json({ success: true, data: bot });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const bot = await service.getById(req.params.id, req.user.id);
    res.json({ success: true, data: bot });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const bot = await service.update(req.params.id, req.user.id, req.body);
    res.json({ success: true, data: bot });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id, req.user.id);
    res.json({ success: true, message: 'Bot deleted' });
  } catch (err) { next(err); }
};

const updateBusinessBasics = async (req, res, next) => {
  try {
    const bot = await service.updateBusinessBasics(req.params.id, req.user.id, req.body);
    res.json({ success: true, data: bot });
  } catch (err) { next(err); }
};

const updateAudienceConfig = async (req, res, next) => {
  try {
    const config = await service.updateAudienceConfig(req.params.id, req.user.id, req.body);
    res.json({ success: true, data: config });
  } catch (err) { next(err); }
};

const updateIdentity = async (req, res, next) => {
  try {
    const bot = await service.updateIdentity(req.params.id, req.user.id, req.body);
    res.json({ success: true, data: bot });
  } catch (err) { next(err); }
};

const updateFeatures = async (req, res, next) => {
  try {
    const features = await service.updateFeatures(req.params.id, req.user.id, req.body);
    res.json({ success: true, data: features });
  } catch (err) { next(err); }
};

const updateTheme = async (req, res, next) => {
  try {
    const theme = await service.updateTheme(req.params.id, req.user.id, req.body);
    res.json({ success: true, data: theme });
  } catch (err) { next(err); }
};

const publish = async (req, res, next) => {
  try {
    const bot = await service.publish(req.params.id, req.user.id);
    res.json({ success: true, data: bot });
  } catch (err) { next(err); }
};

const preview = async (req, res, next) => {
  try {
    const data = await service.preview(req.params.id, req.user.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const generate = async (req, res, next) => {
  try {
    const result = await generateService.generateBotTx(req.user.id, req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) { next(err); }
};

module.exports = {
  create, getById, update, remove,
  updateBusinessBasics, updateAudienceConfig, updateIdentity,
  updateFeatures, updateTheme, publish, preview, generate
};
