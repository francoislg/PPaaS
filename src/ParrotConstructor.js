const { GifEncoder } = require("@skyra/gifenc");
const ParrotFramesReader = require("./ParrotFramesReader");
const ParrotFrameHandler = require("./ParrotFrameHandler");
const ParrotConfig = require("./ParrotConfig");

class ParrotConstructor {
  constructor(imageFactory) {
    this.imageFactory = imageFactory;
    this.setBaseParrot("parrot");
  }

  async start(writeStream, configuration) {
    this.encoder = new GifEncoder(
      this.parrotConfig.getWidth(),
      this.parrotConfig.getHeight()
    );
    this.encoder.setRepeat(0);
    this.encoder.setTransparent("#000000");
    this.encoder.setDelay(configuration.delay || 40);
    this.encoder.createReadStream().pipe(writeStream);
    this.encoder.start();

    this.numberOfLoops = Math.ceil(
      (configuration.colors ? configuration.colors.length : 1) /
        this.parrotConfig.getNumberOfFrames()
    );
    this.colors = configuration.colors;
    await this.initializeFramesHandlers();
  }

  setBaseParrot(parrotType) {
    this.parrotConfig = new ParrotConfig(parrotType);
  }

  getFramesHandlers() {
    return this.parrotFrameHandlers;
  }

  async initializeFramesHandlers() {
    const loadWhiteParrot = !!this.colors;
    const framesReader = new ParrotFramesReader(
      this.parrotConfig,
      loadWhiteParrot
    );

    const allImages = await Promise.all(
      framesReader
        .getFramePaths()
        .map((file) => this.imageFactory.fromFile(file))
    );

    /** @type {ParrotFrameHandler[]} */
    const allFrameHandlers = [];

    for (let i = 0; i < this.numberOfLoops; i++) {
      allFrameHandlers.push(
        ...allImages.map((image) => {
          const frameHandler = new ParrotFrameHandler(this.parrotConfig);
          frameHandler.addImage(image);
          return frameHandler;
        })
      );
    }

    if (this.colors && this.colors.length > 0) {
      allFrameHandlers.forEach((frameHandler, i) => {
        frameHandler.applyColor(this.colors[i % this.colors.length]);
      });
    }

    this.parrotFrameHandlers = allFrameHandlers;
  }

  async addOverlayImage(overlay) {
    const image = await this.imageFactory.get(overlay);
    this.getFramesHandlers().forEach((handler) => {
      handler.addImage(image);
    });
  }

  async addFollowingOverlayImage(
    overlay,
    offsetX,
    offsetY,
    width,
    height,
    flipX,
    flipY
  ) {
    const followingFrames = this.parrotConfig.getFollowingFrames();

    if (this.parrotConfig.shouldFlipX()) {
      flipX = !flipX;
    }
    if (this.parrotConfig.shouldFlipY()) {
      flipY = !flipY;
    }

    const image = await this.imageFactory.get(overlay);
    const imageHeight = parseInt(height || image.height);
    const imageWidth = parseInt(width || image.width);

    const frameHandler = (handler, frame) => {
      const shouldFlipX = frame.flipX ? !flipX : flipX;
      const shouldFlipY = frame.flipY ? !flipY : flipY;

      handler.addResizedImage(
        image,
        flipPositionIfActivated(frame.x, imageWidth, shouldFlipY) +
          (offsetX || 0),
        flipPositionIfActivated(frame.y, imageHeight, shouldFlipX) +
          (offsetY || 0),
        flipSizeIfActivated(imageWidth, shouldFlipY),
        flipSizeIfActivated(imageHeight, shouldFlipX)
      );
    };

    this.getFramesHandlers().forEach((handler, index) => {
      const currentFrame = followingFrames[index];
      if (currentFrame.multiple) {
        currentFrame.multiple.forEach((frame) => {
          frameHandler(handler, frame);
        });
      } else {
        frameHandler(handler, currentFrame);
      }
    });
  }

  finish() {
    this.getFramesHandlers().forEach((handler) => {
      this.encoder.addFrame(handler.getFrame());
    });
    this.encoder.finish();
  }
}

function flipPositionIfActivated(currentPosition, size, flip) {
  return flip ? currentPosition + size : currentPosition;
}

function flipSizeIfActivated(currentSize, flip) {
  return flip ? currentSize * -1 : currentSize;
}

module.exports = ParrotConstructor;
