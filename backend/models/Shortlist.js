// BUG FIXED 1: Table was queried as 'shortlist' — actual table name is 'shortlists'.
// BUG FIXED 2: Removed created_at / updated_at — column is 'shortlisted_at' per schema.
const db = require('../config/db');

const Shortlist = {
  create: async (application_id) => {
    const [result] = await db.execute(
      'INSERT INTO shortlists (application_id) VALUES (?)',
      [application_id]
    );
    return result;
    // NOTE: Also update applications.status to 'shortlisted' in the same service call.
    // See recruiter controller for the combined transaction.
  },

  getByApplicationId: async (application_id) => {
    const [rows] = await db.execute(
      'SELECT * FROM shortlists WHERE application_id = ?',
      [application_id]
    );
    return rows[0];
  },

  getByJobId: async (job_id) => {
    const [rows] = await db.execute(
      `SELECT
         s.shortlist_id,
         s.shortlisted_at,
         a.application_id,
         a.student_id,
         a.ranking_order,
         st.name,
         st.cgpa,
         st.skills,
         st.resume_url
       FROM shortlists s
       JOIN applications a  ON s.application_id = a.application_id
       JOIN students    st  ON a.student_id      = st.student_id
       WHERE a.job_id = ?
       ORDER BY a.ranking_order ASC`,
      [job_id]
    );
    return rows;
  },
};

module.exports = Shortlist;
