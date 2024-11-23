const server = require('../server/server.http');
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
      origin: "*", // İzin verilen kaynak (istemci)
      //allowedHeaders: ["my-custom-header"], // İzin verilen özel başlıklar
      //credentials: true // Kimlik bilgilerine izin ver
    }
  });
module.exports = io;