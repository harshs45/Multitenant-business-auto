const { body, param } = require('express-validator');

const sessionRules = [
  param('publicKey').notEmpty(),
  body('sessionId').optional().isString(),
  body('visitorId').optional().isString(),
];

const messageRules = [
  param('publicKey').notEmpty(),
  body('sessionId').notEmpty().withMessage('sessionId is required'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }),
];

const handoffRules = [
  param('publicKey').notEmpty(),
  body('sessionId').notEmpty().withMessage('sessionId is required'),
  body('reason').optional().isString(),
];

const leadRules = [
  param('publicKey').notEmpty(),
  body('sessionId').notEmpty().withMessage('sessionId is required'),
  body('email').optional().isEmail().withMessage('Valid email required'),
  body('name').optional().trim().isLength({ max: 150 }),
  body('phone').optional().trim().isLength({ max: 30 }),
  body('company').optional().trim().isLength({ max: 200 }),
];

module.exports = { sessionRules, messageRules, handoffRules, leadRules };
