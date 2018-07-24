const uuid = require('uuid/v4');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { user_id: uuid(), email: 'suck_my_chucha@gmail.com', password: 'suckmychucha' },
        { user_id: uuid(), email: 'sensitive_titties@bing.com', password: 'donttouchmynipples' },
        { user_id: uuid(), email: 'condom_flusher@gmail.com', password: 'Ididntflushmycondom' }
      ]);
    });
};
