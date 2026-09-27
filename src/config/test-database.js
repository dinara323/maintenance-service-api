import pool from './database.js';

try {
  const result = await pool.query('SELECT NOW()');

  console.log('Подключение к PostgreSQL успешно');
  console.log('Время базы данных:', result.rows[0].now);
} catch (error) {
  console.error('Ошибка подключения к PostgreSQL:', error.message);
} finally {
  await pool.end();
}