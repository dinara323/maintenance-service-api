
import rateLimit from 'express-rate-limit';

const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'LOGIN_RATE_LIMIT_EXCEEDED',
      message: 'Слишком много попыток входа. Попробуйте позже.',
    },
  },
});

export default loginRateLimit;