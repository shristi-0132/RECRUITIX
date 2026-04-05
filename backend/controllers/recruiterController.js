const Company = require('../models/Company');

exports.createCompanyProfile = async (req, res) => {
  try {
    const { company_name, description, website } = req.body;
    const user_id = req.user.user_id;

    if (!company_name) {
      return res.status(400).json({ error: 'company_name is required' });
    }

    // Check if profile already exists
    const existing = await Company.getByUserId(user_id);
    if (existing) {
      return res.status(409).json({ error: 'Company profile already exists.' });
    }

    await Company.create(user_id, company_name, description, website);
    res.status(201).json({ message: 'Company profile created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.getByUserId(req.user.user_id);
    if (!company) {
      return res.status(404).json({ error: 'Company profile not found.' });
    }
    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};