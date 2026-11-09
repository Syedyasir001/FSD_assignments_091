// Middleware to restrict access based on user roles (e.g. 'admin', 'student')
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User authentication required.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access denied. Role '${req.user.role}' is not authorized to access this resource. Required role: ${allowedRoles.join(' or ')}.`
      });
    }

    next();
  };
};

module.exports = authorizeRoles;

