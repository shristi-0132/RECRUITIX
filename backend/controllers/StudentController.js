// BUG FIXED: Student model is now async/await — removed all callback usage.
const Student = require('../models/Student');

const getProfile = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const results = await Student.findByUserId(user_id);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    return res.status(200).json({ profile: results[0] });
  } catch (err) {
    return res.status(500).json({ message: 'Database error', error: err.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { enrollment_no, name, cgpa, skills, resume_url, degree_url } = req.body;
    if (!enrollment_no || !name || !cgpa) {
      return res.status(400).json({ message: 'enrollment_no, name, and cgpa are required' });
    }
    const existing = await Student.findByUserId(user_id);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Profile already exists. Use PUT to update.' });
    }
    const result = await Student.create({ user_id, enrollment_no, name, cgpa, skills, resume_url, degree_url });
    return res.status(201).json({ message: 'Profile created successfully', student_id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Enrollment number already exists.' });
    }
    return res.status(500).json({ message: 'Error creating profile', error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { name, cgpa, skills, resume_url, degree_url } = req.body;
    if (!name || !cgpa) {
      return res.status(400).json({ message: 'name and cgpa are required' });
    }
    const existing = await Student.findByUserId(user_id);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Profile not found. Create one first.' });
    }
    await Student.update(user_id, { name, cgpa, skills, resume_url, degree_url });
    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

module.exports = { getProfile, createProfile, updateProfile };
