var parrotConfig = require("./parrot");

var config = {
    flipY:true,
    followingFrames:parrotConfig.followingFrames.map(frame => {
        return {
            x: 25 - frame.x,
            y: frame.y
        };
    })
}

module.exports = config;