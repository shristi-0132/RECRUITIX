const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'recruitix_secret_key';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.user_id || !decoded.role) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.user = {
      user_id: decoded.user_id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };
