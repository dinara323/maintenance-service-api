import { v4 as uuidv4 } from 'uuid';

import * as requestRepository from '../repositories/request.repository.js';
import * as equipmentRepository from '../repositories/equipment.repository.js';

const allowedTransitions = {
  new: ['in_progress', 'rejected'],
  in_progress: ['done', 'rejected'],
  done: [],
  rejected: []
};

export async function getRequests({
  status,
  priority,
  equipmentId,
  page = 1,
  limit = 10
}) {
  let requests = await requestRepository.findAll();

  if (status) {
    requests = requests.filter(
      (item) => item.status === status
    );
  }

  if (priority) {
    requests = requests.filter(
      (item) => item.priority === priority
    );
  }

  if (equipmentId) {
    requests = requests.filter(
      (item) => item.equipmentId === equipmentId
    );
  }

  const total = requests.length;

  const start = (page - 1) * limit;
  const end = start + limit;

  requests = requests.slice(start, end);

  return {
    data: requests,
    meta: {
      total,
      page,
      limit
    }
  };
}

export async function getRequestById(id) {
  return requestRepository.findById(id);
}

export async function createRequest(data) {
  const equipment =
    await equipmentRepository.findById(data.equipmentId);

  if (!equipment) {
    const error = new Error(
      'Equipment not found'
    );

    error.code = 'EQUIPMENT_NOT_FOUND';

    throw error;
  }

  const now = new Date().toISOString();

  const request = {
    id: uuidv4(),
    equipmentId: data.equipmentId,
    title: data.title,
    description: data.description || '',
    priority: data.priority,
    status: 'new',
    plannedAt: data.plannedAt,
    createdAt: now,
    updatedAt: now
  };

  return requestRepository.create(request);
}

export async function updateRequest(id, data) {
  const existingRequest =
    await requestRepository.findById(id);

  if (!existingRequest) {
    return null;
  }

  const updates = {};

  if (data.equipmentId !== undefined) {
    const equipment =
      await equipmentRepository.findById(
        data.equipmentId
      );

    if (!equipment) {
      const error = new Error(
        'Equipment not found'
      );

      error.code = 'EQUIPMENT_NOT_FOUND';

      throw error;
    }

    updates.equipmentId = data.equipmentId;
  }

  if (data.title !== undefined) {
    updates.title = data.title;
  }

  if (data.description !== undefined) {
    updates.description = data.description;
  }

  if (data.priority !== undefined) {
    updates.priority = data.priority;
  }

  if (data.plannedAt !== undefined) {
    updates.plannedAt = data.plannedAt;
  }

  updates.updatedAt = new Date().toISOString();

  return requestRepository.update(id, updates);
}

export async function updateRequestStatus(id, status) {
  const request =
    await requestRepository.findById(id);

  if (!request) {
    return null;
  }

  const allowed =
    allowedTransitions[request.status] || [];

  if (!allowed.includes(status)) {
    const error = new Error(
      `Cannot change status from ${request.status} to ${status}`
    );

    error.code = 'INVALID_STATUS_TRANSITION';

    throw error;
  }

  return requestRepository.update(id, {
    status,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteRequest(id) {
  return requestRepository.remove(id);
}