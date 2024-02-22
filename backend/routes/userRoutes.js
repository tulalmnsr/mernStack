// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update-profile', authenticate, userController.updateProfile);
router.delete('/delete-account', authenticate, userController.deleteUser);

module.exports = router;

