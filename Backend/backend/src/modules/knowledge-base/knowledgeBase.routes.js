/**
 * Knowledge Base module — placeholder-ready structure.
 *
 * This module will eventually support:
 * - Uploading documents (PDF, DOCX, TXT) for RAG
 * - Ingesting FAQ content
 * - Indexing website pages
 * - Vector search for retrieval-augmented generation
 *
 * For now, it exposes stub endpoints that return 501 Not Implemented,
 * so the API contract is defined and frontend can integrate ahead of time.
 */
const { Router } = require('express');
const { authenticate } = require('../../common/middleware/auth');
const ctrl = require('./knowledgeBase.controller');

const router = Router();
router.use(authenticate);

// FAQs
router.get('/:botId/faqs', ctrl.getFAQs);
router.post('/:botId/faqs', ctrl.createFAQ);
router.delete('/:botId/faqs/:faqId', ctrl.deleteFAQ);

// Documents
router.get('/:botId/documents', ctrl.getDocuments);
router.post('/:botId/documents', ctrl.createDocument);
router.delete('/:botId/documents/:documentId', ctrl.deleteDocument);

module.exports = router;
