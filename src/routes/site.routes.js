import express from 'express';
import reportRepository from '../repositories/report.repository.js';

const router = express.Router();

router.get('/:id/summary', async (req, res, next) => {
  try {
    const data = await reportRepository.getSiteSummary(req.params.id);

    if (!data) {
      return res.status(404).json({
        error: {
          code: 'SITE_NOT_FOUND',
          message: 'Площадка не найдена',
        },
      });
    }

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
});

export default router;