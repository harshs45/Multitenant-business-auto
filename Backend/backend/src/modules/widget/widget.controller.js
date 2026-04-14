const service = require('./widget.service');

/**
 * GET /api/v1/widget/config?key=...
 */
const getConfig = async (req, res, next) => {
  try {
    const publicKey = req.query.key;
    if (!publicKey) {
      return res.status(400).json({ 
        success: false, 
        error: { message: 'Widget key is required' } 
      });
    }

    const config = await service.getWidgetConfigByPublicKey(publicKey);
    res.json({ success: true, data: config });
  } catch (err) {
    next(err);
  }
};

module.exports = { getConfig };
