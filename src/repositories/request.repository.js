import {
  MaintenanceRequest,
  Equipment,
  Site,
  RequestStatusHistory,
  Technician,
  RequestAssignee,
} from '../models/index.js';

const requestRepository = {
  async findAll({
    status,
    priority,
    equipmentId,
    page = 1,
    limit = 10,
  }) {
    const where = {};

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (equipmentId) {
      where.equipmentId = equipmentId;
    }

    const result = await MaintenanceRequest.findAndCountAll({
      where,
      include: [
        {
          model: Equipment,
          as: 'equipment',
          include: [
            {
              model: Site,
              as: 'site',
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });

    return {
      rows: result.rows,
      total: result.count,
    };
  },

  async findById(id) {
    return MaintenanceRequest.findByPk(id, {
      include: [
        {
          model: Equipment,
          as: 'equipment',
        },
        {
          model: RequestStatusHistory,
          as: 'statusHistory',
        },
        {
          model: Technician,
          as: 'technicians',
        },
      ],
    });
  },

  async create(data) {
    return MaintenanceRequest.create(data);
  },

  async update(id, data) {
    const request = await MaintenanceRequest.findByPk(id);

    if (!request) {
      return null;
    }

    await request.update(data);

    return request;
  },

  async remove(id) {
    const request = await MaintenanceRequest.findByPk(id);

    if (!request) {
      return false;
    }

    await request.destroy();

    return true;
  },

  async findByEquipmentId(equipmentId) {
    return MaintenanceRequest.findAll({
      where: { equipmentId },
      order: [['createdAt', 'DESC']],
    });
  },

  async updateStatus(id, status, changedBy, comment) {
    const sequelize = MaintenanceRequest.sequelize;

    return sequelize.transaction(async (transaction) => {
      const request = await MaintenanceRequest.findByPk(id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!request) {
        return null;
      }

      const oldStatus = request.status;

      await request.update(
        { status },
        { transaction },
      );

      await RequestStatusHistory.create(
        {
          requestId: id,
          oldStatus,
          newStatus: status,
          changedBy,
          comment,
        },
        { transaction },
      );

      return request;
    });
  },

  async replaceAssignees(requestId, assignees) {
    const sequelize = MaintenanceRequest.sequelize;

    return sequelize.transaction(async (transaction) => {
      const request = await MaintenanceRequest.findByPk(
        requestId,
        { transaction },
      );

      if (!request) {
        return null;
      }

      const leads = assignees.filter(
        (assignee) => assignee.role === 'lead',
      );

      if (leads.length !== 1) {
        const error = new Error(
          'Заявка должна иметь ровно одного ведущего исполнителя',
        );

        error.statusCode = 422;

        throw error;
      }

      await RequestAssignee.destroy({
        where: { requestId },
        transaction,
      });

      await RequestAssignee.bulkCreate(
        assignees.map((assignee) => ({
          requestId,
          technicianId: assignee.technicianId,
          role: assignee.role,
          hours: assignee.hours ?? 0,
        })),
        { transaction },
      );

      return request;
    });
  },

  async getStatusHistory(requestId) {
    return RequestStatusHistory.findAll({
      where: { requestId },
      order: [['createdAt', 'ASC']],
    });
  },

  async getAssignees(requestId) {
    return RequestAssignee.findAll({
      where: { requestId },
    });
  },
};

export default requestRepository;