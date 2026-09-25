import express from 'express';

import equipmentRoutes from './src/routes/equipment.routes.js';
import requestRoutes from './src/routes/request.routes.js';

import { notFound } from './src/middlewares/notFound.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Maintenance Service API is running'
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

app.use('/api/equipment', equipmentRoutes);
app.use('/api/requests', requestRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;