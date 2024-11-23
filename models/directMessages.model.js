const prisma = require('../prismaClient/prisma.client');

class DirectMessages {

    static async insertNewDirectMessage(senderId,receiverId,content,sendDate,status) {
        await prisma.directMessages.create({
            data: {
                senderId: senderId,
                receiverId: receiverId,
                content: content,
                sendDate: sendDate,
                status: status
            }
        });
    }



}

module.exports = DirectMessages;