const express = require('express');
const newsController = require('../controllers/news.controller');
const newsRouter = express.Router();

newsRouter.get('/' , newsController.sendNewsToClient);

module.exports = newsRouter;