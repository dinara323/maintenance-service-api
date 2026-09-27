import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class RequestAssignee extends Model {}

RequestAssignee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    requestId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'request_id',
    },
    technicianId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'technician_id',
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    hours: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'RequestAssignee',
    tableName: 'request_assignees',
    underscored: true,
  },
);

export default RequestAssignee;