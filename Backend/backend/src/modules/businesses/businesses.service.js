const { v4: uuidv4 } = require('uuid');
const { Business, Bot, Subscription } = require('../../models');
const AppError = require('../../common/errors/AppError');
const { paginate, paginatedResponse } = require('../../common/utils/pagination');

const create = async (userId, data) => {
  const business = await Business.create({
    id: uuidv4(),
    userId,
    name: data.name,
    description: data.description || null,
    businessType: data.businessType,
    website: data.website || null,
  });

  // Auto-create free subscription
  await Subscription.create({
    id: uuidv4(),
    businessId: business.id,
    planKey: 'free',
    status: 'active',
    currentPeriodStart: new Date(),
    currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });

  return business;
};

const getById = async (businessId, userId) => {
  const business = await Business.findOne({
    where: { id: businessId, userId },
    include: [{ model: Subscription, as: 'subscription' }],
  });
  if (!business) throw AppError.notFound('Business not found');
  return business;
};

const update = async (businessId, userId, data) => {
  const business = await Business.findOne({ where: { id: businessId, userId } });
  if (!business) throw AppError.notFound('Business not found');

  if (data.name) business.name = data.name;
  if (data.description !== undefined) business.description = data.description;
  if (data.website !== undefined) business.website = data.website;
  await business.save();

  return business;
};

const listBots = async (businessId, userId, query) => {
  // Verify ownership
  const business = await Business.findOne({ where: { id: businessId, userId } });
  if (!business) throw AppError.notFound('Business not found');

  const { page, limit, offset } = paginate(query);
  const { count, rows } = await Bot.findAndCountAll({
    where: { businessId },
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return paginatedResponse(rows, count, { page, limit });
};

const listForUser = async (userId, query) => {
  console.log('DEBUG: listForUser called for userId:', userId);
  const { page, limit, offset } = paginate(query);
  const { count, rows } = await Business.findAndCountAll({
    where: { userId },
    include: [{ model: Subscription, as: 'subscription' }],
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });
  console.log(`DEBUG: listForUser found ${count} businesses for userId: ${userId}`);
  console.log('DEBUG: First row preview (if any):', rows[0]?.id);
  return paginatedResponse(rows, count, { page, limit });
};

module.exports = { create, getById, update, listBots, listForUser };
