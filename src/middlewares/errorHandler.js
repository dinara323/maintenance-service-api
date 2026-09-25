export function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  const response = {
    error: {
      code: error.code || 'INTERNAL_SERVER_ERROR',
      message: error.message || 'Внутренняя ошибка сервера',
      details: error.details || []
    }
  };

  if (req.requestId) {
    response.error.requestId = req.requestId;
  }

  if (process.env.NODE_ENV !== 'production') {
    response.error.stack = error.stack;
  }

  res.status(statusCode).json(response);
}