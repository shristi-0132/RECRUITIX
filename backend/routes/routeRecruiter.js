const express = require('express');
const router = express.Router();

const recruiterController = require('../controllers/recruiterController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Create Company Profile
router.post(
  '/company/profile',
  authMiddleware,
  roleMiddleware('recruiter'),
  recruiterController.createCompanyProfile
);

module.exports = router;