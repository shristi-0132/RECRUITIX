const Company = require('../models/Company');

exports.createCompanyProfile = async (req, res) => {
  try {
    const { company_name } = req.body;
    const user_id = req.user.user_id;

    if (!company_name) {
      return res.status(400).json({ error: 'company_name is required' });
    }

    await Company.create(user_id, company_name);

    res.status(201).json({
      message: 'Company profile created successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};