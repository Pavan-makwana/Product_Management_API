
const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/auth.middleware');
const cacheMiddleware = require('../middlewares/cache.middleware');

async function productRoutes(fastify, options) {
  // Public route 
 fastify.get('/', { preHandler: [cacheMiddleware] }, productController.getAll);
  fastify.get('/:id', productController.getOne);

  // Protected routes - require valid JWT
  fastify.post('/', { preHandler: [verifyToken] }, productController.create);
  fastify.put('/:id', { preHandler: [verifyToken] }, productController.update);
  fastify.delete('/:id', { preHandler: [verifyToken] }, productController.delete);
}

module.exports = productRoutes;