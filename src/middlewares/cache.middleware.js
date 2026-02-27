const cache = new Map();

const cacheMiddleware = (request, reply, done) => {
  if (request.method !== 'GET') return done();

  const key = request.url; 
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log(`Cache Hit for: ${key}`);
    return reply
      .header('X-Cache', 'HIT')
      .send(cachedResponse);
  }

  // If not in cache, we intercept the send to store the result
  console.log(`Cache Miss for: ${key}`);
  reply.header('X-Cache', 'MISS');
  
  // Attach the cache object so the controller can update it
  request.cache = cache;
  done();
};

module.exports = cacheMiddleware;