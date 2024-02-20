const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'movie_match_db',
  password: 'abc123',
  port: 5432,
});

module.exports = pool;
