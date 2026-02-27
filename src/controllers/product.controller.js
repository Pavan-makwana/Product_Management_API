const productService = require('../services/product.service');

class ProductController {
  async create(request, reply) {
    try {
      console.log("Added Data: ", request.body);
      const product = await productService.createProduct(request.body);
      reply.code(201).send({ success: true, data: product });
    } catch (error) {
      console.dir( error, {depth :null}); 
      reply.code(500).send({ success: false, message: error.message });
    }
  }

 async getAll(request, reply) {
    try {
      const result = await productService.getProducts(request.query);
      
      if (request.cache) {
        request.cache.set(request.url, { success: true, ...result });
      }

      reply.send({ success: true, ...result });
    } catch (error) {
      reply.code(500).send({ success: false, message: error.message });
    }
  }
  
  async getOne(request, reply) {
    try {
      const product = await productService.getProductById(request.params.id);
      if (!product) return reply.code(404).send({ success: false, message: 'Product not found' });
      reply.send({ success: true, data: product });
    } catch (error) {
      reply.code(500).send({ success: false, message: error.message });
    }
  }

  async update(request, reply) {
    try {
      const product = await productService.updateProduct(request.params.id, request.body);
      reply.send({ success: true, data: product });
    } catch (error) {
      reply.code(500).send({ success: false, message: error.message });
    }
  }

  async delete(request, reply) {
    try {
      await productService.deleteProduct(request.params.id);
      reply.send({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      reply.code(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = new ProductController();