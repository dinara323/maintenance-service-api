# Maintenance Service API

REST API на Node.js для управления промышленным оборудованием и заявками на техническое обслуживание. Приложение позволяет выполнять CRUD-операции с оборудованием и заявками, фильтровать и сортировать данные, проверять входные параметры и получать информацию о погоде по координатам оборудования через Open-Meteo.

## Возможности

Приложение позволяет:

* получать список оборудования;
* добавлять, изменять и удалять оборудование;
* получать оборудование по идентификатору;
* получать заявки конкретного оборудования;
* создавать, изменять и удалять заявки;
* изменять статус заявки с проверкой допустимых переходов;
* использовать фильтрацию, сортировку и пагинацию;
* проверять входные данные;
* обрабатывать ошибки с единым форматом ответа;
* использовать `requestId` для отслеживания запросов;
* логировать HTTP-запросы;
* использовать CORS, rate limiting и security headers.

## Требования

* Node.js 20+
* npm

## Установка

Клонировать репозиторий:

```bash
git clone <git@github.com:dinara323/maintenance-service-api.git>
```

Перейти в папку проекта:

```bash
cd maintenance-service-api
```

Установить зависимости:

```bash
npm install
```

## Переменные окружения

В корне проекта необходимо создать файл `.env`.

Пример:

```env
PORT=3000
NODE_ENV=development

CORS_ORIGINS=http://localhost:3000

RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

WEATHER_API_URL=https://api.open-meteo.com

REQUEST_TIMEOUT_MS=5000
```

## Запуск

Запустить приложение:

```bash
npm start
```

Для запуска в режиме разработки:

```bash
npm run dev
```

После запуска API доступно по адресу:

```text
http://localhost:3000
```

Проверка работоспособности:

```bash
curl http://localhost:3000/api/health
```

Ответ:

```json
{
  "status": "ok"
}
```

## API

### Оборудование

```text
GET    /api/equipment
POST   /api/equipment
GET    /api/equipment/:id
PATCH  /api/equipment/:id
DELETE /api/equipment/:id
GET    /api/equipment/:id/requests
GET    /api/equipment/:id/weather
```

### Заявки

```text
GET    /api/requests
POST   /api/requests
PATCH  /api/requests/:id
DELETE /api/requests/:id
```

Пример фильтрации и пагинации:

```text
GET /api/equipment?page=1&limit=10
GET /api/equipment?status=operational
GET /api/equipment?type=turbine
GET /api/equipment?sortBy=name&order=asc
```

## Валидация

Для оборудования проверяются:

* обязательные поля;
* допустимый тип оборудования;
* уникальность `serialNumber`;
* допустимый статус;
* корректность даты установки.

Для заявок проверяются:

* существование оборудования;
* длина названия от 5 до 120 символов;
* длина описания до 2000 символов;
* допустимый приоритет;
* допустимый статус;
* корректность даты.

Допустимые статусы заявки:

```text
new
in_progress
done
rejected
```

Недопустимый переход между статусами возвращает ошибку `409 Conflict`.

## Обработка ошибок

API использует единый формат ошибок:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Некорректные данные запроса",
    "details": [],
    "requestId": "..."
  }
}
```

Обрабатываются ошибки:

* некорректных входных данных;
* отсутствующего оборудования или заявки;
* дублирующего `serialNumber`;
* недопустимого перехода статуса;
* неизвестного маршрута;
* превышения лимита запросов;
* ошибок внешнего API;
* таймаута запроса к Open-Meteo.

## Безопасность

В приложении используются:

* CORS;
* rate limiting;
* Helmet;
* ограничение размера JSON-запроса;
* `requestId`;
* middleware для логирования запросов.

## Хранение данных

На текущем этапе данные хранятся в JSON-файлах:

```text
src/data/equipment.json
src/data/requests.json
```

Доступ к данным выполняется через слой репозиториев:

```text
src/repositories/
```

Структура приложения разделена на слои:

```text
routes
   ↓
controllers
   ↓
services
   ↓
repositories
   ↓
JSON
```

## Open-Meteo

Для endpoint:

```text
GET /api/equipment/:id/weather
```

используется API Open-Meteo.

По координатам оборудования запрашиваются текущие:

* температура;
* скорость ветра.

Таймаут внешнего запроса задаётся переменной:

```env
REQUEST_TIMEOUT_MS=5000
```

## Postman

Для тестирования API используется Postman.

Коллекция находится в:

```text
docs/postman/Maintenance Service API.postman_collection.json
```

Коллекция содержит разделы:

```text
Health
Equipment
Requests
Validation
Security
```

## Структура проекта

```text
maintenance-service-api/
├── app.js
├── server.js
├── package.json
├── .env.example
├── README.md
├── docs/
│   └── postman/
└── src/
    ├── config/
    ├── controllers/
    ├── data/
    ├── errors/
    ├── middlewares/
    ├── repositories/
    ├── routes/
    ├── services/
    └── validators/
```

## Технологии

* Node.js
* Express
* JavaScript
* REST API
* Open-Meteo API
* JSON
* CORS
* Helmet
* express-rate-limit
* UUID
* Postman