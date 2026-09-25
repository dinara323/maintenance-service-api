import { Router } from 'express';

import {
  getEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment
} from '../controllers/equipment.controller.js';

const router = Router();

router.get('/', getEquipment);
router.post('/', createEquipment);
router.get('/:id', getEquipmentById);
router.patch('/:id', updateEquipment);
router.delete('/:id', deleteEquipment);

export default router;