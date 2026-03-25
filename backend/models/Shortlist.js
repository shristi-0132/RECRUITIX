const db = require('../config/db');

const Shortlist = {
  create: async (application_id) => {
    const [result] = await db.query(
      'INSERT INTO shortlist (application_id, created_at, updated_at) VALUES (?, NOW(), NOW())',
      [application_id]
    );
    return result;
  },

  getByApplicationId: async (application_id) => {
    const [rows] = await db.query(
      'SELECT * FROM shortlist WHERE application_id = ?',
      [application_id]
    );
    return rows[0];
  }
};

module.exports = Shortlist;