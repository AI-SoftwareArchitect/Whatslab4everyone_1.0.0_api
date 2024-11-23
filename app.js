// libs
const express = require('express');
const app = require('./app/express.app');
const bodyParser = require('body-parser');


// routers
const signupRouter = require('./routes/signup.route');
const deleteRouter = require('./routes/delete.route');
const contactRouter = require('./routes/contact.route');
const loginRouter = require('./routes/login.route');
const newsRouter = require('./routes/news.route');
const profileRouter = require('./routes/profile.route');

// http server
const server = require('./server/server.http');

// constants
const port = 3000;

// socket
const SocketService = require('./services/socket.service');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/images', express.static('images'));


// adding routers to app
app.use('/signup',signupRouter);
app.use('/delete',deleteRouter);
app.use('/contact',contactRouter);
app.use('/login',loginRouter);
app.use('/news',newsRouter);
app.use('/profile',profileRouter);

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// Sunucuyu başlat
server.listen(port, () => {
    SocketService.start();
    console.log(`Server is running at http://localhost:${port}`);
});

/*
unit test
integration test
redis
express-validator
express-rate-limit
cors
*/