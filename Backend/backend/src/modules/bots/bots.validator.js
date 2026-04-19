const { body, param } = require('express-validator');
const { TONES, LANGUAGES, AVATAR_STYLES } = require('../../common/constants/tones');

const createRules = [
  body('businessId').isUUID().withMessage('Valid business ID is required'),
  body('name').optional().trim().isLength({ max: 100 }),
  body('businessDescription').optional().isString(),
];

const idParam = [param('id').isUUID().withMessage('Invalid bot ID')];

const identityRules = [
  ...idParam,
  body('botName').optional().trim().isLength({ min: 1, max: 100 }),
  body('avatarStyle').optional().isIn(AVATAR_STYLES),
  body('avatarUrl').optional().isURL(),
  body('welcomeMessage').optional().isString(),
  body('tone').optional().isIn(TONES),
  body('responseLanguage').optional().isIn(LANGUAGES),
  body('fallbackEmail').optional().isEmail(),
];

const featuresRules = [
  ...idParam,
  body('features').isArray({ min: 0 }).withMessage('Features must be an array'),
  body('features.*').isString(),
];

const themeRules = [
  ...idParam,
  body('themeKey').notEmpty().withMessage('Theme key is required'),
  body('customPrimaryColor').optional().matches(/^#[0-9A-Fa-f]{6}$/).withMessage('Must be a valid hex color'),
  body('widgetPosition').optional().isIn(['bottom-right', 'bottom-left', 'center']),
  body('customCss').optional().isString(),
  body('borderRadius').optional().isInt({ min: 0, max: 50 }).withMessage('Border radius must be between 0 and 50'),
  body('fontStyle').optional().isString().isLength({ max: 50 }),
];

module.exports = { createRules, idParam, identityRules, featuresRules, themeRules };
