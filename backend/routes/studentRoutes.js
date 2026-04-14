const express = require('express');
const router = express.Router();

// Middleware from Aditya's auth module
const { verifyToken } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

const { getProfile, createProfile, updateProfile } = require('../controllers/studentController');

// All routes below require a valid JWT and student role
router.use(verifyToken);
router.use(allowRoles('student'));

// GET    /student/profile   → fetch profile
// POST   /student/profile   → create profile
// PUT    /student/profile   → update profile
router.get('/profile', getProfile);
router.post('/profile', createProfile);
router.put('/profile', updateProfile);

module.exports = router;