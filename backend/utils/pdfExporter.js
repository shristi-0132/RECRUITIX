const PDFDocument = require('pdfkit');

exports.generatePDF = (data) => {
  const doc      = new PDFDocument();
  const buffers  = [];

  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(16).text('Applicant Report', { align: 'center' });
  doc.moveDown();

  data.forEach((item) => {
    doc.fontSize(10)
      .text(`Application ID : ${item.application_id}`)
      .text(`Student ID     : ${item.student_id}`)
      .text(`Name           : ${item.name}`)
      .text(`Status         : ${item.status}`)
      .text(`CGPA           : ${item.cgpa}`)
      .text(`Skills         : ${item.skills}`)
      .moveDown();
  });

  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(buffers)));
  });
};