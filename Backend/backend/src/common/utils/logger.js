/**
 * Lightweight logger wrapper.
 * In a real production setup, this could be replaced with Pino or Winston.
 */

const info = (message, meta = {}) => {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`, Object.keys(meta).length ? meta : '');
};

const error = (message, err = null, meta = {}) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, Object.keys(meta).length ? meta : '');
  if (err && err.stack) {
    console.error(err.stack);
  } else if (err) {
    console.error(err);
  }
};

const warn = (message, meta = {}) => {
  console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, Object.keys(meta).length ? meta : '');
};

module.exports = {
  info,
  error,
  warn,
};
