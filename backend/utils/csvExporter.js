const { Parser } = require('json2csv');

exports.generateCSV = (data) => {
  try {
    const fields = [
      'application_id',
      'student_id',
      'name',
      'status',
      'cgpa',
      'skills'
    ];
    const parser = new Parser({ fields });
    return parser.parse(data);
  } catch (error) {
    throw new Error('CSV generation failed: ' + error.message);
  }
};