// BUG FIXED: Was importing 'requireRole' from roleMiddleware — the exported function
// is named 'allowRoles'. This would crash the server on startup.
const express      = require('express');
const router       = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { allowRoles }  = require('../middleware/roleMiddleware');
const { getProfile, createProfile, updateProfile } = require('../controllers/StudentController');

router.use(verifyToken);
router.use(allowRoles('student'));

router.get('/profile',  getProfile);
router.post('/profile', createProfile);
router.put('/profile',  updateProfile);

module.exports = router;
