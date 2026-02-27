const jwt = require('jsonwebtoken');

const verifyToken = (request, reply, done) => {
  const authHeader = request.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.code(401).send({ success: false, message: 'Access Denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    request.user = verified; 
    done();
  } catch (error) {
    reply.code(403).send({ success: false, message: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;