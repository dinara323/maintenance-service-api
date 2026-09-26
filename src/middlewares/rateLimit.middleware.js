import rateLimit from 'express-rate-limit';

import {
  RATE_LIMIT_WINDOW,
  RATE_LIMIT_MAX
} from '../config/env.js';

const rateLimitMiddleware = rateLimit({
  windowMs: RATE_LIMIT_WINDOW * 60 * 1000,
  max: RATE_LIMIT_MAX,
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Слишком много запросов'
    }
  }
});

export default rateLimitMiddleware;