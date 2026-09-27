import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Technician extends Model {}

Technician.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'full_name',
    },
    specialization: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    employeeNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'employee_number',
    },
  },
  {
    sequelize,
    modelName: 'Technician',
    tableName: 'technicians',
    underscored: true,
  },
);

export default Technician;