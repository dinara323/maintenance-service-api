'use strict';

const { randomUUID } = require('crypto');

module.exports = {
  async up(queryInterface) {
    const site1 = randomUUID();
    const site2 = randomUUID();

    const equipmentIds = Array.from({ length: 6 }, () => randomUUID());
    const technicianIds = Array.from({ length: 5 }, () => randomUUID());
    const requestIds = Array.from({ length: 20 }, () => randomUUID());

    await queryInterface.bulkInsert('sites', [
      {
        id: site1,
        name: 'Северная ветроэлектростанция',
        code: 'SITE-NORTH',
        region: 'Северный регион',
        latitude: 59.3293,
        longitude: 18.0686,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: site2,
        name: 'Западная ветроэлектростанция',
        code: 'SITE-WEST',
        region: 'Западный регион',
        latitude: 57.7089,
        longitude: 11.9746,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('equipment', [
      {
        id: equipmentIds[0],
        site_id: site1,
        name: 'Турбина WT-01',
        type: 'turbine',
        serial_number: 'WT-0001',
        status: 'operational',
        installation_date: '2022-04-10',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: equipmentIds[1],
        site_id: site1,
        name: 'Турбина WT-02',
        type: 'turbine',
        serial_number: 'WT-0002',
        status: 'operational',
        installation_date: '2022-05-15',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: equipmentIds[2],
        site_id: site1,
        name: 'Генератор GN-01',
        type: 'generator',
        serial_number: 'GN-0001',
        status: 'maintenance',
        installation_date: '2021-08-20',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: equipmentIds[3],
        site_id: site2,
        name: 'Турбина WT-03',
        type: 'turbine',
        serial_number: 'WT-0003',
        status: 'operational',
        installation_date: '2023-01-11',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: equipmentIds[4],
        site_id: site2,
        name: 'Турбина WT-04',
        type: 'turbine',
        serial_number: 'WT-0004',
        status: 'maintenance',
        installation_date: '2023-03-17',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: equipmentIds[5],
        site_id: site2,
        name: 'Трансформатор TR-01',
        type: 'transformer',
        serial_number: 'TR-0001',
        status: 'operational',
        installation_date: '2021-11-01',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('equipment_passports', equipmentIds.map((id, index) => ({
      id: randomUUID(),
      equipment_id: id,
      manufacturer: 'NordWind',
      model: `NW-${100 + index}`,
      nominal_power: 2500 + index * 100,
      last_verification_date: '2026-01-15',
      created_at: new Date(),
      updated_at: new Date(),
    })));

    await queryInterface.bulkInsert('technicians', [
      {
        id: technicianIds[0],
        full_name: 'Иван Петров',
        specialization: 'Механик',
        employee_number: 'EMP-001',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: technicianIds[1],
        full_name: 'Анна Смирнова',
        specialization: 'Электрик',
        employee_number: 'EMP-002',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: technicianIds[2],
        full_name: 'Михаил Волков',
        specialization: 'Инженер по турбинам',
        employee_number: 'EMP-003',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: technicianIds[3],
        full_name: 'Елена Кузнецова',
        specialization: 'Диагност',
        employee_number: 'EMP-004',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: technicianIds[4],
        full_name: 'Дмитрий Орлов',
        specialization: 'Инженер по электрооборудованию',
        employee_number: 'EMP-005',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const statuses = ['new', 'in_progress', 'done', 'rejected'];
    const priorities = ['low', 'medium', 'high', 'critical'];

    await queryInterface.bulkInsert(
      'maintenance_requests',
      requestIds.map((id, index) => ({
        id,
        equipment_id: equipmentIds[index % equipmentIds.length],
        topic: `Техническое обслуживание ${index + 1}`,
        description: `Заявка на техническое обслуживание оборудования №${index + 1}`,
        priority: priorities[index % priorities.length],
        status: statuses[index % statuses.length],
        planned_date: new Date(Date.now() + (index + 1) * 86400000),
        author: `Пользователь ${index + 1}`,
        created_at: new Date(),
        updated_at: new Date(),
      })),
    );

    await queryInterface.bulkInsert(
      'request_status_history',
      requestIds.map((id, index) => ({
        id: randomUUID(),
        request_id: id,
        old_status: null,
        new_status: statuses[index % statuses.length],
        changed_by: 'seed',
        comment: 'Начальный статус заявки',
        created_at: new Date(),
      })),
    );

    await queryInterface.bulkInsert(
      'request_assignees',
      requestIds.slice(0, 10).map((requestId, index) => ({
        id: randomUUID(),
        request_id: requestId,
        technician_id: technicianIds[index % technicianIds.length],
        role: 'worker',
        hours: 2 + index,
        created_at: new Date(),
        updated_at: new Date(),
      })),
    );

    await queryInterface.bulkInsert(
      'request_assignees',
      requestIds.slice(0, 5).map((requestId, index) => ({
        id: randomUUID(),
        request_id: requestId,
        technician_id: technicianIds[(index + 1) % technicianIds.length],
        role: 'lead',
        hours: 4,
        created_at: new Date(),
        updated_at: new Date(),
      })),
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('request_assignees', null, {});
    await queryInterface.bulkDelete('request_status_history', null, {});
    await queryInterface.bulkDelete('maintenance_requests', null, {});
    await queryInterface.bulkDelete('equipment_passports', null, {});
    await queryInterface.bulkDelete('technicians', null, {});
    await queryInterface.bulkDelete('equipment', null, {});
    await queryInterface.bulkDelete('sites', null, {});
  },
};