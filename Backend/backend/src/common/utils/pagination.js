/**
 * Pagination helper.
 * Accepts query params (?page=1&limit=20) and returns Sequelize offset/limit + meta.
 */
const paginate = (query) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 20, 1), 100);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

const paginatedResponse = (rows, count, { page, limit }) => {
  const payload = {
    data: rows,
    meta: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
  };
  console.log('DEBUG: paginatedResponse payload:', JSON.stringify(payload, null, 2));
  return payload;
};

/**
 * Newer version for Analytics & Bots API.
 * Matches Frontend ListResponse/PaginatedResponse interfaces.
 */
const paginatedResponseV2 = (rows, count, { page, limit }) => {
  return {
    data: {
      items: rows,
      total: count,
    },
    pagination: {
      page,
      limit,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
    },
  };
};

module.exports = { paginate, paginatedResponse, paginatedResponseV2 };
