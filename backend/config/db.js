const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host:     process.env.DB_HOST     || '127.0.0.1',
  port:     process.env.DB_PORT     || 3306,
  database: process.env.DB_NAME     || 'recruitix',
  user:     process.env.DB_USER     || 'recruitix_user',
  password: process.env.DB_PASS     || 'recruitix123',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = db;
