const { THEMES, THEME_KEYS } = require('../../common/constants/themes');
const AppError = require('../../common/errors/AppError');

const getAll = () => {
  return Object.values(THEMES);
};

const getByKey = (themeKey) => {
  if (!THEME_KEYS.includes(themeKey)) throw AppError.notFound(`Theme '${themeKey}' not found`);
  return THEMES[themeKey];
};

module.exports = { getAll, getByKey };
