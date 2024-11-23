const http = require('http');
const app = require('../app/express.app');
const server = http.createServer(app);

module.exports = server;