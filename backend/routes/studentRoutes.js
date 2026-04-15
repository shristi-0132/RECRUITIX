const express = require("express");
const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const {
  allowRoles,
} = require("../middleware/roleMiddleware");

const {
  getProfile,
  createProfile,
  updateProfile,
} = require("../controllers/studentController");

const {
  applyToJob,
  getMyApplications,
  getShortlistedJobs,
} = require("../controllers/applicationController");

/* middleware */
router.use(verifyToken);
router.use(allowRoles("student"));

/* student profile */
router.get("/profile", getProfile);
router.post("/profile", createProfile);
router.put("/profile", updateProfile);

/* applications */
router.post("/apply", applyToJob);
router.get(
  "/applications",
  getMyApplications
);
router.get(
  "/shortlisted",
  getShortlistedJobs
);

module.exports = router;