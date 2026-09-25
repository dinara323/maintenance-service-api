import { v4 as uuidv4 } from 'uuid';

import * as equipmentRepository from '../repositories/equipment.repository.js';
import * as requestRepository from '../repositories/request.repository.js';

export async function getEquipment({
  status,
  type,
  sortBy = 'name',
  order = 'asc',
  page = 1,
  limit = 10
}) {
  let equipment = await equipmentRepository.findAll();

  if (status) {
    equipment = equipment.filter(
      (item) => item.status === status
    );
  }

  if (type) {
    equipment = equipment.filter(
      (item) => item.type === type
    );
  }

  const allowedSortFields = [
    'name',
    'type',
    'serialNumber',
    'status',
    'installedAt'
  ];

  if (allowedSortFields.includes(sortBy)) {
    equipment.sort((a, b) => {
      const first = a[sortBy];
      const second = b[sortBy];

      if (first < second) {
        return order === 'desc' ? 1 : -1;
      }

      if (first > second) {
        return order === 'desc' ? -1 : 1;
      }

      return 0;
    });
  }

  const total = equipment.length;

  const start = (page - 1) * limit;
  const end = start + limit;

  equipment = equipment.slice(start, end);

  return {
    data: equipment,
    meta: {
      total,
      page,
      limit
    }
  };
}

export async function getEquipmentById(id) {
  return equipmentRepository.findById(id);
}

export async function createEquipment(data) {
  const existingEquipment =
    await equipmentRepository.findBySerialNumber(
      data.serialNumber
    );

  if (existingEquipment) {
    const error = new Error(
      'Serial number already exists'
    );

    error.code = 'DUPLICATE_SERIAL_NUMBER';

    throw error;
  }

  const equipment = {
    id: uuidv4(),
    name: data.name,
    type: data.type,
    serialNumber: data.serialNumber,
    location: {
      lat: data.location.lat,
      lon: data.location.lon
    },
    status: data.status,
    installedAt: data.installedAt
  };

  return equipmentRepository.create(equipment);
}

export async function updateEquipment(id, data) {
  const existingEquipment =
    await equipmentRepository.findById(id);

  if (!existingEquipment) {
    return null;
  }

  if (data.serialNumber) {
    const equipmentWithSameSerialNumber =
      await equipmentRepository.findBySerialNumber(
        data.serialNumber
      );

    if (
      equipmentWithSameSerialNumber &&
      equipmentWithSameSerialNumber.id !== id
    ) {
      const error = new Error(
        'Serial number already exists'
      );

      error.code = 'DUPLICATE_SERIAL_NUMBER';

      throw error;
    }
  }

  const updates = {};

  if (data.name !== undefined) {
    updates.name = data.name;
  }

  if (data.type !== undefined) {
    updates.type = data.type;
  }

  if (data.serialNumber !== undefined) {
    updates.serialNumber = data.serialNumber;
  }

  if (data.location !== undefined) {
    updates.location = {
      lat: data.location.lat,
      lon: data.location.lon
    };
  }

  if (data.status !== undefined) {
    updates.status = data.status;
  }

  if (data.installedAt !== undefined) {
    updates.installedAt = data.installedAt;
  }

  return equipmentRepository.update(id, updates);
}

export async function deleteEquipment(id) {
  const requests =
    await requestRepository.findByEquipmentId(id);

  const openRequests = requests.filter(
    (request) =>
      request.status !== 'done' &&
      request.status !== 'rejected'
  );

  if (openRequests.length > 0) {
    const error = new Error(
      'Equipment has open maintenance requests'
    );

    error.code = 'OPEN_REQUESTS';

    throw error;
  }

  return equipmentRepository.remove(id);
}

export async function getEquipmentRequests(id) {
  return requestRepository.findByEquipmentId(id);
}