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

ParrotConstructor.prototype.addFollowingOverlayImage = function(overlay, offsetX, offsetY, width, height) {
    let followingFrames = this.parrotConfig.getFollowingFrames();
    return this.imageFactory.get(overlay).then((image) => {
        this.getFramesHandlers().map((handler, index) => {
            handler.addResizedImage(image, 
                                    followingFrames[index].x + (offsetX || 0), 
                                    followingFrames[index].y + (offsetY || 0), 
                                    width || image.width, 
                                    height || image.height);
        })
    })
}

ParrotConstructor.prototype.finish = function() {
    this.getFramesHandlers().forEach(handler => {
        this.encoder.addFrame(handler.getFrame());
    });
    this.encoder.finish();
}

module.exports = ParrotConstructor;