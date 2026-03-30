const PDFDocument = require('pdfkit');

exports.generatePDF = (data) => {
  try {
    const doc = new PDFDocument();

    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));

    doc.fontSize(16).text('Applicant Data', { align: 'center' });
    doc.moveDown();

    data.forEach((item, index) => {
      doc
        .fontSize(10)
        .text(`Application ID: ${item.application_id}`)
        .text(`Student ID: ${item.student_id}`)
        .text(`Status: ${item.status}`)
        .text(`CGPA: ${item.cgpa}`)
        .text(`Skills: ${item.skills}`)
        .moveDown();
    });

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
    });

  } catch (error) {
    throw new Error('PDF generation failed');
  }
};