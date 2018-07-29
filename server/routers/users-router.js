require('dotenv').config({ path: './.env' });
const { Router } = require('express');
const { promisify } = require('util');
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  getUserById,
  getUserByEmail,
  getAllUsers,
  createUser,
  deleteUserById,
} = require('../knex/queries/users');

const usersRouter = () => {
  const router = new Router();

  router
    .get('/', async (req, res) => {
      try {
        const users = await getAllUsers();
        res.status(200).json(users);
      }
      catch(err) {
        res.status(404).json({ message: err });
      }
    })
    .get('/:user_id', async (req, res) => {
      try {
        const user = await getUserById(req.params.user_id);
        res.status(200).json(user);
      }
      catch(err) {
        res.status(404).json({ message: err });
      }
    })
    .post('/login', async (req, res) => {
      const { email, password } = req.body;
      console.log(email, password);
      try {
        const foundUser = await getUserByEmail(email);
        if (foundUser[0].password !== password) {
          res.status(404).json({ message: "Password doesn't match with your input." });
        }
        const jwtSign = promisify(jwt.sign);
        const token = await jwtSign({ foo: 'bar' }, process.env.JWT_TOKEN_KEY);
        res.status(200).json({ token });
      }
      catch(err) {
        res.status(404).json({ message: err.message });
      }
    })
    .post('/signup', async (req, res) => {
      const { email, password } = req.body;
      try {
        const fetchedUser = await getUserByEmail(email);
        console.log(fetchedUser);
        if (fetchedUser.length < 1) {
          res.status(404).json({ message: `User with ${email} already exists.` });
        }
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
              res.status(400).json({ message: err });
            }
            const userId = uuid();
            const response = await createUser(userId, email, hash);
            res.status(201).json(response);
          });
        });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    })
    .delete('/:user_id', async (req, res) => {
      const { user_id } = req.params;
      try {
        const response = deleteUserById(user_id);
        res.status(204).json(response);
      }
      catch (err) {
        res.status(400).json({ message: err });
      }
    });

  return router;
};

module.exports = usersRouter;