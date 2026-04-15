const db = require("../config/db");

const Application = {
  /* CREATE */
  create: async (student_id, job_id) => {
    const [result] = await db.execute(
      `
      INSERT INTO applications
      (student_id, job_id, status)
      VALUES (?, ?, 'applied')
      `,
      [student_id, job_id]
    );

    return result;
  },

  /* DUPLICATE CHECK */
  findDuplicate: async (
    student_id,
    job_id
  ) => {
    const [rows] = await db.execute(
      `
      SELECT *
      FROM applications
      WHERE student_id = ?
      AND job_id = ?
      `,
      [student_id, job_id]
    );

    return rows;
  },

  /* MY APPLICATIONS */
  findByStudentId: async (student_id) => {
  const [rows] = await db.execute(
    `
    SELECT 
      a.*,
      j.title,
      j.company,
      j.expected_package
    FROM applications a
    JOIN jobs j
    ON a.job_id = j.id
    WHERE a.student_id = ?
    `,
    [student_id]
  );

  return rows;
},

  /* SHORTLISTED */
  findShortlistedByStudentId:
    async (student_id) => {
      const [rows] =
        await db.execute(
          `
          SELECT a.*, j.title, j.company
          FROM applications a
          JOIN jobs j
          ON a.job_id = j.id
          WHERE a.student_id = ?
          AND a.status = 'shortlisted'
          `,
          [student_id]
        );

      return rows;
    },

  /* SHORTLIST */
  shortlist: async (
    application_id
  ) => {
    const [result] =
      await db.execute(
        `
        UPDATE applications
        SET status = 'shortlisted'
        WHERE application_id = ?
        `,
        [application_id]
      );

    return result;
  },
};

module.exports = Application;