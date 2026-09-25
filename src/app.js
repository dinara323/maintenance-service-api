import express from 'express';
import equipmentRoutes from './routes/equipment.routes.js';

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

app.use('/api/equipment', equipmentRoutes);

export default app;