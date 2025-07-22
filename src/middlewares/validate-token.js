import jwt from 'jsonwebtoken';
import User from '../users/user.model.js';
import NotAuthorizedError from '../shared/errors/not-authorized-error.js';

export default async function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return next(new NotAuthorizedError('Invalid or inactive user'));
    }

    req.user = user; // نمرر المستخدم للراوترات التالية
    next();
  } catch (error) {
    return next(new NotAuthorizedError('Invalid or expired token'));
  }
}

