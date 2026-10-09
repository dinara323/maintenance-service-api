
import { Router } from 'express';

import {
  getRequests,
  getRequestById,
  createRequest,
  updateRequest,
  updateRequestStatus,
  deleteRequest,
} from '../controllers/request.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import requireRole from '../middlewares/role.middleware.js';
import requireAssignedRequest from '../middlewares/requestAccess.middleware.js';

import { validate } from '../middlewares/validate.js';

import {
  createRequestSchema,
  updateRequestSchema,
  requestIdSchema,
  statusSchema,
  requestQuerySchema,
} from '../validators/request.validator.js';

const router = Router();

router.use(authMiddleware);

router.get(
  '/',
  validate({
    query: requestQuerySchema,
  }),
  getRequests,
);

router.get(
  '/:id',
  validate({
    params: requestIdSchema,
  }),
  getRequestById,
);

router.post(
  '/',
  requireRole('technician', 'admin'),
  validate({
    body: createRequestSchema,
  }),
  createRequest,
);

router.patch(
  '/:id',
  validate({
    params: requestIdSchema,
    body: updateRequestSchema,
  }),
  requireAssignedRequest,
  updateRequest,
);

router.patch(
  '/:id/status',
  validate({
    params: requestIdSchema,
    body: statusSchema,
  }),
  requireAssignedRequest,
  updateRequestStatus,
);

router.delete(
  '/:id',
  requireRole('admin'),
  validate({
    params: requestIdSchema,
  }),
  deleteRequest,
);

export default router;