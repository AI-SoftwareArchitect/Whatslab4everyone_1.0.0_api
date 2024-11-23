const express = require('express');
const deleteUserFromUsername = require('../controllers/delete.controller');
const deleteRouter = express.Router();

deleteRouter.post('/' , deleteUserFromUsername );

module.exports = deleteRouter;