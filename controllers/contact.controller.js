const Contacts = require('../models/contacts.model');

async function insertContactFriendPair(req,res,next) {
    const { userid , frienduserid } = req.body;
    try {
        await Contacts.insertNewContactFriendPair({userid: userid , frienduserid: frienduserid});
        res.status(201).send('pair added!');
    }catch(err) {
        console.log("insert contact error!");
        console.log(err.stack);
        res.status(401).send('insert contact error!');
    }

}

async function getContactsFromUuid(req, res, next) {
    const { uuid } = req.body;
  
    if (!uuid || uuid.length !== 36) {
      return res.status(400).send("Invalid UUID format");
    }
  
    try {
      const contacts = await Contacts.getContactsFromUuid(uuid);
  
      if (!contacts) {
        return res.status(404).send("No contacts found");
      }
  
      console.log(contacts);
      res.status(201).send(contacts);
    } catch (err) {
      console.log(err.stack);
      res.status(500).send("Server error");
    }
  }
  

async function getContactsExtended(req,res,next) {
    const {uuid} = req.body;

    try {
        const contactsExtended = await Contacts.getContactsExtendedFromUuid(uuid);
        console.log(contactsExtended);
        res.status(201).send(contactsExtended);
    } catch (error) {
        console.log(error.stack);
        res.status(401).send('get-contacts-extended-error');
    }
}

module.exports = {insertContactFriendPair , getContactsFromUuid , getContactsExtended};