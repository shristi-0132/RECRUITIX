const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

const { applyToJob, getMyApplications } = require('../controllers/applicationController');

// All routes require a valid JWT and student role
router.use(verifyToken);
router.use(allowRoles('student'));

// POST  /student/apply          → apply to a job  (body: { job_id })
// GET   /student/applications   → view all my applications
router.post('/apply', applyToJob);
router.get('/applications', getMyApplications);

module.exports = router;