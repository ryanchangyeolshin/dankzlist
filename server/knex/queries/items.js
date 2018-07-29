const uuid = require('uuid/v4');
const knex = require('../knex');
const Items = () => knex('items');

// Basic CRUD
const getFirstHundredItems = () =>
  Items()
    .limit(100)
    .then(items => items);

const getItemsByUserID = userId =>
  Items()
    .where({ user_id: userId })
    .leftJoin('items', 'item.user_id', '=', 'contacts.id')
    .then(items => items);

const createItem = ({
  user_id,
  item_name,
  item_description,
  item_category,
  item_price,
  item_city,
  item_zipcode
}) =>
  Items()
    .insert({
      item_id: uuid(),
      user_id,
      item_name,
      item_description,
      item_category,
      item_price,
      item_city,
      item_zipcode,
    })
    .then(response => response);

const deleteItem = item_id =>
  Items()
    .where({ item_id })
    .del()
    .then(response => response);

const updateItem = (item_id, changes) =>
  Items()
    .where({ item_id })
    .update(changes)
    .then(response => response);

module.exports = {
  getFirstHundredItems,
  getItemsByUserID,
  createItem,
  deleteItem,
  updateItem,
};