const uuid = require('uuid/v4');
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

const createUser = (email, hashedPassword) =>
  Users()
    .insert({ user_id: uuid(), email, password: hashedPassword })
    .then(response => response);

const deleteUser = (userId) =>
  Users()
    .where({ user_id: userId })
    .del()
    .then(response => response);

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  deleteUser,
};