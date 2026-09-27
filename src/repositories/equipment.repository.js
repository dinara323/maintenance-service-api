import {
  Equipment,
  Site,
  EquipmentPassport,
} from '../models/index.js';

const equipmentRepository = {
  async findAll({ status, type, sortBy = 'name', order = 'asc', page = 1, limit = 10 }) {
    const where = {};

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    const allowedSortFields = ['name', 'type', 'status', 'serialNumber'];

    const sortField = allowedSortFields.includes(sortBy)
      ? sortBy
      : 'name';

    const result = await Equipment.findAndCountAll({
      where,
      include: [
        {
          model: Site,
          as: 'site',
          attributes: ['id', 'name', 'code', 'region', 'latitude', 'longitude'],
        },
        {
          model: EquipmentPassport,
          as: 'passport',
          attributes: [
            'id',
            'manufacturer',
            'model',
            'nominalPower',
            'lastVerificationDate',
          ],
        },
      ],
      order: [[sortField, order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']],
      limit,
      offset: (page - 1) * limit,
    });

    return {
      rows: result.rows,
      total: result.count,
    };
  },

  async findById(id) {
    return Equipment.findByPk(id, {
      include: [
        {
          model: Site,
          as: 'site',
        },
        {
          model: EquipmentPassport,
          as: 'passport',
        },
      ],
    });
  },

  async findBySerialNumber(serialNumber) {
    return Equipment.findOne({
      where: { serialNumber },
    });
  },

  async create(data) {
    return Equipment.create(data);
  },

  async update(id, data) {
    const equipment = await Equipment.findByPk(id);

    if (!equipment) {
      return null;
    }

    await equipment.update(data);

    return equipment;
  },

  async remove(id) {
    const equipment = await Equipment.findByPk(id);

    if (!equipment) {
      return false;
    }

    await equipment.destroy();

    return true;
  },
};

export default equipmentRepository;