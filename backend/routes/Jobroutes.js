const express = require("express");
const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const {
  allowRoles,
} = require("../middleware/roleMiddleware");

const jobController =
  require("../controllers/jobController");

/* =========================
   STUDENT + RECRUITER
========================= */

// Get all jobs (students need this)
router.get(
  "/job/all",
  verifyToken,
  jobController.getAllJobs
);

/* =========================
   RECRUITER ONLY
========================= */

// Create job
router.post(
  "/job/create",
  verifyToken,
  allowRoles("recruiter"),
  jobController.createJob
);

// Get recruiter's own jobs
router.get(
  "/job/list",
  verifyToken,
  allowRoles("recruiter"),
  jobController.getRecruiterJobs
);

// Get applicants
router.get(
  "/job/applicants/:job_id",
  verifyToken,
  allowRoles("recruiter"),
  jobController.getApplicants
);

// Rank applicants
router.post(
  "/job/rank/:job_id",
  verifyToken,
  allowRoles("recruiter"),
  jobController.rankApplicants
);

// Shortlist candidate
router.post(
  "/shortlist/:application_id",
  verifyToken,
  allowRoles("recruiter"),
  jobController.shortlistCandidate
);

module.exports = router;