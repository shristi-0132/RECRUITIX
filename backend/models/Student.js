const db = require("../config/db");

const Student = {
  findByUserId: async (user_id) => {
    const [rows] =
      await db.execute(
        `
        SELECT *
        FROM student_profiles
        WHERE user_id = ?
        `,
        [user_id]
      );

    return rows[0];
  },

  create: async (data) => {
    const {
      user_id,
      enrollment_no,
      name,
      cgpa,
      skills,
      resume_url,
      degree_url,
    } = data;

    const [result] =
      await db.execute(
        `
        INSERT INTO student_profiles
        (
          user_id,
          enrollment_no,
          name,
          cgpa,
          skills,
          resume_url,
          degree_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          user_id,
          enrollment_no,
          name,
          cgpa,
          skills || "",
          resume_url || "",
          degree_url || "",
        ]
      );

    return result;
  },

  update: async (
    user_id,
    data
  ) => {
    const {
      name,
      cgpa,
      skills,
      resume_url,
      degree_url,
    } = data;

    const [result] =
      await db.execute(
        `
        UPDATE student_profiles
        SET
          name = ?,
          cgpa = ?,
          skills = ?,
          resume_url = ?,
          degree_url = ?
        WHERE user_id = ?
        `,
        [
          name,
          cgpa,
          skills || "",
          resume_url || "",
          degree_url || "",
          user_id,
        ]
      );

    return result;
  },
};

module.exports = Student;