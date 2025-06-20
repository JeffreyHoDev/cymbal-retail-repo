require('dotenv').config();

// Initialize query builder with MySQL connection
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.AIVEN_MYSQL_HOST,
    port: process.env.AIVEN_MYSQL_PORT,
    user: process.env.AIVEN_MYSQL_USER,
    password: process.env.AIVEN_MYSQL_PASSWORD,
    database: process.env.AIVEN_MYSQL_DATABASE,
  },
});

module.exports = knex;