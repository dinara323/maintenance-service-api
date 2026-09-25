import * as requestService from '../services/request.service.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export async function getRequests(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await requestService.getRequests({
      status: req.query.status,
      priority: req.query.priority,
      equipmentId: req.query.equipmentId,
      page,
      limit
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getRequestById(req, res, next) {
  try {
    const request =
      await requestService.getRequestById(req.params.id);

    if (!request) {
      throw new NotFoundError('Заявка не найдена');
    }

    res.status(200).json({
      data: request
    });
  } catch (error) {
    next(error);
  }
}

export async function createRequest(req, res, next) {
  try {
    const request =
      await requestService.createRequest(req.body);

    res
      .status(201)
      .location(`/api/requests/${request.id}`)
      .json({
        data: request
      });
  } catch (error) {
    next(error);
  }
}

export async function updateRequest(req, res, next) {
  try {
    const request =
      await requestService.updateRequest(
        req.params.id,
        req.body
      );

    if (!request) {
      throw new NotFoundError('Заявка не найдена');
    }

    res.status(200).json({
      data: request
    });
  } catch (error) {
    next(error);
  }
}

export async function updateRequestStatus(req, res, next) {
  try {
    const request =
      await requestService.updateRequestStatus(
        req.params.id,
        req.body.status
      );

    if (!request) {
      throw new NotFoundError('Заявка не найдена');
    }

    res.status(200).json({
      data: request
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteRequest(req, res, next) {
  try {
    const deleted =
      await requestService.deleteRequest(req.params.id);

    if (!deleted) {
      throw new NotFoundError('Заявка не найдена');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}