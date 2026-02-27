const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
  async register(request, reply) {
    try {
      const { email, password } = request.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return reply.code(400).send({ success: false, message: 'Email already in use' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
        data: { email, password: hashedPassword }
      });

      reply.code(201).send({ success: true, message: 'User registered successfully', userId: user.id });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ success: false, message: 'Registration failed' });
    }
  }

  async login(request, reply) {
    try {
      const { email, password } = request.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return reply.code(400).send({ success: false, message: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return reply.code(400).send({ success: false, message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      reply.send({ success: true, token });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ success: false, message: 'Login failed' });
    }
  }
}

module.exports = new AuthController();