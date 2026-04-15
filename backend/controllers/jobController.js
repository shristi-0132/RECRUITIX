const Job = require("../models/Job");
const Shortlist = require("../models/Shortlist");
const db = require("../config/db");
const {
  rankCandidates,
} = require("../services/rankingService");

/* =========================
   POST /job/create
========================= */
exports.createJob = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      skills,
      expected_package,
      min_cgpa,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error:
          "title and description are required",
      });
    }

    await Job.create(
      req.user.user_id,
      title,
      description,
      skills,
      expected_package || 0,
      min_cgpa || 0
    );

    res.status(201).json({
      message:
        "Job created successfully",
    });
  } catch (error) {
    console.error(
      "CREATE JOB ERROR:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};

/* =========================
   GET /job/all
   FOR STUDENTS
========================= */
exports.getAllJobs = async (
  req,
  res
) => {
  try {
    const jobs =
      await Job.getAll();

    const jobsWithCount =
      jobs.map((job) => ({
        ...job,
        applicant_count: 0,
      }));

    res.status(200).json({
      jobs: jobsWithCount,
    });
  } catch (error) {
    console.error(
      "GET ALL JOBS ERROR:",
      error
    );

    res.status(500).json({
      error: error.message,
    });
  }
};

/* =========================
   GET /job/list
   FOR RECRUITER
========================= */
exports.getRecruiterJobs =
  async (req, res) => {
    try {
      console.log(
        "========== JOB LIST API =========="
      );

      console.log(
        "JWT user:",
        req.user
      );

      const recruiter_id =
        req.user.user_id;

      const jobs =
        await Job.getByCompanyId(
          recruiter_id
        );

      console.log(
        "Jobs fetched:",
        jobs
      );

      const jobsWithCount =
        jobs.map((job) => ({
          ...job,
          applicant_count: 0,
        }));

      console.log(
        "Final jobs response:",
        jobsWithCount
      );

      res.status(200).json({
        jobs: jobsWithCount,
      });
    } catch (error) {
      console.error(
        "GET JOB LIST ERROR:",
        error
      );

      res.status(500).json({
        error:
          error.message,
      });
    }
  };

/* =========================
   GET /job/applicants/:job_id
========================= */
exports.getApplicants =
  async (req, res) => {
    try {
      const {
        job_id,
      } = req.params;

      const [rows] =
        await db.execute(
          `
      SELECT a.application_id,
             a.student_id,
             a.job_id,
             a.status,
             a.ranking_order,
             s.name,
             s.cgpa,
             s.skills,
             s.resume_url
      FROM applications a
      JOIN student_profiles s
        ON a.student_id = s.student_id
      WHERE a.job_id = ?
      ORDER BY a.ranking_order ASC
      `,
          [job_id]
        );

      res.status(200).json({
        total:
          rows.length,
        applicants:
          rows,
      });
    } catch (error) {
      console.error(
        "GET APPLICANTS ERROR:",
        error
      );

      res.status(500).json({
        error:
          error.message,
      });
    }
  };

/* =========================
   POST /shortlist/:application_id
========================= */
exports.shortlistCandidate =
  async (req, res) => {
    try {
      const {
        application_id,
      } = req.params;

      const existing =
        await Shortlist.getByApplicationId(
          application_id
        );

      if (existing) {
        return res
          .status(409)
          .json({
            error:
              "Candidate already shortlisted.",
          });
      }

      await Shortlist.create(
        application_id
      );

      await db.execute(
        `
      UPDATE applications
      SET status = 'shortlisted'
      WHERE application_id = ?
      `,
        [application_id]
      );

      res.status(201).json({
        message:
          "Candidate shortlisted successfully",
      });
    } catch (error) {
      console.error(
        "SHORTLIST ERROR:",
        error
      );

      res.status(500).json({
        error:
          error.message,
      });
    }
  };

/* =========================
   POST /job/rank/:job_id
========================= */
exports.rankApplicants =
  async (req, res) => {
    try {
      const {
        job_id,
      } = req.params;

      const job =
        await Job.getById(
          job_id
        );

      if (!job) {
        return res
          .status(404)
          .json({
            error:
              "Job not found.",
          });
      }

      const [
        applicants,
      ] =
        await db.execute(
          `
      SELECT a.application_id,
             a.student_id,
             s.cgpa,
             s.skills
      FROM applications a
      JOIN student_profiles s
        ON a.student_id = s.student_id
      WHERE a.job_id = ?
      `,
          [job_id]
        );

      const ranked =
        rankCandidates(
          applicants,
          job
        );

      for (const applicant of ranked) {
        await db.execute(
          `
          UPDATE applications
          SET ranking_order = ?
          WHERE application_id = ?
          `,
          [
            applicant.ranking_order,
            applicant.application_id,
          ]
        );
      }

      res.status(200).json({
        message:
          "Candidates ranked successfully",
        ranked,
      });
    } catch (error) {
      console.error(
        "RANK ERROR:",
        error
      );

      res.status(500).json({
        error:
          error.message,
      });
    }
  };