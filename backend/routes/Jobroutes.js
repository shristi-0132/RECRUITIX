const express = require('express');
const router = express.Router();

const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Create Job
router.post(
  '/job/create',
  authMiddleware,
  roleMiddleware('recruiter'),
  jobController.createJob
);

// Get Applicants for a Job
router.get(
  '/job/applicants/:job_id',
  authMiddleware,
  roleMiddleware('recruiter'),
  jobController.getApplicants
);

// Shortlist Candidate
router.post(
  '/shortlist/:application_id',
  authMiddleware,
  roleMiddleware('recruiter'),
  jobController.shortlistCandidate
);

module.exports = router;