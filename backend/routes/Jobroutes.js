const express    = require('express');
const router     = express.Router();

// FIX: was importing default exports — both middleware files export named functions
const { verifyToken } = require('../middleware/authMiddleware');
const { allowRoles }  = require('../middleware/roleMiddleware');
const jobController = require('../controllers/jobController');

router.use(verifyToken);
router.use(allowRoles('recruiter'));

router.post('/job/create',              jobController.createJob);
router.get('/job/applicants/:job_id',   jobController.getApplicants);
router.post('/job/rank/:job_id',        jobController.rankApplicants);
router.post('/shortlist/:application_id', jobController.shortlistCandidate);

module.exports = router;