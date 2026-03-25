const db = require('../config/db');

const Student = {
  // Get student by user_id
  findByUserId: (user_id, callback) => {
    const sql = `SELECT * FROM students WHERE user_id = ?`;
    db.query(sql, [user_id], callback);
  },

  // Create student profile
  create: (data, callback) => {
    const sql = `
      INSERT INTO students (user_id, enrollment_no, name, cgpa, skills, resume_url, degree_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.user_id,
      data.enrollment_no,
      data.name,
      data.cgpa,
      data.skills,
      data.resume_url || null,
      data.degree_url || null,
    ];
    db.query(sql, values, callback);
  },

  // Update student profile
  update: (user_id, data, callback) => {
    const sql = `
      UPDATE students
      SET name = ?, cgpa = ?, skills = ?, resume_url = ?, degree_url = ?
      WHERE user_id = ?
    `;
    const values = [
      data.name,
      data.cgpa,
      data.skills,
      data.resume_url || null,
      data.degree_url || null,
      user_id,
    ];
    db.query(sql, values, callback);
  },
};

module.exports = Student;