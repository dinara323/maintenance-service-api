import express from 'express';

import authRoutes from './src/routes/auth.routes.js';
import equipmentRoutes from './src/routes/equipment.routes.js';
import requestRoutes from './src/routes/request.routes.js';
import reportRoutes from './src/routes/report.routes.js';
import siteRoutes from './src/routes/site.routes.js';
import cookieParser from 'cookie-parser';
import requestId from './src/middlewares/requestId.middleware.js';
import logger from './src/middlewares/logger.middleware.js';
import security from './src/middlewares/security.middleware.js';
import corsMiddleware from './src/middlewares/cors.middleware.js';
import rateLimit from './src/middlewares/rateLimit.middleware.js';

import { notFound } from './src/middlewares/notFound.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

const app = express();

app.use(requestId);
app.use(logger);
app.use(security);
app.use(corsMiddleware);

app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.use(rateLimit);

app.use('/api/auth', authRoutes);

app.use('/api/reports', reportRoutes);
app.use('/api/sites', siteRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Maintenance Service API is running',
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

app.use('/api/equipment', equipmentRoutes);
app.use('/api/requests', requestRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;