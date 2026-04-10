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
const AppError = require('../../common/errors/AppError');

const router = Router();
router.use(authenticate);

const notImplemented = (_req, _res, next) => {
  next(new AppError('Knowledge Base module is under development', 501));
};

router.get('/:botId/documents',   notImplemented);
router.post('/:botId/documents',  notImplemented);
router.delete('/:botId/documents/:docId', notImplemented);
router.post('/:botId/ingest-url', notImplemented);

module.exports = router;
