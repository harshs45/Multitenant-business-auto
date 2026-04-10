/**
 * Supported business types and their metadata.
 */
const BUSINESS_TYPES = {
  ecommerce: {
    key: 'ecommerce',
    label: 'E-Commerce',
    description: 'Online retail, marketplaces, and D2C brands',
  },
  saas: {
    key: 'saas',
    label: 'SaaS',
    description: 'Software-as-a-Service and tech products',
  },
  healthcare: {
    key: 'healthcare',
    label: 'Healthcare',
    description: 'Clinics, hospitals, telehealth, and wellness',
  },
  restaurant: {
    key: 'restaurant',
    label: 'Restaurant',
    description: 'Restaurants, cafes, and food delivery',
  },
  real_estate: {
    key: 'real_estate',
    label: 'Real Estate',
    description: 'Property listings, brokers, and agencies',
  },
  education: {
    key: 'education',
    label: 'Education',
    description: 'Schools, universities, and edtech platforms',
  },
  finance: {
    key: 'finance',
    label: 'Finance',
    description: 'Banks, fintech, insurance, and investment',
  },
  creative_agency: {
    key: 'creative_agency',
    label: 'Creative Agency',
    description: 'Design, marketing, and advertising agencies',
  },
};

const BUSINESS_TYPE_KEYS = Object.keys(BUSINESS_TYPES);

module.exports = { BUSINESS_TYPES, BUSINESS_TYPE_KEYS };
