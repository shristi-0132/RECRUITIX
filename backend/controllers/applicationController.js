const Student = require("../models/Student");
const Application = require("../models/Application");

/* =========================
   APPLY TO JOB
========================= */
const applyToJob = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { job_id } = req.body;

    if (!job_id) {
      return res.status(400).json({
        message: "job_id is required",
      });
    }

    const student = await Student.findByUserId(user_id);

    if (!student) {
      return res.status(404).json({
        message:
          "Student profile not found. Please create profile first.",
      });
    }

    const duplicate = await Application.findDuplicate(
      student.student_id,
      job_id
    );

    if (duplicate.length > 0) {
      return res.status(409).json({
        message: "You already applied for this job",
      });
    }

    const result = await Application.create(
      student.student_id,
      job_id
    );

    return res.status(201).json({
      message: "Application submitted successfully",
      application_id: result.insertId,
    });
  } catch (error) {
    console.error("APPLY ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* =========================
   MY APPLICATIONS
========================= */
const getMyApplications = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const student = await Student.findByUserId(user_id);

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found.",
      });
    }

    const applications =
      await Application.findByStudentId(
        student.student_id
      );

    return res.status(200).json({
      total: applications.length,
      applications,
    });
  } catch (error) {
    console.error(
      "GET APPLICATIONS ERROR:",
      error
    );

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* =========================
   SHORTLISTED JOBS
========================= */
const getShortlistedJobs = async (
  req,
  res
) => {
  try {
    const user_id = req.user.user_id;

    const student = await Student.findByUserId(
      user_id
    );

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found.",
      });
    }

    const jobs =
      await Application.findShortlistedByStudentId(
        student.student_id
      );

    return res.status(200).json({
      total: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(
      "SHORTLIST ERROR:",
      error
    );

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  applyToJob,
  getMyApplications,
  getShortlistedJobs,
};