// BUG FIXED 1: Table was queried as 'job' — actual table name is 'jobs'.
// BUG FIXED 2: Column was 'required_skills' — actual column name is 'skills'.
// BUG FIXED 3: Removed updated_at — that column doesn't exist in schema.
// BUG FIXED 4: Added expected_package field that was missing from create().
const db = require('../config/db');

const Job = {
  create: async (company_id, title, description, skills, expected_package, min_cgpa) => {
    const [result] = await db.execute(
      `INSERT INTO jobs (company_id, title, description, skills, expected_package, min_cgpa)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [company_id, title, description || null, skills || null, expected_package, min_cgpa]
    );
    return result;
  },

  getAll: async () => {
    const [rows] = await db.execute(
      `SELECT j.*, c.company_name
       FROM jobs j
       JOIN companies c ON j.company_id = c.company_id
       WHERE j.status = 'active'
       ORDER BY j.created_at DESC`
    );
    return rows;
  },

  getByCompanyId: async (company_id) => {
    const [rows] = await db.execute(
      'SELECT * FROM jobs WHERE company_id = ?',
      [company_id]
    );
    return rows;
  },

  getById: async (job_id) => {
    const [rows] = await db.execute(
      `SELECT j.*, c.company_name
       FROM jobs j
       JOIN companies c ON j.company_id = c.company_id
       WHERE j.job_id = ?`,
      [job_id]
    );
    return rows[0];
  },

  close: async (job_id) => {
    const [result] = await db.execute(
      `UPDATE jobs SET status = 'closed' WHERE job_id = ?`,
      [job_id]
    );
    return result;
  },
};

module.exports = Job;
