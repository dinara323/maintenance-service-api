import * as equipmentService from '../services/equipment.service.js';
import * as weatherService from '../services/weather.service.js';

import { NotFoundError } from '../errors/NotFoundError.js';
import { ConflictError } from '../errors/ConflictError.js';

export async function getEquipment(req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

export async function getEquipmentById(req, res, next) {
  try {
    const equipment =
      await equipmentService.getEquipmentById(req.params.id);

    if (!equipment) {
      throw new NotFoundError('Оборудование не найдено');
    }

    res.status(200).json({
      data: equipment
    });
  } catch (error) {
    next(error);
  }
}

export async function createEquipment(req, res, next) {
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
      return next(
        new ConflictError('Серийный номер уже используется')
      );
    }

    next(error);
  }
}

export async function updateEquipment(req, res, next) {
  try {
    const equipment =
      await equipmentService.updateEquipment(
        req.params.id,
        req.body
      );

    if (!equipment) {
      throw new NotFoundError('Оборудование не найдено');
    }

    res.status(200).json({
      data: equipment
    });
  } catch (error) {
    if (error.code === 'DUPLICATE_SERIAL_NUMBER') {
      return next(
        new ConflictError('Серийный номер уже используется')
      );
    }

    next(error);
  }
}

export async function deleteEquipment(req, res, next) {
  try {
    const deleted =
      await equipmentService.deleteEquipment(req.params.id);

    if (!deleted) {
      throw new NotFoundError('Оборудование не найдено');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function getEquipmentRequests(req, res, next) {
  try {
    const equipment =
      await equipmentService.getEquipmentById(req.params.id);

    if (!equipment) {
      throw new NotFoundError('Оборудование не найдено');
    }

    const requests =
      await equipmentService.getEquipmentRequests(req.params.id);

    res.status(200).json({
      data: requests
    });
  } catch (error) {
    next(error);
  }
}

export async function getEquipmentWeather(req, res, next) {
  try {
    const equipment =
      await equipmentService.getEquipmentById(req.params.id);

    if (!equipment) {
      throw new NotFoundError('Оборудование не найдено');
    }

    const weather = await weatherService.getWeather(
      equipment.location.lat,
      equipment.location.lon
    );

    res.status(200).json({
      data: weather
    });
  } catch (error) {
    next(error);
  }
}