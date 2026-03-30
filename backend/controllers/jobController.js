const Job      = require('../models/Job');
const Shortlist = require('../models/Shortlist');
const Company   = require('../models/Company');
const db        = require('../config/db');
const { rankCandidates } = require('../services/rankingService');

// POST /recruiter/job/create
exports.createJob = async (req, res) => {
  try {
    // FIX 1: field was 'required_skills' — correct name is 'skills'
    // FIX 2: added expected_package which was missing
    const { title, description, skills, expected_package, min_cgpa } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'title and description are required' });
    }

    // FIX 3: company_id is NOT in the JWT — must fetch from DB using user_id
    const company = await Company.getByUserId(req.user.user_id);
    if (!company) {
      return res.status(404).json({ error: 'Company profile not found. Create one first.' });
    }
    const company_id = company.company_id;

    await Job.create(company_id, title, description, skills, expected_package || 0, min_cgpa || 0);
    res.status(201).json({ message: 'Job created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /recruiter/job/applicants/:job_id
exports.getApplicants = async (req, res) => {
  try {
    const { job_id } = req.params;

    // FIX 4: table was 'application' — correct name is 'applications'
    const [rows] = await db.execute(
      `SELECT a.application_id, a.student_id, a.job_id, a.status, a.ranking_order,
              s.name, s.cgpa, s.skills, s.resume_url
       FROM applications a
       JOIN students s ON a.student_id = s.student_id
       WHERE a.job_id = ?
       ORDER BY a.ranking_order ASC`,
      [job_id]
    );

    res.status(200).json({ total: rows.length, applicants: rows });
  } catch (error) {
    // FIX 5: response was cut off and incomplete
    res.status(500).json({ error: error.message });
  }
};

// POST /recruiter/shortlist/:application_id
// FIX 6: this function was referenced in routes but never defined
exports.shortlistCandidate = async (req, res) => {
  try {
    const { application_id } = req.params;

    // Check it exists and isn't already shortlisted
    const existing = await Shortlist.getByApplicationId(application_id);
    if (existing) {
      return res.status(409).json({ error: 'Candidate already shortlisted.' });
    }

    // Insert into shortlists table
    await Shortlist.create(application_id);

    // Keep applications.status in sync
    await db.execute(
      `UPDATE applications SET status = 'shortlisted' WHERE application_id = ?`,
      [application_id]
    );

    res.status(201).json({ message: 'Candidate shortlisted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /recruiter/job/rank/:job_id
exports.rankApplicants = async (req, res) => {
  try {
    const { job_id } = req.params;

    const job = await Job.getById(job_id);
    if (!job) return res.status(404).json({ error: 'Job not found.' });

    const [applicants] = await db.execute(
      `SELECT a.application_id, a.student_id, s.cgpa, s.skills
       FROM applications a
       JOIN students s ON a.student_id = s.student_id
       WHERE a.job_id = ?`,
      [job_id]
    );

    const ranked = rankCandidates(applicants, job);

    // Save ranking_order back to applications table
    for (const applicant of ranked) {
      await db.execute(
        'UPDATE applications SET ranking_order = ? WHERE application_id = ?',
        [applicant.ranking_order, applicant.application_id]
      );
    }

    res.status(200).json({ message: 'Candidates ranked successfully', ranked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};