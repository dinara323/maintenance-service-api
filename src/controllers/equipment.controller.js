import * as equipmentService from '../services/equipment.service.js';

export async function getEquipment(req, res) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await equipmentService.getEquipment({
    status: req.query.status,
    type: req.query.type,
    sortBy: req.query.sortBy,
    order: req.query.order,
    page,
    limit
  });

  res.status(200).json(result);
}

export async function getEquipmentById(req, res) {
  const equipment =
    await equipmentService.getEquipmentById(req.params.id);

  if (!equipment) {
    return res.status(404).json({
      error: 'Equipment not found'
    });
  }

  res.status(200).json({
    data: equipment
  });
}

export async function createEquipment(req, res) {
  try {
    const equipment =
      await equipmentService.createEquipment(req.body);

    res
      .status(201)
      .location(`/api/equipment/${equipment.id}`)
      .json({
        data: equipment
      });
  } catch (error) {
    if (error.code === 'DUPLICATE_SERIAL_NUMBER') {
      return res.status(409).json({
        error: 'Serial number already exists'
      });
    }

    throw error;
  }
}

export async function updateEquipment(req, res) {
  try {
    const equipment =
      await equipmentService.updateEquipment(
        req.params.id,
        req.body
      );

    if (!equipment) {
      return res.status(404).json({
        error: 'Equipment not found'
      });
    }

    res.status(200).json({
      data: equipment
    });
  } catch (error) {
    if (error.code === 'DUPLICATE_SERIAL_NUMBER') {
      return res.status(409).json({
        error: 'Serial number already exists'
      });
    }

    throw error;
  }
}

export async function deleteEquipment(req, res) {
  const deleted =
    await equipmentService.deleteEquipment(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      error: 'Equipment not found'
    });
  }

  res.status(204).send();
}