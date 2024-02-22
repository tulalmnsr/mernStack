const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the 'Authorization' header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if the token is missing
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token.' });
    }

    // Verify the token using the provided secret
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the decoded token's user ID
    const user = await User.findById(decodedToken.userId);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }

    // Attach the user ID to the request object for further use
    req.user = { id: user._id };

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);

    // Handle TokenExpiredError separately with a 403 Forbidden response
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ error: 'Forbidden: Token expired.' });
    }

    // Handle other token-related errors with a 401 Unauthorized response
    return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
};

module.exports = authenticate;
