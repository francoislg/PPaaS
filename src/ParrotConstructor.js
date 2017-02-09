const GIFEncoder = require('gifencoder');
const ParrotFramesReader = require("./ParrotFramesReader");
const ParrotFrameHandler = require("./ParrotFrameHandler");
const ParrotConfig = require("./ParrotConfig");
const ImageFactory = require("./ImageFactory");
const config = require("./config");

function ParrotConstructor(writeStream, parrotConstructorConfiguration) {
    this.imageFactory = new ImageFactory();

    this.encoder = new GIFEncoder(config.WIDTH, config.HEIGHT);
    this.encoder.createReadStream().pipe(writeStream);
    this.encoder.start();
    this.encoder.setTransparent("#000000");
    this.encoder.setRepeat(0);
    this.encoder.setDelay(parrotConstructorConfiguration.delay || 40);

    this.setBaseParrot(parrotConstructorConfiguration.baseParrot || "parrot");
}

ParrotConstructor.prototype.setBaseParrot = function(parrotType) {
    this.parrotConfig = new ParrotConfig(parrotType);
}

ParrotConstructor.prototype.getFramesHandlers = function() {
    if(!this.parrotFrameHandlers) {
        this.initializeFramesHandlers();
    }
    return this.parrotFrameHandlers;
}

ParrotConstructor.prototype.initializeFramesHandlers = function() {
    let framesReader = new ParrotFramesReader(this.parrotConfig);

    this.parrotFrameHandlers = framesReader.getFrames().map((file) => {
        console.log(file);
        return this.imageFactory.fromFileSync(file);
    }).map((image) => {
        var frameHandler = new ParrotFrameHandler();
        frameHandler.addImage(image);
        return frameHandler;
    });
}

ParrotConstructor.prototype.addOverlayImage = function(overlay) {
    return this.imageFactory.get(overlay).then((image) => {
        this.getFramesHandlers().map(handler => {
            handler.addImage(image);
        });
    });
}

ParrotConstructor.prototype.addFollowingOverlayImage = function(overlay, offsetX, offsetY, width, height, flipX, flipY) {
    let followingFrames = this.parrotConfig.getFollowingFrames();

    if(this.parrotConfig.shouldFlipX()) {
        flipX = !flipX;
    }
    if(this.parrotConfig.shouldFlipY()) {
        flipY = !flipY;
    }

    return this.imageFactory.get(overlay).then((image) => {
        let imageHeight = parseInt(height || image.height);
        let imageWidth = parseInt(width || image.width);

        this.getFramesHandlers().map((handler, index) => {
            handler.addResizedImage(image, 
                                    flipPositionIfActivated(followingFrames[index].x, imageWidth, flipY) + (offsetX || 0), 
                                    flipPositionIfActivated(followingFrames[index].y, imageHeight, flipX) + (offsetY || 0), 
                                    flipSizeIfActivated(imageWidth, flipY), 
                                    flipSizeIfActivated(imageHeight, flipX));
        });
    });
}

function flipPositionIfActivated(currentPosition, size, flip) {
    return flip ? (currentPosition + size) : currentPosition;
}

function flipSizeIfActivated(currentSize, flip) {
    return flip ? currentSize * -1 : currentSize;
}

ParrotConstructor.prototype.finish = function() {
    this.getFramesHandlers().forEach(handler => {
        this.encoder.addFrame(handler.getFrame());
    });
    this.encoder.finish();
}

module.exports = ParrotConstructor;