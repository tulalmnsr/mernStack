// sessionController.js
const Session = require('../models/sessionModel');

const SessionController = {
  createSession: (userId) => {
    const token = generateRandomToken();
    const newSession = new Session({
      userId,
      token,
    });
    newSession.save();
    return token;
  },
};

function generateRandomToken() {
  return (
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  );
}

module.exports = SessionController;

