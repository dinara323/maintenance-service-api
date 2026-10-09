import * as userRepository from '../repositories/user.repository.js';

const getUsers = async (req, res, next) => {
  try {
    const users = await userRepository.findAll();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export { getUsers };
