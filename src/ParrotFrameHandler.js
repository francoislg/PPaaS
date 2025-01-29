const fs = require("fs");
const Image = require("imagescript").Image;

function ParrotFrameHandler(parrotConfig) {
  this.width = parrotConfig.getWidth();
  this.height = parrotConfig.getHeight();
  this.context = new Image(this.width, this.height);
  this.context.fill("rgba(255,255,255,0)");
}

ParrotFrameHandler.prototype.applyColor = function (color) {
  const targetRed = parseInt(color.substring(0, 2), 16);
  const targetGreen = parseInt(color.substring(2, 4), 16);
  const targetBlue = parseInt(color.substring(4, 6), 16);

  for (let x = 0; x < this.width; x++) {
    for (let y = 0; y < this.height; y++) {
      console.log(x, y, this.context.getPixelAt(x, y));
    }
  }

  //   const imageData = this.context.getImageData(0, 0, this.width, this.height);
  //   const targetRed = parseInt(color.substring(0, 2), 16);
  //   const targetGreen = parseInt(color.substring(2, 4), 16);
  //   const targetBlue = parseInt(color.substring(4, 6), 16);
  //   for (
  //     let index = 0, length = imageData.data.length;
  //     index < length;
  //     index += 4
  //   ) {
  //     let red = imageData.data[index];
  //     let green = imageData.data[index + 1];
  //     let blue = imageData.data[index + 2];
  //     let alpha = imageData.data[index + 3];
  //     if (red == 255 && green == 255 && blue == 255 && alpha == 255) {
  //       imageData.data[index] = targetRed;
  //       imageData.data[index + 1] = targetGreen;
  //       imageData.data[index + 2] = targetBlue;
  //     }
  //   }
  //   this.context.putImageData(imageData, 0, 0);
};

ParrotFrameHandler.prototype.addImage = function (image, offsetX, offsetY) {
  this.context.drawImage(image, offsetX || 0, offsetY || 0);
};

ParrotFrameHandler.prototype.addResizedImage = function (
  image,
  offsetX,
  offsetY,
  width,
  height
) {
  this.context.composite(image, offsetX || 0, offsetY || 0, width, height);
};

ParrotFrameHandler.prototype.getFrame = function () {
  return this.context;
};

module.exports = ParrotFrameHandler;
