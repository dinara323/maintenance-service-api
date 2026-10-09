import { Router } from 'express';

import {
  getEquipment,
  getEquipmentById,
  getEquipmentRequests,
  getEquipmentWeather,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from '../controllers/equipment.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import requireRole from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.js';

import {
  createEquipmentSchema,
  updateEquipmentSchema,
  equipmentIdSchema,
  equipmentQuerySchema,
} from '../validators/equipment.validator.js';

const router = Router();

router.use(authMiddleware);

router.get(
  '/',
  validate({ query: equipmentQuerySchema }),
  getEquipment,
);

router.get(
  '/:id/requests',
  validate({ params: equipmentIdSchema }),
  getEquipmentRequests,
);

router.get(
  '/:id/weather',
  validate({ params: equipmentIdSchema }),
  getEquipmentWeather,
);

router.get(
  '/:id',
  validate({ params: equipmentIdSchema }),
  getEquipmentById,
);

router.post(
  '/',
  requireRole('admin'),
  validate({ body: createEquipmentSchema }),
  createEquipment,
);

router.patch(
  '/:id',
  requireRole('admin'),
  validate({
    params: equipmentIdSchema,
    body: updateEquipmentSchema,
  }),
  updateEquipment,
);

router.delete(
  '/:id',
  requireRole('admin'),
  validate({ params: equipmentIdSchema }),
  deleteEquipment,
);

export default router;