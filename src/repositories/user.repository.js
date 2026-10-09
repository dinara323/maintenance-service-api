import User from '../models/user.js';

const findByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

const findById = async (id) => {
  return User.findByPk(id);
};

const findAll = async () => {
  return User.findAll({
    attributes: ['id', 'email', 'role', 'technicianId'],
    order: [['email', 'ASC']],
  });
};

const create = async ({
  email,
  passwordHash,
  role = 'viewer',
  technicianId = null,
}) => {
  return User.create({
    email,
    passwordHash,
    role,
    technicianId,
  });
};

export {
  findByEmail,
  findById,
  findAll,
  create,
};