require('dotenv').config({ path: '../.env' });

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : process.env.PG_USERNAME,
      password : process.env.PG_PASSWORD,
      database : process.env.PG_NAME,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  }

};
