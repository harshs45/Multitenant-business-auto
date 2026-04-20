const { KnowledgeBaseFAQ, KnowledgeBaseDocument, Bot, Business } = require('../../models');
const AppError = require('../../common/errors/AppError');
const { regeneratePrompt } = require('../bots/prompt.service');
const logger = require('../../common/utils/logger');

/**
 * Fire-and-forget helper to regenerate bot prompt without blocking the API.
 */
const safeRegeneratePrompt = async (botId) => {
  try {
    await regeneratePrompt(botId);
    logger.info(`Prompt regenerated for bot ${botId}`);
  } catch (error) {
    logger.error(`Prompt regeneration failed for bot ${botId}`, {
      message: error.message,
      stack: error.stack,
    });
  }
};

/**
 * Verify bot ownership by checking if the bot belongs to a business owned by the user.
 */
const verifyBotOwnership = async (botId, userId) => {
  const bot = await Bot.findOne({
    where: { id: botId },
    include: [{
      model: Business,
      as: 'business',
      where: { userId }
    }]
  });

  if (!bot) {
    throw new AppError('Unauthorized: You do not own this bot or it does not exist', 403);
  }
  return bot;
};

/* ─── FAQs ─────────────────────────────────────────────── */

const getFAQs = async (botId, userId) => {
  await verifyBotOwnership(botId, userId);
  return KnowledgeBaseFAQ.findAll({
    where: { botId },
    order: [['createdAt', 'DESC']]
  });
};

const createFAQ = async (botId, userId, data) => {
  await verifyBotOwnership(botId, userId);
  const faq = await KnowledgeBaseFAQ.create({
    botId,
    question: data.question,
    answer: data.answer
  });

  // Trigger prompt regeneration (safe, async)
  safeRegeneratePrompt(botId);

  return faq;
};

const updateFAQ = async (botId, userId, faqId, data) => {
  await verifyBotOwnership(botId, userId);
  const faq = await KnowledgeBaseFAQ.findOne({ where: { id: faqId, botId } });
  if (!faq) throw AppError.notFound('FAQ not found');

  await faq.update({
    question: data.question,
    answer: data.answer
  });

  // Trigger prompt regeneration (safe, async)
  safeRegeneratePrompt(botId);

  return faq;
};

const deleteFAQ = async (botId, userId, faqId) => {
  await verifyBotOwnership(botId, userId);
  const faq = await KnowledgeBaseFAQ.findOne({ where: { id: faqId, botId } });
  if (!faq) throw AppError.notFound('FAQ not found');
  await faq.destroy();

  // Trigger prompt regeneration (safe, async)
  safeRegeneratePrompt(botId);

  return { success: true };
};

/* ─── Documents ────────────────────────────────────────── */

const getDocuments = async (botId, userId) => {
  await verifyBotOwnership(botId, userId);
  return KnowledgeBaseDocument.findAll({
    where: { botId },
    order: [['createdAt', 'DESC']]
  });
};

const createDocument = async (botId, userId, data) => {
  await verifyBotOwnership(botId, userId);
  // data contains: fileName, fileType, fileSize, content (extracted text)
  return KnowledgeBaseDocument.create({
    botId,
    fileName: data.fileName,
    fileType: data.fileType,
    fileSize: data.fileSize,
    content: data.content || null
  });
};

const deleteDocument = async (botId, userId, documentId) => {
  await verifyBotOwnership(botId, userId);
  const doc = await KnowledgeBaseDocument.findOne({ where: { id: documentId, botId } });
  if (!doc) throw AppError.notFound('Document not found');
  await doc.destroy();
  return { success: true };
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
