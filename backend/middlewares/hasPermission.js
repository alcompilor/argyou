import mongoose from 'mongoose';

const hasPermission = (requiredRole, matchUsernameParam) => {
  return async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).send('Access denied. No token provided.');
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;

      // Check if the role matches
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).send('Access denied. Insufficient permissions.');
      }

      // Check if the username needs to match the URL parameter
      if (matchUsernameParam && req.params[matchUsernameParam] !== decoded.username) {
        return res.status(403).send('Access denied. Username mismatch.');
      }

      next();
    } catch (error) {
      return res.status(403).send(`Invalid token. ${error.message}`);
    }
  };
};

export default hasPermission;
