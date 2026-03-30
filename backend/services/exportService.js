const db = require('../config/db');
const csvExporter = require('../utils/csvExporter');
const pdfExporter = require('../utils/pdfExporter');

exports.exportApplications = async (job_id, format) => {
  // Fetch applicant data
  const [rows] = await db.query(
    `SELECT a.application_id, a.student_id, a.status, s.cgpa, s.skills
     FROM application a
     JOIN student s ON a.student_id = s.student_id
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