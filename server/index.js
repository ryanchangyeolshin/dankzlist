require('dotenv').config({ path: './.env' });
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const usersRouter = require('./routers/users-router');
const itemsRouter = require('./routers/items-router');

app
  .use(bodyParser.json())
  .use('/api/users', usersRouter())
  .use('/api/items', itemsRouter())
  .listen(process.env.PORT || 3000, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log("CONNECTED TO PORT " + process.env.PORT);
    }
  });
