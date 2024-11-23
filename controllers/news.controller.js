const fs = require("fs");

const sendNewsToClient = (req, res, next) => {
    fs.readFile("./news/news.json", function(err, data) {
        if (err) {
            res.status(400).send("Error reading file: " + err);
        } else {
            try {
                const news = JSON.parse(data);
                res.status(200).json(news);
            } catch (e) {
                res.status(400).send("Error parsing JSON: " + e);
            }
        }
    });
};

module.exports = { sendNewsToClient };
