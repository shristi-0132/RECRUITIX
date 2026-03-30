const express    = require('express');
const router     = express.Router();

// FIX: was importing default exports — both middleware files export named functions
const { verifyToken } = require('../middleware/authMiddleware');
const { allowRoles }  = require('../middleware/roleMiddleware');
const recruiterController = require('../controllers/recruiterController');

router.use(verifyToken);
router.use(allowRoles('recruiter'));

router.post('/company/profile', recruiterController.createCompanyProfile);
router.get('/company/profile',  recruiterController.getCompanyProfile);

module.exports = router;