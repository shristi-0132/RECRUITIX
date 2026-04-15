const Student = require("../models/Student");

// GET /student/profile
const getProfile = async (req, res) => {
  try {
    const user_id =
      req.user.user_id;

    const student =
      await Student.findByUserId(
        user_id
      );

    if (!student) {
      return res
        .status(404)
        .json({
          message:
            "Student profile not found",
        });
    }

    return res
      .status(200)
      .json({
        profile: student,
      });
  } catch (err) {
    console.error(
      "GET PROFILE ERROR:",
      err
    );

    return res
      .status(500)
      .json({
        message:
          "Database error",
        error:
          err.message,
      });
  }
};

// POST /student/profile
const createProfile =
  async (req, res) => {
    try {
      const user_id =
        req.user.user_id;

      const {
        enrollment_no,
        name,
        cgpa,
        skills,
        resume_url,
        degree_url,
      } = req.body;

      if (
        !enrollment_no ||
        !name ||
        !cgpa
      ) {
        return res
          .status(400)
          .json({
            message:
              "enrollment_no, name, and cgpa are required",
          });
      }

      const existing =
        await Student.findByUserId(
          user_id
        );

      if (existing) {
        return res
          .status(409)
          .json({
            message:
              "Profile already exists",
          });
      }

      const result =
        await Student.create({
          user_id,
          enrollment_no,
          name,
          cgpa,
          skills,
          resume_url,
          degree_url,
        });

      return res
        .status(201)
        .json({
          message:
            "Profile created successfully",
          student_id:
            result.insertId,
        });
    } catch (err) {
      console.error(
        "CREATE PROFILE ERROR:",
        err
      );

      return res
        .status(500)
        .json({
          message:
            "Error creating profile",
          error:
            err.message,
        });
    }
  };

// PUT /student/profile
const updateProfile =
  async (req, res) => {
    try {
      const user_id =
        req.user.user_id;

      const {
        name,
        cgpa,
        skills,
        resume_url,
        degree_url,
      } = req.body;

      const existing =
        await Student.findByUserId(
          user_id
        );

      if (!existing) {
        return res
          .status(404)
          .json({
            message:
              "Profile not found",
          });
      }

      await Student.update(
        user_id,
        {
          name,
          cgpa,
          skills,
          resume_url,
          degree_url,
        }
      );

      return res
        .status(200)
        .json({
          message:
            "Profile updated successfully",
        });
    } catch (err) {
      console.error(
        "UPDATE PROFILE ERROR:",
        err
      );

      return res
        .status(500)
        .json({
          message:
            "Error updating profile",
          error:
            err.message,
        });
    }
  };

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
};