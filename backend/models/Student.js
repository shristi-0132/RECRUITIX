// BUG FIXED: db is a promise pool (mysql2/promise) — callbacks don't work with it.
// Converted all methods to async/await.
const db = require('../config/db');

const Student = {
  findByUserId: async (user_id) => {
    const [rows] = await db.execute(
      'SELECT * FROM students WHERE user_id = ?',
      [user_id]
    );
    return rows;
  },

  create: async (data) => {
    const [result] = await db.execute(
      `INSERT INTO students (user_id, enrollment_no, name, cgpa, skills, resume_url, degree_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.user_id,
        data.enrollment_no,
        data.name,
        data.cgpa,
        data.skills || null,
        data.resume_url || null,
        data.degree_url || null,
      ]
    );
    return result;
  },

  update: async (user_id, data) => {
    const [result] = await db.execute(
      `UPDATE students
       SET name = ?, cgpa = ?, skills = ?, resume_url = ?, degree_url = ?
       WHERE user_id = ?`,
      [
        data.name,
        data.cgpa,
        data.skills || null,
        data.resume_url || null,
        data.degree_url || null,
        user_id,
      ]
    );
    return result;
  },
};

module.exports = Student;
