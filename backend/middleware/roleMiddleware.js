const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found on request." });
    }
 
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: Role '${req.user.role}' is not allowed to access this resource.`,
      });
    }
 
    next();
  };
};
 
module.exports = { allowRoles };
