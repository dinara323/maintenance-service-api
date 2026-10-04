import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password_hash',
    },

    role: {
      type: DataTypes.ENUM('viewer', 'technician', 'admin'),
      allowNull: false,
      defaultValue: 'viewer',
    },
  },
  {
    tableName: 'users',
    underscored: true,
  },
);

export default User;