const express = require('express');
const profileController = require('../controllers/profile.controller');
const authenticateProtection = require('../controllers/auth.controller');
const profileRouter = express.Router();

profileRouter.post('/set-profile-image' , authenticateProtection , profileController.setProfileImage);

module.exports = profileRouter;