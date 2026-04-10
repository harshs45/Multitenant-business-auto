const service = require('./formSchema.service');

const getSchema = async (req, res, next) => {
  try {
    const { businessType, step } = req.query;
    const schema = service.getSchema(businessType, step);
    res.json({ success: true, data: schema });
  } catch (err) { next(err); }
};

module.exports = { getSchema };
