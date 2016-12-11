const GIFEncoder = require('gifencoder');
const ParrotFramesReader = require("./ParrotFramesReader");
const ParrotFrameHandler = require("./ParrotFrameHandler");
const ImageFactory = require("./ImageFactory");
const config = require("./config");

function ParrotConstructor(writeStream, parrotConstructorConfiguration) {
    this.parrotFrameHandlers = [];
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
    let framesReader = new ParrotFramesReader(parrotType);

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
        this.parrotFrameHandlers.map(handler => {
            handler.addImage(image);
        });
    });
}

ParrotConstructor.prototype.addFollowingOverlayImage = function(overlay, offsetX, offsetY, width, height) {
    let followingFrames = config.followingFrames;
    return this.imageFactory.get(overlay).then((image) => {
        this.parrotFrameHandlers.map((handler, index) => {
            handler.addResizedImage(image, 
                                    followingFrames[index].x + (offsetX || 0), 
                                    followingFrames[index].y + (offsetY || 0), 
                                    width || image.width, 
                                    height || image.height);
        })
    })
}

ParrotConstructor.prototype.finish = function() {
    this.parrotFrameHandlers.forEach(handler => {
        this.encoder.addFrame(handler.getFrame());
    });
    this.encoder.finish();
}

module.exports = ParrotConstructor;