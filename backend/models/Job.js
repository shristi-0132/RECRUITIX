const db = require("../config/db");

const Job = {
  create: async (
    recruiter_id,
    title,
    description,
    skills,
    expected_package,
    min_cgpa
  ) => {
    const [result] = await db.execute(
      `
      INSERT INTO jobs
      (
        recruiter_id,
        title,
        company,
        location,
        description,
        skills,
        expected_package,
        min_cgpa
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        recruiter_id,
        title,
        "TechNova Pvt Ltd",
        "Noida",
        description || null,
        skills || null,
        expected_package || 0,
        min_cgpa || 0,
      ]
    );

    return result;
  },

  getAll: async () => {
    const [rows] = await db.execute(
      `
      SELECT *
      FROM jobs
      ORDER BY id DESC
      `
    );
    return rows;
  },

  getByCompanyId: async (
    recruiter_id
  ) => {
    const [rows] = await db.execute(
      `
      SELECT *
      FROM jobs
      WHERE recruiter_id = ?
      `,
      [recruiter_id]
    );
    return rows;
  },

  getById: async (job_id) => {
    const [rows] = await db.execute(
      `
      SELECT *
      FROM jobs
      WHERE id = ?
      `,
      [job_id]
    );
    return rows[0];
  },

  close: async (job_id) => {
    const [result] = await db.execute(
      `
      UPDATE jobs
      SET status = 'closed'
      WHERE id = ?
      `,
      [job_id]
    );
    return result;
  },
};

module.exports = Job;