
import { Router } from 'express';

import {
  register,
  login,
  refresh,
  logout,
  me,
} from '../controllers/auth.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import loginRateLimit from '../middlewares/loginRateLimit.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', loginRateLimit, login);
router.post('/refresh', refresh);
router.post('/logout', logout);

router.get('/me', authMiddleware, me);

export default router;