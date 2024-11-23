const User = require('../models/user.model');

function deleteUserFromUsername(req,res,next) {
    const username = req.body.username;

    User.deleteUserFromUsername(username).then((result) => {
            console.log(result);
            res.status(201).json({success: "OK!"});
    }).catch((err) => {
        console.log(err.stack);
            res.status(401).json({failed: "user deleting operation has failed!"});
    });

}


module.exports = deleteUserFromUsername;