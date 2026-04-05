// BUG FIXED 1: db is a promise pool — callbacks don't work. Converted to async/await.
// BUG FIXED 2: CURDATE() returns date only; application_date is TIMESTAMP. Use NOW() instead.
const db = require('../config/db');

const Application = {
  findDuplicate: async (student_id, job_id) => {
    const [rows] = await db.execute(
      'SELECT application_id FROM applications WHERE student_id = ? AND job_id = ?',
      [student_id, job_id]
    );
    return rows;
  },

  create: async (student_id, job_id) => {
    const [result] = await db.execute(
      `INSERT INTO applications (student_id, job_id, application_date, status)
       VALUES (?, ?, NOW(), 'applied')`,
      [student_id, job_id]
    );
    return result;
  },

  findByStudentId: async (student_id) => {
    const [rows] = await db.execute(
      `SELECT
         a.application_id,
         a.job_id,
         a.application_date,
         a.status,
         a.ranking_order,
         j.title           AS job_title,
         j.description     AS job_description,
         j.expected_package,
         j.min_cgpa,
         c.company_name
       FROM applications a
       JOIN jobs      j ON a.job_id      = j.job_id
       JOIN companies c ON j.company_id  = c.company_id
       WHERE a.student_id = ?
       ORDER BY a.application_date DESC`,
      [student_id]
    );
    return rows;
  },
};

module.exports = Application;
