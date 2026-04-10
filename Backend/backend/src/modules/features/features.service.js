const { BUSINESS_TYPE_KEYS } = require('../../common/constants/businessTypes');
const { getFeaturesForType } = require('../../common/constants/features');
const AppError = require('../../common/errors/AppError');

const getForType = (businessType) => {
  if (!BUSINESS_TYPE_KEYS.includes(businessType)) {
    throw AppError.badRequest(`Invalid business type: ${businessType}`);
  }
  return getFeaturesForType(businessType);
};

module.exports = { getForType };
