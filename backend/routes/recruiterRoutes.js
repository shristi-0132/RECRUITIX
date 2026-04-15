const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

/* controllers */
const recruiterController = require("../controllers/recruiterController");
const jobController = require("../controllers/jobController");

/* middleware */
router.use(verifyToken);
router.use(allowRoles("recruiter"));

/* company profile */
router.post(
  "/company/profile",
  recruiterController.createCompanyProfile
);

router.get(
  "/company/profile",
  recruiterController.getCompanyProfile
);

/* jobs */
router.post(
  "/job/create",
  jobController.createJob
);

router.get(
  "/job/list",
  jobController.getRecruiterJobs
);

router.get(
  "/job/applicants/:job_id",
  jobController.getApplicants
);

router.post(
  "/job/rank/:job_id",
  jobController.rankApplicants
);

router.post(
  "/shortlist/:application_id",
  jobController.shortlistCandidate
);

module.exports = router;