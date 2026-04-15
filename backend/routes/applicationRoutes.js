const express = require("express");
const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const {
  allowRoles,
} = require("../middleware/roleMiddleware");

const {
  applyToJob,
  getMyApplications,
  getShortlistedJobs,
} = require("../controllers/applicationController");

router.use(verifyToken);
router.use(
  allowRoles("student")
);

router.post(
  "/apply",
  applyToJob
);

router.get(
  "/applications",
  getMyApplications
);

router.get(
  "/shortlisted",
  getShortlistedJobs
);

module.exports = router;