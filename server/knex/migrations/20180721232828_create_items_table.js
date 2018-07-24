
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function(table) {
    table.increments();
    table.string('item_id').notNullable();
    table.string('user_id').notNullable();
    table.string('item_name').notNullable();
    table.string('item_description').notNullable();
    table.string('item_category').notNullable();
    table.double('item_price').notNullable();
    table.string('item_city').notNullable();
    table.string('item_zipcode').notNullable();
    table.timestamp('posted_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
