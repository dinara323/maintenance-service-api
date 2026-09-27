import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class EquipmentPassport extends Model {}

EquipmentPassport.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    equipmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      field: 'equipment_id',
    },
    manufacturer: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nominalPower: {
      type: DataTypes.DECIMAL(12, 2),
      field: 'nominal_power',
    },
    lastVerificationDate: {
      type: DataTypes.DATEONLY,
      field: 'last_verification_date',
    },
  },
  {
    sequelize,
    modelName: 'EquipmentPassport',
    tableName: 'equipment_passports',
    underscored: true,
  },
);

export default EquipmentPassport;