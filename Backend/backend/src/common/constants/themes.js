/**
 * Predefined themes for the chat widget.
 */
const THEMES = {
  midnight_pro: {
    key: 'midnight_pro',
    label: 'Midnight Pro',
    primaryColor: '#1a1a2e',
    secondaryColor: '#16213e',
    accentColor: '#0f3460',
    textColor: '#e4e4e4',
    bgColor: '#0d1117',
    fontFamily: 'Inter, sans-serif',
  },
  emerald_fresh: {
    key: 'emerald_fresh',
    label: 'Emerald Fresh',
    primaryColor: '#064e3b',
    secondaryColor: '#065f46',
    accentColor: '#10b981',
    textColor: '#f0fdf4',
    bgColor: '#ecfdf5',
    fontFamily: 'DM Sans, sans-serif',
  },
  sakura: {
    key: 'sakura',
    label: 'Sakura',
    primaryColor: '#9d174d',
    secondaryColor: '#be185d',
    accentColor: '#f472b6',
    textColor: '#1f2937',
    bgColor: '#fdf2f8',
    fontFamily: 'Nunito, sans-serif',
  },
  ocean_breeze: {
    key: 'ocean_breeze',
    label: 'Ocean Breeze',
    primaryColor: '#0c4a6e',
    secondaryColor: '#075985',
    accentColor: '#38bdf8',
    textColor: '#f0f9ff',
    bgColor: '#e0f2fe',
    fontFamily: 'Poppins, sans-serif',
  },
  slate_classic: {
    key: 'slate_classic',
    label: 'Slate Classic',
    primaryColor: '#1e293b',
    secondaryColor: '#334155',
    accentColor: '#64748b',
    textColor: '#f1f5f9',
    bgColor: '#f8fafc',
    fontFamily: 'IBM Plex Sans, sans-serif',
  },
  warm_amber: {
    key: 'warm_amber',
    label: 'Warm Amber',
    primaryColor: '#78350f',
    secondaryColor: '#92400e',
    accentColor: '#f59e0b',
    textColor: '#1c1917',
    bgColor: '#fffbeb',
    fontFamily: 'Source Sans Pro, sans-serif',
  },
  azure_mist: {
    key: 'azure_mist',
    label: 'Azure Mist',
    primaryColor: '#0645d9',
    secondaryColor: '#3b82f6',
    accentColor: '#93c5fd',
    textColor: '#0f2d4a',
    bgColor: '#f4f8fd',
    fontFamily: 'Inter, sans-serif',
  },
  pearl_linen: {
    key: 'pearl_linen',
    label: 'Pearl Linen',
    primaryColor: '#6d28d9',
    secondaryColor: '#7c3aed',
    accentColor: '#dbeafe',
    textColor: '#1f2937',
    bgColor: '#fbfbfa',
    fontFamily: 'Outfit, sans-serif',
  },
  standard: {
    key: 'standard',
    label: 'Standard Glass',
    primaryColor: '#ffffff',
    secondaryColor: '#f3f4f6',
    accentColor: '#3b82f6',
    textColor: '#1f2937',
    bgColor: '#ffffff',
    fontFamily: 'Inter, sans-serif',
  },
};

const THEME_KEYS = Object.keys(THEMES);

const WIDGET_POSITIONS = ['bottom-right', 'bottom-left', 'center'];

module.exports = { THEMES, THEME_KEYS, WIDGET_POSITIONS };
