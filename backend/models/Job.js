const db = require('../config/db');

const Job = {
  create: async (company_id, title, description, required_skills, min_cgpa) => {
    const [result] = await db.query(
      `INSERT INTO job 
       (company_id, title, description, required_skills, min_cgpa, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [company_id, title, description, required_skills, min_cgpa]
    );
    return result;
  },

  getByCompanyId: async (company_id) => {
    const [rows] = await db.query(
      'SELECT * FROM job WHERE company_id = ?',
      [company_id]
    );
    return rows;
  },

  getById: async (job_id) => {
    const [rows] = await db.query(
      'SELECT * FROM job WHERE job_id = ?',
      [job_id]
    );
    return rows[0];
  }
};

module.exports = Job;