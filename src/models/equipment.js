import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Equipment extends Model {}

Equipment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    siteId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'site_id',
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'serial_number',
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    installedAt: {
      type: DataTypes.DATEONLY,
      field: 'installation_date',
    },
  },
  {
    sequelize,
    modelName: 'Equipment',
    tableName: 'equipment',
    underscored: true,
  },
);

export default Equipment;