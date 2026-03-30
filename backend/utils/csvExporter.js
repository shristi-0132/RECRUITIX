const { Parser } = require('json2csv');

exports.generateCSV = (data) => {
  try {
    const fields = [
      'application_id',
      'student_id',
      'status',
      'cgpa',
      'skills'
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    return csv;
  } catch (error) {
    throw new Error('CSV generation failed');
  }
};