const db          = require('../config/db');
const csvExporter = require('../utils/csvExporter');
const pdfExporter = require('../utils/pdfExporter');

exports.exportApplications = async (job_id, format) => {
  // FIX: tables were 'application' and 'student' — correct names are 'applications' and 'students'
  const [rows] = await db.execute(
    `SELECT a.application_id, a.student_id, a.status,
            s.name, s.cgpa, s.skills
     FROM applications a
     JOIN students s ON a.student_id = s.student_id
     WHERE a.job_id = ?`,
    [job_id]
  );

  if (!rows || rows.length === 0) {
    throw new Error('No application data available');
  }

  if (format === 'csv') {
    return csvExporter.generateCSV(rows);
  } else if (format === 'pdf') {
    return pdfExporter.generatePDF(rows);
  } else {
    throw new Error('Invalid format. Use csv or pdf');
  }
};