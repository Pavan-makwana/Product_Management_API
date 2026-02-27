// src/utils/pagination.js

/**
 * Enhanced utility to handle Pagination, Sorting, and basic Filtering
 */
const getQueryOptions = (query) => {
  // 1. Pagination Math
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(query.limit) || 10));
  const skip = (page - 1) * limit;
  const take = limit;

  // 2. Dynamic Sorting
  // Default to 'createdAt' descending if not specified
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';

  /**
   * Formats the final response metadata
   */
  const getMeta = (totalItems) => ({
    total: totalItems,
    page,
    limit,
    totalPages: Math.ceil(totalItems / limit),
    hasNextPage: page < Math.ceil(totalItems / limit),
    hasPrevPage: page > 1
  });

  return { 
    skip, 
    take, 
    orderBy: { [sortBy]: sortOrder }, 
    getMeta 
  };
};

module.exports = { getQueryOptions };