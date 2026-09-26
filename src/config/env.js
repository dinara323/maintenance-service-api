export const PORT =
  Number(process.env.PORT) || 3000;

export const NODE_ENV =
  process.env.NODE_ENV || 'development';

export const CORS_ORIGINS =
  process.env.CORS_ORIGINS || 'http://localhost:3000';

export const RATE_LIMIT_WINDOW =
  Number(process.env.RATE_LIMIT_WINDOW) || 15;

export const RATE_LIMIT_MAX =
  Number(process.env.RATE_LIMIT_MAX) || 100;

export const WEATHER_API_URL =
  process.env.WEATHER_API_URL || 'https://api.open-meteo.com';

export const REQUEST_TIMEOUT_MS =
  Number(process.env.REQUEST_TIMEOUT_MS) || 5000;