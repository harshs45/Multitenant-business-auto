const usersService = require('./users.service');

const getProfile = async (req, res, next) => {
  try {
    const profile = await usersService.getProfile(req.user.id);
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const profile = await usersService.updateProfile(req.user.id, req.body);
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };
