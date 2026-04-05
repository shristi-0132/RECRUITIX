// BUG FIXED: Was importing 'requireRole' from roleMiddleware — the exported function
// is named 'allowRoles'. This would crash the server on startup.
const express      = require('express');
const router       = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { allowRoles }  = require('../middleware/roleMiddleware');
const { applyToJob, getMyApplications } = require('../controllers/applicationController');

router.use(verifyToken);
router.use(allowRoles('student'));

router.post('/apply',        applyToJob);
router.get('/applications',  getMyApplications);

module.exports = router;
