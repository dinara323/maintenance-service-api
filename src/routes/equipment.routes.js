import { Router } from 'express';

import {
  getEquipment,
  getEquipmentById,
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