var parrotConfig = require("./parrot");
var timesBigger = 9; // Very approximately accurate.

var config = {
    width:320,
    height:229,
    followingFrames:parrotConfig.followingFrames.map(frame => {
        return {
            x: frame.x * timesBigger,
            y: frame.y * timesBigger
        };
    })
};

module.exports = config;