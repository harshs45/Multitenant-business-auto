/**
 * Backend-driven adaptive form schema service.
 *
 * Returns dynamic form field definitions for steps 2 (audience & operations)
 * and step 4 (features & capabilities) based on the selected business type.
 */
const { BUSINESS_TYPES, BUSINESS_TYPE_KEYS } = require('../../common/constants/businessTypes');
const { getFeaturesForType } = require('../../common/constants/features');
const AppError = require('../../common/errors/AppError');

/* ─── Step 2: Audience & Operations (business-type-adaptive fields) ─────── */

const STEP_2_SCHEMAS = {
  ecommerce: {
    fields: [
      { key: 'productCategories', type: 'text', label: 'Main product categories', required: true },
      { key: 'shippingRegions', type: 'text', label: 'Shipping regions', required: false },
      { key: 'averageOrderValue', type: 'number', label: 'Average order value ($)', required: false },
      { key: 'returnPolicy', type: 'textarea', label: 'Return/refund policy summary', required: false },
    ],
  },
  saas: {
    fields: [
      { key: 'productName', type: 'text', label: 'Product / app name', required: true },
      { key: 'pricingModel', type: 'select', label: 'Pricing model', options: ['free', 'freemium', 'subscription', 'one-time'], required: false },
      { key: 'hasApi', type: 'boolean', label: 'Does your product have a public API?', required: false },
      { key: 'onboardingUrl', type: 'url', label: 'Link to onboarding / getting started', required: false },
    ],
  },
  healthcare: {
    fields: [
      { key: 'facilityType', type: 'select', label: 'Facility type', options: ['clinic', 'hospital', 'telehealth', 'pharmacy', 'wellness'], required: true },
      { key: 'specialties', type: 'text', label: 'Main specialties', required: false },
      { key: 'acceptsInsurance', type: 'boolean', label: 'Accepts insurance?', required: false },
      { key: 'emergencyContact', type: 'text', label: 'Emergency contact number', required: false },
    ],
  },
  restaurant: {
    fields: [
      { key: 'cuisineType', type: 'text', label: 'Cuisine type(s)', required: true },
      { key: 'hasDelivery', type: 'boolean', label: 'Offers delivery?', required: false },
      { key: 'hasTakeout', type: 'boolean', label: 'Offers takeout?', required: false },
      { key: 'menuUrl', type: 'url', label: 'Online menu URL', required: false },
      { key: 'reservationSystem', type: 'select', label: 'Reservation system', options: ['opentable', 'resy', 'internal', 'none'], required: false },
    ],
  },
  real_estate: {
    fields: [
      { key: 'propertyTypes', type: 'text', label: 'Property types (residential, commercial, etc.)', required: true },
      { key: 'serviceArea', type: 'text', label: 'Service area / city', required: false },
      { key: 'listingSource', type: 'text', label: 'MLS or listing site URL', required: false },
    ],
  },
  education: {
    fields: [
      { key: 'institutionType', type: 'select', label: 'Institution type', options: ['school', 'university', 'edtech', 'training_center'], required: true },
      { key: 'programs', type: 'text', label: 'Key programs or courses', required: false },
      { key: 'admissionUrl', type: 'url', label: 'Admissions page URL', required: false },
    ],
  },
  finance: {
    fields: [
      { key: 'serviceType', type: 'select', label: 'Service type', options: ['banking', 'insurance', 'investment', 'fintech', 'accounting'], required: true },
      { key: 'regulated', type: 'boolean', label: 'Is your business regulated?', required: false },
      { key: 'complianceNote', type: 'textarea', label: 'Compliance or disclaimer note', required: false },
    ],
  },
  creative_agency: {
    fields: [
      { key: 'services', type: 'text', label: 'Services offered (design, dev, marketing, etc.)', required: true },
      { key: 'portfolioUrl', type: 'url', label: 'Portfolio URL', required: false },
      { key: 'teamSize', type: 'number', label: 'Team size', required: false },
    ],
  },
};

/* ─── Common step 2 fields for ALL business types ───────────────────────── */
const COMMON_STEP_2 = [
  { key: 'targetAudience', type: 'text', label: 'Target audience', required: true },
  { key: 'ageRange', type: 'text', label: 'Typical customer age range', required: false },
  { key: 'operatingHours', type: 'text', label: 'Operating hours (e.g. 9-5 EST or 24/7)', required: false },
  { key: 'supportEmail', type: 'email', label: 'Support email', required: false },
  { key: 'timezone', type: 'text', label: 'Timezone', required: false },
];

/* ─── Step 4: Feature toggles ───────────────────────────────────────────── */
const getStep4Schema = (businessType) => {
  const features = getFeaturesForType(businessType);
  return {
    fields: features.map((f) => ({
      key: f.key,
      type: 'boolean',
      label: f.label,
      description: f.description,
      required: false,
      defaultValue: false,
    })),
  };
};

/* ─── Public API ────────────────────────────────────────────────────────── */

const getSchema = (businessType, step) => {
  if (!BUSINESS_TYPE_KEYS.includes(businessType)) {
    throw AppError.badRequest(`Invalid business type: ${businessType}`);
  }

  const stepNum = parseInt(step, 10);

  if (stepNum === 2) {
    const typeSpecific = STEP_2_SCHEMAS[businessType] || { fields: [] };
    return {
      step: 2,
      title: 'Audience & Operations',
      businessType,
      fields: [...COMMON_STEP_2, ...typeSpecific.fields],
    };
  }

  if (stepNum === 4) {
    return {
      step: 4,
      title: 'Features & Capabilities',
      businessType,
      ...getStep4Schema(businessType),
    };
  }

  throw AppError.badRequest('Form schema is only dynamic for steps 2 and 4');
};

module.exports = { getSchema };
