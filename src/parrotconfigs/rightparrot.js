var parrotConfig = require("./parrot");

var config = {
    followingFrames:parrotConfig.followingFrames.map(frame => {
        return {
            x: 18 - frame.x,
            y: frame.y
        };
    })
}

module.exports = config;