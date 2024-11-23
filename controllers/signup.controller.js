const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
require('dotenv').config();

const signup = async (req, res, next) => {
    const { username, email, password, lastseen } = req.body;

    const hashedpassword = bcrypt.hashSync(password, 10);
    const updatedat = new Date().toISOString();

    await User.insertNewUser({
        username,
        email,
        updatedat,
        hashedpassword,
        lastseen
    })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {res.send("insert error!"); console.log(err.stack);});




    // Add any other logic or response handling here
};

module.exports = { signup };
