const config = require("./config");
const leftpad = require("left-pad")

function ParrotFramesReader(parrotType) {
    this.parrotType = parrotType;
}

ParrotFramesReader.prototype.getFrames = function() {
    var frames = [];
    for(var i = 1; i <= 10; i++) {
        frames.push(`${config.baseParrots}/${this.parrotType}/frame-${leftpad(i, 3, '0')}.png`);
    }
    return frames;
}

module.exports = ParrotFramesReader;