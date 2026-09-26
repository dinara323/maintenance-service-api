import cors from 'cors';

import { CORS_ORIGINS } from '../config/env.js';

const allowedOrigins = CORS_ORIGINS
  .split(',')
  .map((origin) => origin.trim());

const corsMiddleware = cors({
  origin: allowedOrigins
});

export default corsMiddleware;