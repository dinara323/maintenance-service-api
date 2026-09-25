const equipmentTypes = [
  'turbine',
  'inverter',
  'sensor',
  'substation'
];

const equipmentStatuses = [
  'operational',
  'maintenance',
  'fault',
  'decommissioned'
];

export function createEquipmentSchema(data) {
  const errors = [];

  if (typeof data.name !== 'string') {
    errors.push({
      field: 'name',
      message: 'Поле обязательно'
    });
  } else if (data.name.length < 3 || data.name.length > 100) {
    errors.push({
      field: 'name',
      message: 'Длина должна быть от 3 до 100 символов'
    });
  }

  if (!equipmentTypes.includes(data.type)) {
    errors.push({
      field: 'type',
      message: 'Недопустимый тип оборудования'
    });
  }

  if (typeof data.serialNumber !== 'string' || data.serialNumber.length === 0) {
    errors.push({
      field: 'serialNumber',
      message: 'Поле обязательно'
    });
  }

  if (!data.location || typeof data.location !== 'object') {
    errors.push({
      field: 'location',
      message: 'Поле обязательно'
    });
  } else {
    if (typeof data.location.lat !== 'number') {
      errors.push({
        field: 'location.lat',
        message: 'Должно быть числом'
      });
    }

    if (typeof data.location.lon !== 'number') {
      errors.push({
        field: 'location.lon',
        message: 'Должно быть числом'
      });
    }
  }

  if (!equipmentStatuses.includes(data.status)) {
    errors.push({
      field: 'status',
      message: 'Недопустимый статус'
    });
  }

  if (!data.installedAt) {
    errors.push({
      field: 'installedAt',
      message: 'Поле обязательно'
    });
  } else {
    const date = new Date(data.installedAt);

    if (Number.isNaN(date.getTime())) {
      errors.push({
        field: 'installedAt',
        message: 'Некорректная ISO-дата'
      });
    } else if (date > new Date()) {
      errors.push({
        field: 'installedAt',
        message: 'Дата не может быть в будущем'
      });
    }
  }

  return errors;
}

export function updateEquipmentSchema(data) {
  const errors = [];

  const allowedFields = [
    'name',
    'type',
    'serialNumber',
    'location',
    'status',
    'installedAt'
  ];

  for (const field of Object.keys(data)) {
    if (!allowedFields.includes(field)) {
      delete data[field];
    }
  }

  if (data.name !== undefined) {
    if (
      typeof data.name !== 'string' ||
      data.name.length < 3 ||
      data.name.length > 100
    ) {
      errors.push({
        field: 'name',
        message: 'Длина должна быть от 3 до 100 символов'
      });
    }
  }

  if (data.type !== undefined && !equipmentTypes.includes(data.type)) {
    errors.push({
      field: 'type',
      message: 'Недопустимый тип оборудования'
    });
  }

  if (
    data.status !== undefined &&
    !equipmentStatuses.includes(data.status)
  ) {
    errors.push({
      field: 'status',
      message: 'Недопустимый статус'
    });
  }

  if (data.installedAt !== undefined) {
    const date = new Date(data.installedAt);

    if (Number.isNaN(date.getTime())) {
      errors.push({
        field: 'installedAt',
        message: 'Некорректная ISO-дата'
      });
    } else if (date > new Date()) {
      errors.push({
        field: 'installedAt',
        message: 'Дата не может быть в будущем'
      });
    }
  }

  return errors;
}

export function equipmentIdSchema(params) {
  const errors = [];

  if (!params.id) {
    errors.push({
      field: 'id',
      message: 'Идентификатор обязателен'
    });
  }

  return errors;
}

export function equipmentQuerySchema(query) {
  const errors = [];

  if (
    query.order !== undefined &&
    !['asc', 'desc'].includes(query.order)
  ) {
    errors.push({
      field: 'order',
      message: 'Допустимые значения: asc, desc'
    });
  }

  if (query.page !== undefined) {
    const page = Number(query.page);

    if (!Number.isInteger(page) || page < 1) {
      errors.push({
        field: 'page',
        message: 'Должно быть целым числом больше 0'
      });
    }
  }

  if (query.limit !== undefined) {
    const limit = Number(query.limit);

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      errors.push({
        field: 'limit',
        message: 'Должно быть целым числом от 1 до 100'
      });
    }
  }

  return errors;
}