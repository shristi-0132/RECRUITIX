// BUG FIXED: Application and Student models are now async/await — removed all callback usage.
const Student     = require('../models/Student');
const Application = require('../models/Application');

const applyToJob = async (req, res) => {
  try {
    const user_id  = req.user.user_id;
    const { job_id } = req.body;
    if (!job_id) {
      return res.status(400).json({ message: 'job_id is required' });
    }
    // Step 1: resolve student_id from user_id
    const students = await Student.findByUserId(user_id);
    if (students.length === 0) {
      return res.status(404).json({ message: 'Student profile not found. Please create your profile first.' });
    }
    const student_id = students[0].student_id;

    // Step 2: duplicate check
    const duplicates = await Application.findDuplicate(student_id, job_id);
    if (duplicates.length > 0) {
      return res.status(409).json({ message: 'You have already applied for this job.' });
    }

    // Step 3: submit
    const result = await Application.create(student_id, job_id);
    return res.status(201).json({
      message: 'Application submitted successfully',
      application_id: result.insertId,
    });
  } catch (err) {
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ message: 'Job not found.' });
    }
    return res.status(500).json({ message: 'Error submitting application', error: err.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const user_id  = req.user.user_id;
    const students = await Student.findByUserId(user_id);
    if (students.length === 0) {
      return res.status(404).json({ message: 'Student profile not found.' });
    }
    const student_id   = students[0].student_id;
    const applications = await Application.findByStudentId(student_id);
    return res.status(200).json({ total: applications.length, applications });
  } catch (err) {
    return res.status(500).json({ message: 'Database error', error: err.message });
  }
};

module.exports = { applyToJob, getMyApplications };
