const { v4: uuidv4 } = require('uuid');
const prisma = require('../prismaClient/prisma.client');

class Contacts {

    static async insertNewContactFriendPair(contact) {
        const updatedat = new Date().toISOString();
        await prisma.contacts.create({
            data: {
                userid: contact.userid,
                frienduserid: contact.frienduserid,
                updatedat: updatedat,
            }
        }).then( async (result) => {
            await prisma.contacts.create({
                data: {
                    userid: contact.frienduserid,
                    frienduserid: contact.userid,
                    updatedat: updatedat
                }
            })
            .then((other) => {
                return "success";
            })
            .catch((otherErr) => {
                console.log(otherErr.stack);
                return "other_insert_err";
            });
        })
        .catch((err) => {
            console.log(err.stack);
            return "insert_err";
        });
    }

    static async getContactsFromUuid(uuid) {
        return await prisma.contacts.findMany({
            where: {
                userid: uuid,
              },
        });
    }
    
    static async getContactsExtendedFromUuid(uuid) {
        // Önce frienduserid'leri almak için contacts sorgusu yapıyoruz
        const contacts = null;
        try {
         contacts = await prisma.contacts.findMany({
            where: {
                userid: uuid,
            },
            select: {
                frienduserid: true, // Sadece frienduserid'leri alıyoruz
            },
        });
        }catch(err) {
            console.log("There is no any contact!");
        }
        
        if (!contacts) {
            return;
        }
        // frienduserid'leri bir diziye dönüştürüyoruz
        const friendUserIds = contacts.map(contact => contact.frienduserid);
    
        // Şimdi friendUserIds dizisini kullanarak User sorgusunu yapıyoruz
        return await prisma.user.findMany({
            where: {
                id: {
                    in: friendUserIds, // frienduserid'leri burada kullanıyoruz
                },
            },
            include: {
                Profile: {
                    select: {
                        profilepicturename: true,
                    },
                },
            },
        }).then(users => {
            return users.map(user => {
                return {
                    frienduserid: user.id,
                    username: user.username,
                    profileImageName: user.Profile?.profilepicturename || "no image", // "no image" varsayılan değeri
                };
            });
        });
    }
    
    

}

module.exports = Contacts;