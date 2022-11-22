const path = require("path");

var config = {
    WIDTH:35,
    HEIGHT:25,
    baseParrots: path.join(process.cwd(), "baseparrots"),
    whiteBaseParrots: path.join(process.cwd(), "baseparrots-white")
};

module.exports = config;