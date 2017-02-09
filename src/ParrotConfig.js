function ParrotConfig(parrotType) {
    this.parrotType = parrotType;
    this.parrotConfig = require("./parrotConfigs/" + parrotType);
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

module.exports = ParrotConfig;