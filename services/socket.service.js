const io = require('../socket/socket');

let clients = new Map();

class SocketService {
    static start() {
        io.on('connection', (socket) => {
            console.log('Yeni bir istemci bağlandı:', socket.id);
        
            // İstemciden ID al
            socket.on('register', (id) => {
                clients.set(id, socket.id);
                console.log(`İstemci ${id} kaydedildi: ${socket.id}`);
                io.to(socket.id).emit('friendRequest' , {senderuuid:"123456" , sendername: "john doe" });
            });


            socket.on('chat', (data) => {
                const { recipientId, senderId, messageContent, date } = data;
                console.log(`Data received: ${senderId} to ${recipientId}: ${messageContent}`);
                const targetSocketId = clients.get(recipientId);
                if (targetSocketId) {
                    // Burada mesajı hedef cliente gönderirken orijinal göndericiyi koruyoruz
                    io.to(targetSocketId).emit('chat', {
                        recipientId: recipientId,
                        senderId: senderId,  // Orijinal gönderici
                        messageContent: messageContent,
                        date: date
                    });
                }
            });

            socket.on('disconnect', () => {
                console.log('İstemci ayrıldı:', socket.id);
                for (const [id, clientSocketId] of clients.entries()) {
                    if (clientSocketId === socket.id) {
                        clients.delete(id);
                        console.log(`İstemci ${id} kaydedildi.`);
                        break;
                    }
                }
            });
        });
    }
}

module.exports = SocketService;

//---
/*
socket.on('accept' , (data)=> {
    const senderUuid = data["senderUuid"];
    const acceptState = data["acceptState"];
    console.log(acceptState);
    const targetSocketId = clients.get(senderUuid);
    const message = "successful accepted!";
    if (targetSocketId) {
        io.to(targetSocketId).emit('acceptRequest', message);
        console.log(`Mesaj gönderildi ${senderUuid} için: ${message}`);
    } else {
        console.log(`ID ${senderUuid} için istemci bulunamadı.`);
    }
});
*/      


// Belirli bir ID'ye mesaj gönder
            /*
            socket.on('friendRequest', (id, message) => {
                const targetSocketId = clients.get(id);
                if (targetSocketId) {
                    io.to(targetSocketId).emit('friendRequest', message);
                    console.log(`Mesaj gönderildi ${id} için: ${message}`);
                } else {
                    console.log(`ID ${id} için istemci bulunamadı.`);
             }
            });*/ 
// -----------------------------