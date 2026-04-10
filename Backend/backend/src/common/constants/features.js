/**
 * Feature matrix: which features are available for each business type.
 * Universal features are available to ALL business types.
 */

const UNIVERSAL_FEATURES = [
  { key: 'human_handoff', label: 'Human Handoff', description: 'Transfer chat to a live agent' },
  { key: 'lead_collection', label: 'Lead Collection', description: 'Capture visitor contact info during chat' },
  { key: 'faq_answering', label: 'FAQ Answering', description: 'Answer frequently asked questions' },
];

const FEATURES_BY_TYPE = {
  ecommerce: [
    { key: 'order_tracking', label: 'Order Tracking', description: 'Help customers track order status' },
    { key: 'product_recommendations', label: 'Product Recommendations', description: 'Suggest products based on preferences' },
    { key: 'return_refund_help', label: 'Return & Refund Help', description: 'Guide customers through returns and refunds' },
    { key: 'cart_recovery', label: 'Cart Recovery', description: 'Remind users about abandoned carts' },
    { key: 'size_guide', label: 'Size Guide', description: 'Provide sizing information and recommendations' },
  ],
  saas: [
    { key: 'onboarding_guide', label: 'Onboarding Guide', description: 'Help new users get started' },
    { key: 'bug_reporting', label: 'Bug Reporting', description: 'Collect bug reports from users' },
    { key: 'feature_requests', label: 'Feature Requests', description: 'Capture user feature suggestions' },
    { key: 'billing_support', label: 'Billing Support', description: 'Answer billing and subscription questions' },
    { key: 'api_documentation', label: 'API Documentation', description: 'Provide API reference and examples' },
  ],
  healthcare: [
    { key: 'appointment_booking', label: 'Appointment Booking', description: 'Help patients book appointments' },
    { key: 'symptom_checker', label: 'Symptom Checker', description: 'Basic symptom assessment and guidance' },
    { key: 'medication_reminders', label: 'Medication Reminders', description: 'Send medication reminders' },
    { key: 'doctor_finder', label: 'Doctor Finder', description: 'Help find the right specialist' },
    { key: 'insurance_info', label: 'Insurance Info', description: 'Provide insurance and coverage details' },
  ],
  restaurant: [
    { key: 'table_reservations', label: 'Table Reservations', description: 'Book tables and manage reservations' },
    { key: 'menu_explorer', label: 'Menu Explorer', description: 'Browse menu items and prices' },
    { key: 'order_status', label: 'Order Status', description: 'Track takeout and delivery orders' },
    { key: 'special_offers', label: 'Special Offers', description: 'Show current promotions and deals' },
    { key: 'dietary_filters', label: 'Dietary Filters', description: 'Filter by dietary preferences' },
  ],
  real_estate: [
    { key: 'property_search', label: 'Property Search', description: 'Help find properties by criteria' },
    { key: 'schedule_viewing', label: 'Schedule Viewing', description: 'Book property viewings' },
    { key: 'mortgage_calculator', label: 'Mortgage Calculator', description: 'Estimate monthly payments' },
    { key: 'neighborhood_info', label: 'Neighborhood Info', description: 'Provide area details and amenities' },
    { key: 'agent_connect', label: 'Agent Connect', description: 'Connect with real estate agents' },
  ],
  education: [
    { key: 'course_catalog', label: 'Course Catalog', description: 'Browse available courses' },
    { key: 'admission_guidance', label: 'Admission Guidance', description: 'Guide applicants through admissions' },
    { key: 'schedule_info', label: 'Schedule Info', description: 'Provide class schedules and calendars' },
    { key: 'fee_structure', label: 'Fee Structure', description: 'Share tuition and fee details' },
    { key: 'campus_tour', label: 'Campus Tour', description: 'Virtual campus tour information' },
  ],
  finance: [
    { key: 'account_inquiry', label: 'Account Inquiry', description: 'Answer account balance and status questions' },
    { key: 'loan_calculator', label: 'Loan Calculator', description: 'Calculate loan EMI and eligibility' },
    { key: 'investment_info', label: 'Investment Info', description: 'Provide investment product details' },
    { key: 'fraud_reporting', label: 'Fraud Reporting', description: 'Report suspicious transactions' },
    { key: 'branch_locator', label: 'Branch Locator', description: 'Find nearby branches and ATMs' },
  ],
  creative_agency: [
    { key: 'portfolio_showcase', label: 'Portfolio Showcase', description: 'Show past work and case studies' },
    { key: 'project_inquiry', label: 'Project Inquiry', description: 'Capture project briefs from prospects' },
    { key: 'quote_request', label: 'Quote Request', description: 'Collect pricing request details' },
    { key: 'team_intro', label: 'Team Introduction', description: 'Introduce team members and expertise' },
    { key: 'process_explainer', label: 'Process Explainer', description: 'Explain agency workflow and process' },
  ],
};

/**
 * Returns the complete feature list for a given business type (type-specific + universal).
 */
const getFeaturesForType = (businessType) => {
  const typeFeatures = FEATURES_BY_TYPE[businessType] || [];
  return [...typeFeatures, ...UNIVERSAL_FEATURES];
};

/**
 * Returns all valid feature keys for a given business type.
 */
const getValidFeatureKeys = (businessType) => {
  return getFeaturesForType(businessType).map((f) => f.key);
};

/**
 * Validates that all provided feature keys are valid for the given business type.
 */
const validateFeatures = (businessType, featureKeys) => {
  const valid = getValidFeatureKeys(businessType);
  const invalid = featureKeys.filter((k) => !valid.includes(k));
  return { isValid: invalid.length === 0, invalidKeys: invalid };
};

module.exports = {
  UNIVERSAL_FEATURES,
  FEATURES_BY_TYPE,
  getFeaturesForType,
  getValidFeatureKeys,
  validateFeatures,
};
