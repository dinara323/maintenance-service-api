# Maintenance Service API — Лабораторная работа №3

REST API для управления техническим обслуживанием промышленного оборудования.

В лабораторной работе выполнен переход от хранения данных в памяти к реляционной базе данных PostgreSQL с использованием ORM Sequelize. Добавлены миграции, начальные данные, модели базы данных, связи между сущностями и SQL-отчёты.

---

## 1. Цель лабораторной работы

Цель работы — подключить PostgreSQL к существующему REST API и организовать работу с базой данных через Sequelize.

В рамках лабораторной работы выполнены:
* Подключение PostgreSQL;
* Запуск PostgreSQL в Docker;
* Создание структуры базы данных через Sequelize Migrations;
* Создание начальных данных через Seeders;
* Создание Sequelize-моделей;
* Настройка связей между моделями;
* Перенос работы репозиториев с памяти на PostgreSQL;
* Сохранение существующей REST API структуры;
* Добавление SQL-отчётов;
* Проверка работы API через Postman.

---

## 2. Используемые технологии

- **Node.js**: 20+
- **Express**
- **PostgreSQL**: 16
- **Sequelize**: 6
- **Sequelize CLI**
- **Docker** & **Docker Compose**
- **Postman**
- **Git**

---

## 3. Структура проекта

```text
maintenance-service-api/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── sequelize.config.cjs
│   │
│   ├── controllers/
│   │   ├── equipment.controller.js
│   │   └── request.controller.js
│   │
│   ├── db/
│   │   ├── migrations/
│   │   │   └── 001-create-maintenance-tables.cjs
│   │   └── seeders/
│   │       └── 001-maintenance-data.cjs
│   │
│   ├── models/
│   │   ├── equipment.js
│   │   ├── equipmentPassport.js
│   │   ├── maintenanceRequest.js
│   │   ├── requestAssignee.js
│   │   ├── requestStatusHistory.js
│   │   ├── site.js
│   │   ├── technician.js
│   │   └── index.js
│   │
│   ├── repositories/
│   │   ├── equipment.repository.js
│   │   ├── report.repository.js
│   │   └── request.repository.js
│   │
│   ├── routes/
│   │   ├── equipment.routes.js
│   │   ├── request.routes.js
│   │   ├── report.routes.js
│   │   └── site.routes.js
│   │
│   ├── services/
│   │   ├── equipment.service.js
│   │   └── request.service.js
│   │
│   └── middlewares/
│       ├── cors.middleware.js
│       ├── errorHandler.js
│       ├── logger.middleware.js
│       ├── notFound.js
│       ├── rateLimit.middleware.js
│       ├── requestId.middleware.js
│       ├── security.middleware.js
│       └── validate.js
│
├── app.js
├── server.js
├── docker-compose.yml
├── .env
├── .env.example
├── .sequelizerc
├── package.json
└── README.md
---

## 4. Настройка базы данных

Для работы приложения используется PostgreSQL 16, запущенный в Docker-контейнере.

Конфигурация PostgreSQL находится в файле:

```text
docker-compose.yml

##используемые параметры базы данных:
Host: localhost
Port: 5433
Database: maintenance_service
User: maintenance_user
Password: maintenance_password
