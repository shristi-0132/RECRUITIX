const Student = require('../models/Student');
const Application = require('../models/Application');

// POST /student/apply
// Body: { job_id }
const applyToJob = (req, res) => {
  const user_id = req.user.user_id;
  const { job_id } = req.body;

  if (!job_id) {
    return res.status(400).json({ message: 'job_id is required' });
  }

  // Step 1: Get student_id from user_id
  Student.findByUserId(user_id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Student profile not found. Please create your profile first.' });
    }

    const student_id = results[0].student_id;

    // Step 2: Check for duplicate application
    Application.findDuplicate(student_id, job_id, (err2, dupResults) => {
      if (err2) return res.status(500).json({ message: 'Database error', error: err2.message });
      if (dupResults.length > 0) {
        return res.status(409).json({ message: 'You have already applied for this job.' });
      }

      // Step 3: Submit application
      Application.create(student_id, job_id, (err3, result) => {
        if (err3) {
          // Foreign key violation: job_id doesn't exist
          if (err3.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(404).json({ message: 'Job not found.' });
          }
          return res.status(500).json({ message: 'Error submitting application', error: err3.message });
        }
        return res.status(201).json({
          message: 'Application submitted successfully',
          application_id: result.insertId,
        });
      });
    });
  });
};

// GET /student/applications
// Returns all jobs the logged-in student applied to
const getMyApplications = (req, res) => {
  const user_id = req.user.user_id;

  Student.findByUserId(user_id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Student profile not found.' });
    }

    const student_id = results[0].student_id;

    Application.findByStudentId(student_id, (err2, applications) => {
      if (err2) return res.status(500).json({ message: 'Database error', error: err2.message });
      return res.status(200).json({
        total: applications.length,
        applications,
      });
    });
  });
};

module.exports = { applyToJob, getMyApplications };