const { v4: uuidv4 } = require('uuid');
const prisma = require('../prismaClient/prisma.client');

class User {

    static async insertNewUser(userData) {
        const updatedat = new Date().toISOString();
        const userId = uuidv4();
        return await prisma.user.create({
            data: {
                id: userId,
                username: userData.username,
                email: userData.email,
                updatedat: updatedat,
                hashedpassword: userData.hashedpassword,
                lastseen: "2024-06-20T00:00:00.000Z",
                updatedat: new Date().toISOString()
            }
        });
    }

    static async deleteUserFromUsername(_username) {
        const user = await prisma.user.findMany({
            where: {
                username: _username,
            },
        });
    
        // Eğer kullanıcı bulunursa, sil
        if (user[0]) {
            return await prisma.user.deleteMany({
                where: {
                    id: user[0].id, // Kullanıcının id'sini kullanarak sil
                },
            });
        } else {
            throw new Error("Kullanıcı bulunamadı");
        }
    }

    
}


module.exports = User;