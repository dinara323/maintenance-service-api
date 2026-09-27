import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class RequestStatusHistory extends Model {}

RequestStatusHistory.init(
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
    oldStatus: {
      type: DataTypes.STRING(50),
      field: 'old_status',
    },
    newStatus: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'new_status',
    },
    changedBy: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'changed_by',
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'RequestStatusHistory',
    tableName: 'request_status_history',
    underscored: true,
    updatedAt: false,
  },
);

export default RequestStatusHistory;