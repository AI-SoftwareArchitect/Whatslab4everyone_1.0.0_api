const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controllers/login.controller'); // Doğru yolu kontrol edin

// loginController'dan login fonksiyonunu kullanın
loginRouter.post('/', loginController.login); // loginController doğrudan fonksiyon olmalı

// refreshTokenController'dan refreshToken fonksiyonunu kullanın
loginRouter.post('/refresh-token', loginController.refreshToken); // refreshTokenController doğrudan fonksiyon olmalı

module.exports = loginRouter;
