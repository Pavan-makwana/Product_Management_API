const fastify = require('fastify')({ logger: true });
const prisma = require('./config/db');
const rateLimit = require('@fastify/rate-limit');
// Register Plugins / Middlewares 

fastify.get('/health', async (request, reply) => {
  return { 
    status: 'success', 
    message: 'API is up and running smoothly.', 
    timestamp: new Date() 
  };
});

fastify.register(rateLimit, {
  max: 100, 
  timeWindow: '1 minute' 
});

// API Routes 
fastify.register(require('./routes/auth.routes'), { prefix: '/api/v1/auth' });
fastify.register(require('./routes/product.routes'), { prefix: '/api/v1/products' });


const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();