const Student = require('../models/Student');

// GET /student/profile
// Returns the logged-in student's profile
const getProfile = (req, res) => {
  const user_id = req.user.user_id; // set by authMiddleware

  Student.findByUserId(user_id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    return res.status(200).json({ profile: results[0] });
  });
};

// POST /student/profile  (create)
const createProfile = (req, res) => {
  const user_id = req.user.user_id;
  const { enrollment_no, name, cgpa, skills, resume_url, degree_url } = req.body;

  if (!enrollment_no || !name || !cgpa) {
    return res.status(400).json({ message: 'enrollment_no, name, and cgpa are required' });
  }

  // Check if profile already exists
  Student.findByUserId(user_id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    if (results.length > 0) {
      return res.status(409).json({ message: 'Profile already exists. Use PUT to update.' });
    }

    const data = { user_id, enrollment_no, name, cgpa, skills, resume_url, degree_url };
    Student.create(data, (err2, result) => {
      if (err2) return res.status(500).json({ message: 'Error creating profile', error: err2.message });
      return res.status(201).json({ message: 'Profile created successfully', student_id: result.insertId });
    });
  });
};

// PUT /student/profile  (update)
const updateProfile = (req, res) => {
  const user_id = req.user.user_id;
  const { name, cgpa, skills, resume_url, degree_url } = req.body;

  if (!name || !cgpa) {
    return res.status(400).json({ message: 'name and cgpa are required' });
  }

  Student.findByUserId(user_id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Profile not found. Create one first.' });
    }

    const data = { name, cgpa, skills, resume_url, degree_url };
    Student.update(user_id, data, (err2) => {
      if (err2) return res.status(500).json({ message: 'Error updating profile', error: err2.message });
      return res.status(200).json({ message: 'Profile updated successfully' });
    });
  });
};

module.exports = { getProfile, createProfile, updateProfile };