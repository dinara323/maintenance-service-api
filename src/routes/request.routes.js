import { Router } from 'express';

import {
  getRequests,
  getRequestById,
  createRequest,
  updateRequest,
  updateRequestStatus,
  deleteRequest
} from '../controllers/request.controller.js';

import { validate } from '../middlewares/validate.js';

import {
  createRequestSchema,
  updateRequestSchema,
  requestIdSchema,
  statusSchema,
  requestQuerySchema
} from '../validators/request.validator.js';

const router = Router();

router.get(
  '/',
  validate({
    query: requestQuerySchema
  }),
  getRequests
);

router.post(
  '/',
  validate({
    body: createRequestSchema
  }),
  createRequest
);

router.get(
  '/:id',
  validate({
    params: requestIdSchema
  }),
  getRequestById
);

router.patch(
  '/:id',
  validate({
    params: requestIdSchema,
    body: updateRequestSchema
  }),
  updateRequest
);

router.patch(
  '/:id/status',
  validate({
    params: requestIdSchema,
    body: statusSchema
  }),
  updateRequestStatus
);

router.delete(
  '/:id',
  validate({
    params: requestIdSchema
  }),
  deleteRequest
);

export default router;