import { setDefaultResultOrder } from 'node:dns';

import {
  WEATHER_API_URL,
  REQUEST_TIMEOUT_MS
} from '../config/env.js';

import { AppError } from '../errors/AppError.js';

setDefaultResultOrder('ipv4first');

export async function getWeather(lat, lon) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const url =
      `${WEATHER_API_URL}/v1/forecast` +
      `?latitude=${lat}` +
      `&longitude=${lon}` +
      '&current=temperature_2m,wind_speed_10m' +
      '&timezone=auto';

    const response = await fetch(url, {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new AppError(
        'Сервис погоды вернул ошибку',
        502,
        'WEATHER_API_ERROR'
      );
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new AppError(
        'Сервис погоды не ответил вовремя',
        504,
        'WEATHER_TIMEOUT'
      );
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      'Не удалось получить данные о погоде',
      502,
      'WEATHER_API_ERROR'
    );
  } finally {
    clearTimeout(timeout);
  }
}