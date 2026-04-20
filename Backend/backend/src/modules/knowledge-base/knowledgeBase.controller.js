const service = require('./knowledgeBase.service');

const getFAQs = async (req, res, next) => {
  try {
    const data = await service.getFAQs(req.params.botId, req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const createFAQ = async (req, res, next) => {
  try {
    const data = await service.createFAQ(req.params.botId, req.user.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const updateFAQ = async (req, res, next) => {
  try {
    const data = await service.updateFAQ(req.params.botId, req.user.id, req.params.faqId, req.body);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const deleteFAQ = async (req, res, next) => {
  try {
    await service.deleteFAQ(req.params.botId, req.user.id, req.params.faqId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

const getDocuments = async (req, res, next) => {
  try {
    const data = await service.getDocuments(req.params.botId, req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const createDocument = async (req, res, next) => {
  try {
    const data = await service.createDocument(req.params.botId, req.user.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    await service.deleteDocument(req.params.botId, req.user.id, req.params.documentId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getDocuments,
  createDocument,
  deleteDocument
};
