import User from '../models/user.js';

const findByEmail = async (email) => {
  return User.findOne({
    where: { email },
  });
};

const findById = async (id) => {
  return User.findByPk(id);
};

const create = async ({ email, passwordHash, role = 'viewer' }) => {
  return User.create({
    email,
    passwordHash,
    role,
  });
};

export {
  findByEmail,
  findById,
  create,
};