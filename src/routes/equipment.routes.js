import { Router } from 'express';

import {
  getEquipment,
  getEquipmentById,
  getEquipmentRequests,
  getEquipmentWeather,
  createEquipment,
  updateEquipment,
  deleteEquipment
} from '../controllers/equipment.controller.js';

import { validate } from '../middlewares/validate.js';

import {
  createEquipmentSchema,
  updateEquipmentSchema,
  equipmentIdSchema,
  equipmentQuerySchema
} from '../validators/equipment.validator.js';

const router = Router();

router.get(
  '/',
  validate({
    query: equipmentQuerySchema
  }),
  getEquipment
);

router.post(
  '/',
  validate({
    body: createEquipmentSchema
  }),
  createEquipment
);

router.get(
  '/:id/requests',
  validate({
    params: equipmentIdSchema
  }),
  getEquipmentRequests
);

router.get(
  '/:id/weather',
  validate({
    params: equipmentIdSchema
  }),
  getEquipmentWeather
);

router.get(
  '/:id',
  validate({
    params: equipmentIdSchema
  }),
  getEquipmentById
);

router.patch(
  '/:id',
  validate({
    params: equipmentIdSchema,
    body: updateEquipmentSchema
  }),
  updateEquipment
);

router.delete(
  '/:id',
  validate({
    params: equipmentIdSchema
  }),
  deleteEquipment
);

export default router;