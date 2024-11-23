const express = require('express');
const {insertContactFriendPair , getContactsFromUuid, getContactsExtended} = require('../controllers/contact.controller');
const authenticateProtection = require('../controllers/auth.controller');
const contactRouter = express.Router();

contactRouter.post('/new-contact-pair',insertContactFriendPair);
contactRouter.post('/get-contacts' , authenticateProtection , getContactsFromUuid);
contactRouter.post('/get-contacts-extended' , getContactsExtended);

module.exports = contactRouter;