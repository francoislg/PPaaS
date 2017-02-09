const config = require("./config");
const leftpad = require("left-pad")

function ParrotFramesReader(parrotConfig) {
    this.parrotConfig = parrotConfig;
}

ParrotFramesReader.prototype.getFrames = function() {
    let frames = [];
    let numberOfFrames = this.parrotConfig.getNumberOfFrames();
    for(var i = 1; i <= numberOfFrames; i++) {
        frames.push(`${config.baseParrots}/${this.parrotConfig.getParrotType()}/frame-${leftpad(i, 3, '0')}.png`);
    }
    return frames;
}

module.exports = ParrotFramesReader;