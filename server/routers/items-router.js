require('dotenv').config({ path: './.env' });
const { Router } = require('express');
const validateToken = require('../middleware/validate-token');
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
    })
    .get('/:user_id', async (req, res) => {
      const { user_id } = req.params;
      try {
        const items = await getItemsByUserID(user_id);
        res.status(200).json(items);
      }
      catch (err) {
        res.status(500).json({ message: err });
      }
    })
    .post('/:user_id', validateToken, async (req, res) => {
      const { user_id } = req.params;
      const { itemData } = req.body;
      const payload = { user_id, ...itemData };
      try {
        const response = await createItem(payload);
        res.status(201).json({ response });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    })
    .put('/:user_id/:item_id', validateToken, async (req, res) => {
      const { item_id } = req.params;
      const { payload } = req.body;
      try {
        const updated = await updateItem(item_id, payload);
        res.status(202).json({ updated });
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
    })
    .delete('/:user_id/:item_id', validateToken, async (req, res) => {
      const { item_id } = req.params;

    });

  return router;
};

module.exports = ItemsRouter;