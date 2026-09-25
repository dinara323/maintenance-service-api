const priorities = [
  'low',
  'medium',
  'high',
  'critical'
];

const statuses = [
  'new',
  'in_progress',
  'done',
  'rejected'
];

export function createRequestSchema(data) {
  const errors = [];

  if (!data.equipmentId || typeof data.equipmentId !== 'string') {
    errors.push({
      field: 'equipmentId',
      message: 'Поле обязательно'
    });
  }

  if (typeof data.title !== 'string') {
    errors.push({
      field: 'title',
      message: 'Поле обязательно'
    });
  } else if (data.title.length < 5 || data.title.length > 120) {
    errors.push({
      field: 'title',
      message: 'Длина должна быть от 5 до 120 символов'
    });
  }

  if (
    data.description !== undefined &&
    (
      typeof data.description !== 'string' ||
      data.description.length > 2000
    )
  ) {
    errors.push({
      field: 'description',
      message: 'Максимальная длина — 2000 символов'
    });
  }

  if (!priorities.includes(data.priority)) {
    errors.push({
      field: 'priority',
      message: 'Недопустимый приоритет'
    });
  }

  if (data.status !== undefined && !statuses.includes(data.status)) {
    errors.push({
      field: 'status',
      message: 'Недопустимый статус'
    });
  }

  if (data.plannedAt !== undefined) {
    const date = new Date(data.plannedAt);

    if (Number.isNaN(date.getTime())) {
      errors.push({
        field: 'plannedAt',
        message: 'Некорректная дата'
      });
    }
  }

  return errors;
}

export function updateRequestSchema(data) {
  const errors = [];

  const allowedFields = [
    'equipmentId',
    'title',
    'description',
    'priority',
    'plannedAt'
  ];

  for (const field of Object.keys(data)) {
    if (!allowedFields.includes(field)) {
      delete data[field];
    }
  }

  if (data.title !== undefined) {
    if (
      typeof data.title !== 'string' ||
      data.title.length < 5 ||
      data.title.length > 120
    ) {
      errors.push({
        field: 'title',
        message: 'Длина должна быть от 5 до 120 символов'
      });
    }
  }

  if (data.description !== undefined) {
    if (
      typeof data.description !== 'string' ||
      data.description.length > 2000
    ) {
      errors.push({
        field: 'description',
        message: 'Максимальная длина — 2000 символов'
      });
    }
  }

  if (
    data.priority !== undefined &&
    !priorities.includes(data.priority)
  ) {
    errors.push({
      field: 'priority',
      message: 'Недопустимый приоритет'
    });
  }

  if (data.plannedAt !== undefined) {
    const date = new Date(data.plannedAt);

    if (Number.isNaN(date.getTime())) {
      errors.push({
        field: 'plannedAt',
        message: 'Некорректная дата'
      });
    }
  }

  return errors;
}

export function requestIdSchema(params) {
  const errors = [];

  if (!params.id) {
    errors.push({
      field: 'id',
      message: 'Идентификатор обязателен'
    });
  }

  return errors;
}

export function statusSchema(data) {
  const errors = [];

  if (!statuses.includes(data.status)) {
    errors.push({
      field: 'status',
      message: 'Недопустимый статус'
    });
  }

  return errors;
}

export function requestQuerySchema(query) {
  const errors = [];

  if (
    query.priority !== undefined &&
    !priorities.includes(query.priority)
  ) {
    errors.push({
      field: 'priority',
      message: 'Недопустимый приоритет'
    });
  }

  if (
    query.status !== undefined &&
    !statuses.includes(query.status)
  ) {
    errors.push({
      field: 'status',
      message: 'Недопустимый статус'
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