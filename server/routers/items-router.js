require('dotenv').config({ path: './.env' });
const { Router } = require('express');
const {
  getFirstHundredItems,
  getItemsByUserID,
  createItem,
  deleteItem,
  updateItem,
} = require('../knex/queries/items');

const ItemsRouter = () => {
  const router = new Router();

  router
    .get('/', async (req, res) => {
      try {
        const items = await getFirstHundredItems();
        res.status(200).json(items);
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    });

  return router;
};

module.exports = ItemsRouter;