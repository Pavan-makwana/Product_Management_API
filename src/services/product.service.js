const prisma = require('../config/db');
const { getQueryOptions } = require('../utils/pagination');

class ProductService {
  async createProduct(data) {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || null,
        price: parseFloat(data.price),
        category: data.category,
        stock: parseInt(data.stock)
      }
    });
  }
  async getProducts(query) {
  const { skip, take, orderBy, getMeta } = getQueryOptions(query);

  const where = {};
  if (query.category) where.category = query.category;
  if (query.minPrice || query.maxPrice) {
    where.price = {};
    if (query.minPrice) where.price.gte = parseFloat(query.minPrice);
    if (query.maxPrice) where.price.lte = parseFloat(query.maxPrice);
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, skip, take, orderBy }),
    prisma.product.count({ where })
  ]);

  return {
    data: products,
    meta: getMeta(total)
  };
}

  async getProductById(id) {
    return await prisma.product.findUnique({ where: { id: parseInt(id) } });
  }

  async updateProduct(id, data) {
    const updateData = {};
    if (data.name) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.price !== undefined) updateData.price = parseFloat(data.price);
    if (data.category) updateData.category = data.category;
    if (data.stock !== undefined) updateData.stock = parseInt(data.stock);

    return await prisma.product.update({
      where: { id: parseInt(id) },
      data: updateData
    });
  }

  async deleteProduct(id) {
    return await prisma.product.delete({ where: { id: parseInt(id) } });
  }
}

module.exports = new ProductService();