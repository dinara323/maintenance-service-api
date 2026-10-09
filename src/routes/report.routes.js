import express from 'express';
import reportRepository from '../repositories/report.repository.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/equipment-load', async (req, res, next) => {
  try {
    const { from, to, minRequests = 1 } = req.query;

    const data = await reportRepository.getEquipmentLoad({
      from,
      to,
      minRequests,
    });

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
