const { User } = require('../../models');
const AppError = require('../../common/errors/AppError');

const getProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ['id', 'name', 'email', 'role', 'status', 'lastLoginAt', 'createdAt'],
  });
  if (!user) throw AppError.notFound('User not found');
  return user;
};

const updateProfile = async (userId, data) => {
  const user = await User.findByPk(userId);
  if (!user) throw AppError.notFound('User not found');

  if (data.name) user.name = data.name;
  await user.save();

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};

module.exports = { getProfile, updateProfile };
