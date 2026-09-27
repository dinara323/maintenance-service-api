import requestRepository from '../repositories/request.repository.js';
import equipmentRepository from '../repositories/equipment.repository.js';

const allowedTransitions = {
  new: ['in_progress', 'rejected'],
  in_progress: ['done', 'rejected'],
  done: [],
  rejected: [],
};

export async function getRequests({
  status,
  priority,
  equipmentId,
  page = 1,
  limit = 10,
}) {
  const result = await requestRepository.findAll({
    status,
    priority,
    equipmentId,
    page,
    limit,
  });

  return {
    data: result.rows,
    meta: {
      total: result.total,
      page: Number(page),
      limit: Number(limit),
    },
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
      'Equipment not found',
    );

    error.code = 'EQUIPMENT_NOT_FOUND';

    throw error;
  }

  const request = {
    equipmentId: data.equipmentId,
    topic: data.title,
    description: data.description || '',
    priority: data.priority,
    status: 'new',
    plannedAt: data.plannedAt,
    author: data.author || 'API',
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
        data.equipmentId,
      );

    if (!equipment) {
      const error = new Error(
        'Equipment not found',
      );

      error.code = 'EQUIPMENT_NOT_FOUND';

      throw error;
    }

    updates.equipmentId = data.equipmentId;
  }

  if (data.title !== undefined) {
    updates.topic = data.title;
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
      `Cannot change status from ${request.status} to ${status}`,
    );

    error.code = 'INVALID_STATUS_TRANSITION';

    throw error;
  }

  return requestRepository.updateStatus(
    id,
    status,
    'API',
    null,
  );
}

export async function deleteRequest(id) {
  return requestRepository.remove(id);
}