const { body, param } = require('express-validator');
const { BUSINESS_TYPE_KEYS } = require('../../common/constants');

const createRules = [
  body('name').trim().notEmpty().withMessage('Business name is required').isLength({ max: 150 }),
  body('businessType').isIn(BUSINESS_TYPE_KEYS).withMessage(`Must be one of: ${BUSINESS_TYPE_KEYS.join(', ')}`),
  body('description').optional().isString(),
  body('website').optional().isURL().withMessage('Must be a valid URL'),
];

const updateRules = [
  param('id').isUUID().withMessage('Invalid business ID'),
  body('name').optional().trim().isLength({ min: 1, max: 150 }),
  body('description').optional().isString(),
  body('website').optional().isURL(),
];

module.exports = { createRules, updateRules };
