const config = require("./config");

function ParrotConfig(parrotType) {
    this.parrotType = parrotType;
    this.parrotConfig = require("./parrotconfigs/" + parrotType);
}

ParrotConfig.prototype.getHeight = function() {
    return this.parrotConfig.height || config.HEIGHT;
}

ParrotConfig.prototype.getWidth = function() {
    return this.parrotConfig.width || config.WIDTH;
}

ParrotConfig.prototype.getParrotType = function() {
    return this.parrotType;
}

ParrotConfig.prototype.getFollowingFrames = function() {
    return this.parrotConfig.followingFrames;
}

ParrotConfig.prototype.getNumberOfFrames = function() {
    return this.parrotConfig.followingFrames.length;
}

ParrotConfig.prototype.shouldFlipX = function() {
    return this.parrotConfig.flipX || false;
}

ParrotConfig.prototype.shouldFlipY = function() {
    return this.parrotConfig.flipY || false;
}

module.exports = ParrotConfig;
