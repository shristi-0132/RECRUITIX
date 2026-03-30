const Job = require('../models/Job');
const Shortlist = require('../models/Shortlist');
const db = require('../config/db');

exports.createJob = async (req, res) => {
  try {
    const { title, description, required_skills, min_cgpa } = req.body;
    const company_id = req.user.company_id;

    if (!title || !description) {
      return res.status(400).json({ error: 'title and description are required' });
    }

    await Job.create(
      company_id,
      title,
      description,
      required_skills,
      min_cgpa
    );

    res.status(201).json({
      message: 'Job created successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApplicants = async (req, res) => {
  try {
    const { job_id } = req.params;

    const [rows] = await db.query(
      `SELECT application_id, student_id, job_id, status 
       FROM application 
       WHERE job_id = ?`,
      [job_id]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.shortlistCandidate = async (req, res) => {
  try {
    const { application_id } = req.params;

    if (!application_id) {
      return res.status(400).json({ error: 'application_id is required' });
    }

    await Shortlist.create(application_id);

    res.status(201).json({
      message: 'Candidate shortlisted successfully'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};