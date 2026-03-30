// BUG FIXED 1: Table was queried as 'company' — actual table name is 'companies'.
// BUG FIXED 2: Removed created_at / updated_at — those columns don't exist in schema.
const db = require('../config/db');

const Company = {
  create: async (user_id, company_name, description, website) => {
    const [result] = await db.execute(
      `INSERT INTO companies (user_id, company_name, description, website)
       VALUES (?, ?, ?, ?)`,
      [user_id, company_name, description || null, website || null]
    );
    return result;
  },

  getByUserId: async (user_id) => {
    const [rows] = await db.execute(
      'SELECT * FROM companies WHERE user_id = ?',
      [user_id]
    );
    return rows[0];
  },

  getById: async (company_id) => {
    const [rows] = await db.execute(
      'SELECT * FROM companies WHERE company_id = ?',
      [company_id]
    );
    return rows[0];
  },
};

module.exports = Company;
