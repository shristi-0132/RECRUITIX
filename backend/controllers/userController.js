// BUG FIXED 1: Was importing require("../db") — correct path is require("../config/db").
// BUG FIXED 2: Removed created_at / updated_at from SELECT — those columns don't exist on users table.
const db = require('../config/db');

const getMe = async (req, res) => {
  try {
    const { user_id } = req.user;
    const [rows] = await db.execute(
      'SELECT user_id, email, role FROM users WHERE user_id = ?',
      [user_id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ user: rows[0] });
  } catch (error) {
    console.error('getMe error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const [rows] = await db.execute(
      'SELECT user_id, email, role FROM users WHERE user_id = ?',
      [user_id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ user: rows[0] });
  } catch (error) {
    console.error('getUserById error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const updateMe = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
    const [existing] = await db.execute(
      'SELECT user_id FROM users WHERE email = ? AND user_id != ?',
      [email, user_id]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }
    await db.execute(
      'UPDATE users SET email = ? WHERE user_id = ?',
      [email, user_id]
    );
    return res.status(200).json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error('updateMe error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { getMe, getUserById, updateMe };
