const service = require('./chat.service');

const createSession = async (req, res, next) => {
  try {
    const session = await service.createSession(req.params.key, req.body);
    res.status(201).json({ success: true, data: session });
  } catch (err) { next(err); }
};

const sendMessage = async (req, res, next) => {
  try {
    const result = await service.sendMessage(req.params.key, req.body);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

const getHistory = async (req, res, next) => {
  try {
    const data = await service.getHistory(req.params.key, req.params.sessionId);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const requestHandoff = async (req, res, next) => {
  try {
    const handoff = await service.requestHandoff(req.params.key, req.body);
    res.status(201).json({ success: true, data: handoff });
  } catch (err) { next(err); }
};

const captureLead = async (req, res, next) => {
  try {
    const lead = await service.captureLead(req.params.key, req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (err) { next(err); }
};

module.exports = { createSession, sendMessage, getHistory, requestHandoff, captureLead };
