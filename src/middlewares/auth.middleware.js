import { verifyAccessToken } from '../utils/jwt.js';
import * as userRepository from '../repositories/user.repository.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Access token is required',
      });
    }

    const token = authorization.split(' ')[1];

    let payload;

    try {
      payload = verifyAccessToken(token);
    } catch (error) {
      return res.status(401).json({
        message: 'Invalid or expired access token',
      });
    }

    const user = await userRepository.findById(payload.sub);

    if (!user) {
      return res.status(401).json({
        message: 'User not found',
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;