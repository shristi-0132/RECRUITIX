const db = require('../config/db');

const Company = {
  create: async (user_id, company_name) => {
    const [result] = await db.query(
      'INSERT INTO company (user_id, company_name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
      [user_id, company_name]
    );
    return result;
  },

  getByUserId: async (user_id) => {
    const [rows] = await db.query(
      'SELECT * FROM company WHERE user_id = ?',
      [user_id]
    );
    return rows[0];
  }
};

module.exports = Company;