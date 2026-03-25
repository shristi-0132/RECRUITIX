const db = require('../config/db');

const Application = {
  // Check for duplicate application
  findDuplicate: (student_id, job_id, callback) => {
    const sql = `
      SELECT application_id FROM applications
      WHERE student_id = ? AND job_id = ?
    `;
    db.query(sql, [student_id, job_id], callback);
  },

  // Create a new application
  create: (student_id, job_id, callback) => {
    const sql = `
      INSERT INTO applications (student_id, job_id, application_date, status)
      VALUES (?, ?, CURDATE(), 'applied')
    `;
    db.query(sql, [student_id, job_id], callback);
  },

  // Get all applications by a student (with job info)
  findByStudentId: (student_id, callback) => {
    const sql = `
      SELECT
        a.application_id,
        a.job_id,
        a.application_date,
        a.status,
        a.ranking_order,
        j.title        AS job_title,
        j.description  AS job_description,
        j.expected_package,
        j.min_cgpa,
        c.company_name
      FROM applications a
      JOIN jobs j ON a.job_id = j.job_id
      JOIN companies c ON j.company_id = c.company_id
      WHERE a.student_id = ?
      ORDER BY a.application_date DESC
    `;
    db.query(sql, [student_id], callback);
  },
};

module.exports = Application;