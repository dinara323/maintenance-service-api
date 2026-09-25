import { AppError } from './AppError.js';

export class ValidationError extends AppError {
  constructor(details = []) {
    super(
      'Некорректные данные запроса',
      400,
      'VALIDATION_ERROR',
      details
    );
  }
}