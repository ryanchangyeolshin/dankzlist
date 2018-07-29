const knex = require('../knex');
const Users = () => knex('users');

const getAllUsers = () =>
  Users()
    .then(users => users);

const getUserById = (id) =>
  Users()
    .where({ user_id: id })
    .then(user => user);

const getUserByEmail = email =>
  Users()
    .where({ email })
    .then(user => user);

const createUser = (user_id, email, hashedPassword) =>
  Users()
    .insert({ user_id, email, password: hashedPassword })
    .then(response => response);

const deleteUserById = (userId) =>
  Users()
    .where({ user_id: userId })
    .del()
    .then(response => response);

const deleteAllUsers = () =>
  Users()
    .del()
    .then(response => response);

const deleteUserByEmail = email =>
  Users()
    .where({ email })
    .del()
    .then(response => response);

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  deleteUserById,
  deleteAllUsers,
  deleteUserByEmail,
};