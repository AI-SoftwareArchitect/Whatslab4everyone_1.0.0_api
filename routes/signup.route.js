const express = require('express');
const signupRouter = express.Router();
const { signup } = require('../controllers/signup.controller');

signupRouter.post('/' , signup);

module.exports = signupRouter;