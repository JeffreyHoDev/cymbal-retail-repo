const fs = require('fs');
require('dotenv').config();

// Initialize query builder with MySQL connection
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.AIVEN_DB_HOST,
    port: process.env.AIVEN_DB_PORT,
    user: process.env.AIVEN_DB_USER,
    password: process.env.AIVEN_DB_PASSWORD,
    database: process.env.AIVEN_DB_NAME,
    ssl: {
      ca: fs.readFileSync('./ca.pem'),
    },
  },
});

module.exports = knex;